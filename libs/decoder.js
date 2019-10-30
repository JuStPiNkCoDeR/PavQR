const path = require('path');
const fs = require('fs-extra');
const config =require(path.join(__dirname, '../config'));
const Error = require(path.join(__dirname, './class/errors/Error'));

var Decoder = {
    setSettings: function (path, sert, opt, logw) {
        Decoder.path = path;
        Decoder.seed = sert;
        Decoder.options = opt;
        Decoder.logger = logw;
    },
    decode: function (DecObj, callback) {
        fs.readFile(DecObj.path, DecObj.options.encoding, function (err, data) {
            if (err) {
                callback(err);
                return;
            }
            DecObj.encodedText = data;
            DecObj.decodedText = "";
            var seekSeed = 0;
            for (var i = 0; i < DecObj.encodedText.length; i++) {
                if (seekSeed === DecObj.seed.length) seekSeed = 0;
                DecObj.decodedText += String.fromCharCode(DecObj.encodedText.charCodeAt(i) ^ DecObj.seed.charCodeAt(seekSeed));
                seekSeed++;
            }
            if (typeof callback === 'function') callback(false, DecObj.decodedText);
        });
    },
};

module.exports = Decoder;