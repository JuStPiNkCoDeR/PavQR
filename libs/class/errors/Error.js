const fs = require('fs-extra');
const InsideError = require('./InsideError');

var Error = {
    flush: function(res, errObj, logw, path, callback) {
        var type = null;
        var text = null;
        if (arguments.length === 5) {
            res.set("Connection", "close");
            logw.write('error', errObj);
            fs.readFile(path, 'utf-8', function (err, data) {
                if (err) {
                    logw.write('error', err);
                    callback(InsideError.create(err));
                    return;
                }
                const dataArray = data.split("\n", 2);
                type = dataArray[0];
                text = dataArray[1];
                res.render('./errors/error', {
                    errorType: type,
                    errorText: text
                }, function (err, html) {
                    if (err) {
                        logw.write('error', err);
                        return;
                    }
                    res.json({
                        answer: {
                            error: true,
                            warning: false,
                            html: html
                        }
                    });
                    res.end();
                });
            });
        } else if (arguments.length === 3) {
            res.set("Connection", "close");
            type = arguments[1];
            text = arguments[2];
            res.render('./errors/error', {
                errorType: type,
                errorText: text
            }, function (err, html) {
                if (err) {
                    logw.write('error', err);
                    return;
                }
                res.json({
                    answer: {
                        error: true,
                        warning: false,
                        html: html
                    }
                });
                res.end();
            });
        }
    },
    send: function (err, res, logw, path) {
        Error.flush(res, err, logw, path, function (err2) {
            if (err2 !== undefined) Error.flush(res, err2.type, err2.text);
        });
    }
};

module.exports = Error;