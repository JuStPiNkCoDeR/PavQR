module.exports = {
  flush: function (res, logw, type, text, callback) {
      res.set("Connection", "close");
      logw.write('info', 'Добалена новость');
      res.render('./success/success', {
          Type: type,
          Text: text
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
          if (typeof callback === 'function')
              callback();
      });
  }
};