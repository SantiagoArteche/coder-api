import winston from "winston";
const workMode = process.env.DEVELOPMENT_MODE;
console.log(process.env.DEVELOPMENT_MODE);
let logger;
const customLevelOpt = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "cyan",
    debug: "gray",
  },
};
if (workMode === process.env.DEVELOPMENT_MODE) {
  logger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelOpt.colors }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: "./errors.log",
        level: "fatal",
        format: winston.format.combine(winston.format.simple()),
      }),
      new winston.transports.File({
        filename: "./loggers.html",
        level: "warning",
        format: winston.format.combine(winston.format.simple()),
      }),
      new winston.transports.File({
        filename: "./loggers.log",
        level: "info",
        format: winston.format.combine(winston.format.simple()),
      }),
      new winston.transports.File({
        filename: "./errors.log",
        level: "error",
        format: winston.format.combine(winston.format.simple()),
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: [
      new winston.transports.File({
        filename: "./errors.log",
        level: "fatal",
        format: winston.format.combine(winston.format.simple()),
      }),
      new winston.transports.File({
        filename: "./loggers.html",
        level: "warning",
        format: winston.format.combine(winston.format.simple()),
      }),
      new winston.transports.File({
        filename: "./loggers.log",
        level: "info",
        format: winston.format.combine(winston.format.simple()),
      }),
      new winston.transports.File({
        filename: "./errors.log",
        level: "error",
        format: winston.format.combine(winston.format.simple()),
      }),
    ],
  });
}

export const addLogger = (request, response, next) => {
  request.logger = logger;
  if (workMode === process.env.DEVELOPMENT_MODE) {
    request.logger.debug(
      `${request.method} es ${request.url} - ${new Date().toLocaleTimeString()}`
    );
  }

  next();
};
