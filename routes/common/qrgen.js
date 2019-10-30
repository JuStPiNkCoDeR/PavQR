const express = require('express');
const router = express.Router();
const path = require('path');
const log = require(path.join(__dirname, '../../libs/log'));
const logw = require(path.join(__dirname, '../../libs/log')).stream;
const formidable = require('formidable');
const Error = require(path.join(__dirname, '../../libs/class/errors/Error'));
const QRCode = require('qrcode');
const config = require(path.join(__dirname, '../../config'));
const buildingModel = require(path.join(__dirname, '../../db/models')).buildingModel;

router.get('/', function (req, res) {
    req.session.lang = config.get('languages:en-EN');
    QRCode.toDataURL('5bc1b1dd068c1a608eab75fb').then(url => console.log(url)).catch(err => console.log(err));
    res.end();
});

router.post('/gen', function (req, res) {
    const mongoose = require(path.join(__dirname, '../../libs/mongoose'))(true, res, logw);
    let form = formidable.IncomingForm(config.get('formidable:options'));
    form.parse(req, function (err, fields, files) {
        if (err) Error.send(err, res, logw, req.session.lang.errors.readForm);
        else {
            const name = fields.name;
            const address = fields.address;
            const time = fields.time;
            const lunch = fields.lunch;
            const recnum = fields.recnum;
            const hdnum = fields.hdnum;
            const ednum = fields.ednum;

            let toSave = new buildingModel({
                name: name,
                address: address,
                time: time,
                lunch: lunch,
                recnum: recnum,
                hdnum: hdnum,
                ednum: ednum
            });
            toSave.save(function (err) {
                if (err) Error.send(err, res, logw, req.session.lang.errors.saveDB);
                else {
                    buildingModel.findOne({name:name}).exec(function (err, ans) {
                        if (err) Error.send(err, res, logw, req.session.lang.errors.saveDB);
                        else {
                            console.log(ans._id.toString());
                            QRCode.toDataURL(ans._id.toString()).then(url => res.json({ans:url})).catch(err => console.log(err));
                        }
                    })
                }
            });
        }
    })
});

module.exports = router;