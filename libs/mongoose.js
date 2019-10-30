const mongoose = require('mongoose');
const path = require('path');
const config = require('../config');
const Error = require(path.join(__dirname, './class/errors/Error'));

module.exports = function (type, res, req, logw) {
    if (type) {
        mongoose.connect(config.get('mongoose:databases:uri'), config.get('mongoose:normalUser'), function (err) {
            if (err) Error.send(res, err, logw, req.session.lang.errors.connectToDB);
        });
    } else {
        mongoose.connect(config.get('mongoose:databases:uri'), config.get('mongoose:guestUser'), function (err) {
            if (err) Error.send(res, err, logw, req.session.lang.errors.connectToDB);
        });
    }
};