const express = require('express');
const router = express.Router();
const path = require('path');
const config = require(path.join(__dirname, '../../config'));
const log = require(path.join(__dirname, '../../libs/log'));
const logw = require(path.join(__dirname, '../../libs/log')).stream;
const fs = require('fs-extra');
const formidable = require('formidable');
const Error = require(path.join(__dirname, '../../libs/class/errors/Error'));
const Warn = require(path.join(__dirname, '../../libs/class/warnings/Warn'));
const securityModel = require(path.join(__dirname, '../../db/models')).securityModel;

router.post('/', function (req, res) {
    const mongoose = require(path.join(__dirname, '../../libs/mongoose'))(false, res, logw);
    const form = new formidable.IncomingForm(config.get('formidable:options'));
    const user = req.session.user;
    form.uploadDir = (user === "simple") ? config.get('security:SIMPLE:sertPath') : config.get('security:CL:sertPath');
    form.parse(req, function (err, fields, files) {
        if (err) Error.send(err, res, logw, req.session.lang.errors.readData);
        else {
            const username = fields.name;
            const password = fields.pass;
            const sert = files.sert;
            const ip = req.ip;
            fs.readFile(sert.path, 'utf-8', function (err, out) {
                if (err) Error.send(err, res, logw, req.session.lang.errors.files);
                else {
                    fs.remove(sert.path, function (err) {
                        if (err) Error.send(err, res, logw, req.session.lang.errors.files);
                        else {
                            const clearSert = out.split('=', 2);
                            securityModel.findOne({"user":username,"password":password,"sert":clearSert[1]}, function (err, obj) {
                                if (err) Error.send(err, res, logw, req.session.lang.errors.DataBase);
                                else {
                                    console.log(obj);
                                    if (user === "simple" && obj === null) Warn.send(res, logw, req.session.lang.warnings.auth);
                                    else if (user === "CL" && obj === null) {
                                        logw.write('warn', "Попытка входа в CL была откланена для => " + ip);
                                        Warn.send(res, logw, req.session.lang.warnings.auth);
                                    } else {
                                        req.session.sert = clearSert;
                                        if (user === "simple") {
                                            res.render('./main/index', {
                                                lang: 'ru',
                                                title: 'KV',
                                                version: '0.0.1'
                                            }, function (err, html) {
                                                if (err) {
                                                    logw.write('error', err);
                                                    return;
                                                }
                                                res.json({
                                                    answer: {
                                                        error: false,
                                                        warning: false,
                                                        html: html
                                                    }
                                                });
                                                res.end();
                                            });
                                        } else if (user === "CL") {
                                            res.render('./admin/admin', {
                                                title: 'Control panel',
                                                content: '<div class="empty"><h3>Добро пожаловать в панель администратора</h3><p>Для дальнейшей работы необходимо выбрать ссылку для редактирования данного ресурса</p></div>'
                                            }, function (err, html) {
                                                if (err) {
                                                    logw.write('error', err);
                                                    return;
                                                }
                                                logw.write('info', "Допуск к административной панели был предоставлен для " + ip);
                                                res.json({
                                                    answer: {
                                                        error: false,
                                                        warning: false,
                                                        html: html
                                                    }
                                                });
                                                res.end();
                                            });
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;