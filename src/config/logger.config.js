const winston = require("winston");
const {
  combine,
  timestamp,
  colorize,
  prettyPrint,
  printf,
  json,
  errors,
  align,
} = winston.format;
const { LOG_DB_URL } = require("./server.config");
require("winston-mongodb");

const allowedTransports = [];

// Enables logging on the console
allowedTransports.push(
  new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp(),
      printf(
        ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
      )
    ),
  })
);

// Enables logging in mongodb database
allowedTransports.push(
  new winston.transports.MongoDB({
    level: "error",
    db: LOG_DB_URL,
    collection: "logs",
  })
);
// Enables logging in file
allowedTransports.push(
  new winston.transports.File({
    filename: `app.log`,
    format: combine(
      errors({ stack: true }),
      timestamp(),
      printf(({ timestamp, level, message, stack, ...info }) => {
        let logMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
        if (stack) logMessage += `\n${stack}`;

        // Check if the info object is not empty
        if (Object.keys(info).length > 0) {
          // Convert the info object to a formatted string
          const infoString = JSON.stringify(info, null, 2);
          // Append the info string to the log message
          logMessage += `\nAdditional Info: ${infoString}`;
        }

        return logMessage;
      })
    ),
  })
);

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A", // 2022-01-25 03:23:10.350 PM
    }),
    align(),
    printf(
      (log) => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`
    )
  ),
  transports: allowedTransports,
});

module.exports = logger;
