const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs-extra');
const config = require(path.join(__dirname, '../../config'));
const log = require(path.join(__dirname, '../../libs/log'));
const logw = require(path.join(__dirname, '../../libs/log')).stream;
const infoModel = require(path.join(__dirname, '../../db/models')).infoModel;
const newsModel = require(path.join(__dirname, '../../db/models')).newsModel;
const securityModel = require(path.join(__dirname, '../../db/models')).securityModel;
const Error = require(path.join(__dirname, '../../libs/class/errors/Error'));
const dec = require(path.join(__dirname, '../../libs/decoder'));

router.get('/', function(req, res) {
    req.session.lang = config.get('languages:en-EN');
    //const mongoose = require(path.join(__dirname, '../../libs/mongoose'))(false, res, req, logw);
    fs.readJson(req.session.lang.htmlData.index, (err, obj) => {
       if (err) Error.send(err, res, logw, req.session.lang.erros.readFile);
        res.set('Connection', 'close');
        res.render('index', {
            lang: "ru",
            title: "PavQR",
            appName: "PavQR",
            initLang: "EN",
            data: obj
        });
        res.end();
    });
});

module.exports = router;


/* securityModel.findOne({user: "pinkcoder"}).exec(function (err, ans) {
       if (err) {
           Error.flush(res, err, logw, req.session.lang.errors.DataBase, function (err2) {
               if (err2 !== undefined) Error.flush(res, err2.type, err2.text);
           });
           return;
       }
       const sert = ans.sert;
       infoModel.findOne({category: "news"}).exec(function (err2, ans2) {
           if (err2) {
               Error.flush(res, err2, logw, req.session.lang.errors.DataBase, function (err3) {
                   if (err3 !== undefined) Error.flush(res, err3.type, err3.text);
               });
               return;
           }
           const allCount = ans2.count;
           function getNews(callback) {
               var news= [];
               for (var i = allCount - 1; i >= 0 || allCount - 4 > i; i--) {
                   newsModel.findOne({id:i}).exec(function (err2, ans2) {
                       if (err2) {
                           Error.flush(res, err2, logw, req.session.lang.errors.DataBase, function (err3) {
                               if (err3 !== undefined) Error.flush(res, err3.type, err3.text);
                           });
                       } else {
                           const id = ans2.id,
                               txtpath = ans2.path,
                               imgpath = ans2.img,
                               author = ans2.author,
                               date = ans2.date;
                           dec.setSettings(txtpath, sert, config.get('encryption:options:E2N'), logw);
                           dec.decode(dec, function (err3, decoded) {
                               if (err3) {
                                   Error.flush(res, err3, logw, req.session.lang.errors.encoding, function (err4) {
                                       if (err4 !== undefined) Error.flush(res, err4.type, err4.text);
                                   });
                               } else {
                                   const decodedArray = decoded.split("\n", 2);
                                   news.push({
                                       title: decodedArray[0],
                                       text: decodedArray[1],
                                       img: imgpath,
                                       aut: author,
                                       time: date
                                   });
                                   if (id === 0 || id === allCount - 4) callback(news)
                               }
                           });
                       }
                   });
               }
           }
           getNews(function (data) {
               res.set('Connection', 'close');
               res.render('index', {
                   title: "KV",
                   sliderContent: data
               });
           });
       });
   });*/
