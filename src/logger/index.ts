const winston = require('winston');


const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({

    level: 'info',
    format: winston.format.combine(
        //winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss A ZZ' // '2019-01-01 12:00:00 AM +0000'
        }),
        logFormat
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console()
    ],
});

module.exports = logger;