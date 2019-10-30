const express = require('express');
const router = express.Router();
const path = require('path');
const log = require(path.join(__dirname, '../../libs/log'));
const logw = require(path.join(__dirname, '../../libs/log')).stream;
const formidable = require('formidable');
const Error = require(path.join(__dirname, '../../libs/class/errors/Error'));
const config = require(path.join(__dirname, '../../config'));
const buildingModel = require(path.join(__dirname, '../../db/models')).buildingModel;

router.post('/', function (req, res) {
    const mongoose = require(path.join(__dirname, '../../libs/mongoose'))(false, res, logw);
    let form = formidable.IncomingForm(config.get('formidable:options'));
    form.parse(req, function (err, fields, files) {
        if (err) Error.send(err, res, logw, req.session.lang.errors.readForm);
        else {
            const id = fields.code;
            buildingModel.findById(id).exec(function (err, obj) {
                if (err) Error.send(err, res, logw, req.session.lang.errors.readForm);
                else {
                    res.json({
                        name: obj.name,
                        address: obj.address,
                        time: obj.time,
                        lunch: obj.lunch,
                        recnum: obj.recnum,
                        hdnum: obj.hdnum,
                        ednum: obj.ednum
                    });
                    res.end();
                }
            });
        }
    })
});

module.exports = router;