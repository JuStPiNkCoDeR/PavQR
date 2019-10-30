const fs = require('fs-extra');
const path = require('path');
const Error = require(path.join(__dirname, '../errors/Error'));
const InsideError = require(path.join(__dirname, '../errors/InsideError'));

var Warn = {
    flush: function (res, logw, path, callback) {
        var type = null,
            text = null;
        res.set("Connection", "close");
        fs.readFile(path, 'utf-8', function (err, data) {
            if (err) {
                logw.write('error', err);
                callback(InsideError.create(err));
                return;
            }
            const dataArray = data.split("\n", 2);
            type = dataArray[0];
            text = dataArray[1];
            res.render('./warnings/warning', {
                warningType: type,
                warningText: text
            }, function (err, html) {
                if (err) {
                    logw.write('error', err);
                    return;
                }
                res.json({
                    answer: {
                        error: false,
                        warning: true,
                        html: html
                    }
                });
                res.end();
            })
        });
    },
    send: function (res, logw, path) {
        Warn.flush(res, logw, path, function (err) {
            if (err !== undefined) Error.flush(res, err.type, err.text);
        });
    }
};

module.exports = Warn;