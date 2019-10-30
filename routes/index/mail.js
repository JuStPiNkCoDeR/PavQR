const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const config = require(path.join(__dirname, '../../config'));
const log = require(path.join(__dirname, '../../libs/log'));
const logw = require(path.join(__dirname, '../../libs/log')).stream;
const Error = require(path.join(__dirname, '../../libs/class/errors/Error'));

router.get('/', function(req, res, app) {
    let form = new formidable.IncomingForm(config.get('formidable:options'));
    form.parse(req, function (err, fields, files) {
        if (err) Error.send(err, res, logw, req.session.lang.errors.readForm);
    })
});

module.exports = router;