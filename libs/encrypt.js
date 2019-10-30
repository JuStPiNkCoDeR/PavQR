const path = require('path');
const config = require(path.join(__dirname, '../config'));
const fs = require('fs-extra');

var Encrypt = {
    setSettings: function (path, sert, texts, opt, logw) {
      Encrypt.path = path;
      Encrypt.seed = sert;
      Encrypt.toEnc = texts;
      Encrypt.options = opt;
      Encrypt.logger = logw;
    },
    encrypt: function (EncObj, callback) {
        if (Array.isArray(EncObj.toEnc)) {
          var seedSeek = 0;
          for (var s = 0; s < EncObj.toEnc.length; s++) {
              EncObj.currentText = EncObj.toEnc[s];
              if (s < EncObj.toEnc.length - 1)  EncObj.currentText += "\n";
              EncObj.encodedText = "";
              for (var i = 0; i < EncObj.currentText.length; i++) {
                  if (seedSeek === EncObj.seed.length) seedSeek = 0;
                  EncObj.encodedText += String.fromCharCode(EncObj.currentText.charCodeAt(i) ^ EncObj.seed.charCodeAt(seedSeek));
                  seedSeek++;
              }
              EncObj.save(EncObj);
          }
        }
        if (typeof callback === 'function')
            callback();
    },
    save: function (EncObj, callback) {
        fs.appendFile(EncObj.path, EncObj.encodedText, function (err) {
            if (typeof callback === 'function') {
                if (err) callback(err);
                else callback(false);
            }
        });
    }
};

module.exports = Encrypt;