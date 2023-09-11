import * as winston from 'winston';

// Define log levels and colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Custom format for logging as JSON
const jsonFormat = winston.format.printf(
  ({ timestamp, level, message, traceid, ...metadata }) => {
    const logObject = {
      timestamp,
      level,
      message,
      traceid,
      ...metadata,
    };
    return JSON.stringify(logObject);
  },
);

// Configure Winston logger
const logger = winston.createLogger({
  levels: logLevels, 
  format: winston.format.combine( 
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    jsonFormat
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }), 
  ],
}); 

// Export the logger instance
export default logger;