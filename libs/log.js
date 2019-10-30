const { createLogger, format, transports } = require('winston');
const { combine, prettyPrint, splat, simple } = format;
const config = require('../config');
const dateformat = config.get('variables:DATE:format');
/*
var ENV = config.get('variables:NODE_ENV');
var lev = ENV == "development" ? 'info' : 'error';
*/

var logger = createLogger({
    transports: [
        new (transports.File)({
            name: 'all-info',
            filename: config.get('winston:infoPath'),
            level: 'info',
            format: combine(
                //splat(),
                prettyPrint(),
                //simple()
            )
        }),
        new (transports.File)({
            name: 'warnings',
            filename: config.get('winston:warningPath'),
            level: 'warn',
            format: combine(
                //splat(),
                prettyPrint(),
                //simple()
            )
        }),
        new (transports.File)({
            name: 'errors',
            filename: config.get('winston:errorPath'),
            level: 'error',
            format: combine(
                //splat(),
                prettyPrint(),
                //simple()
            )
        }),
        new (transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});

module.exports = logger;
module.exports.stream = {
  write: function (level, message) {
      var date = new Date();
      logger.log(level, message, date.toLocaleString("ru-RU", dateformat));
  }  
};