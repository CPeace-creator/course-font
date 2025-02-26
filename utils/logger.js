const winston = require('winston');

// 创建日志实例
const logger = winston.createLogger({
    level: 'info',  // 默认日志级别
    format: winston.format.combine(
        winston.format.colorize(),  // 使日志带有颜色
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 时间戳
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),  // 输出到控制台
        new winston.transports.File({ filename: 'error.log', level: 'error' })  // 错误日志保存到文件
    ],
});

module.exports = logger;
