const User = require('../models/User');
const utils = require('../utils/utils');
const bcrypt = require('bcrypt');
const ResponseResult = require('../utils/ResponseResult');
const logger2 = require("../utils/logger");

// 注册
exports.addUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return ResponseResult.send(res, ResponseResult.error(400, "Name, email, and password are required"));
        }
        const saltRounds = parseInt(process.env.SALT || 10, 10);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await utils.hashPassword(password, salt);
        const newUser = await User.create({ userName, email, password: hashedPassword });
        return ResponseResult.send(res, ResponseResult.success(newUser));
    } catch (error) {
        // console.error('Error during user registration:', error); // 添加详细的错误信息输出
        logger2.error(`Error: ${error.message}\nStack: ${error.stack}`)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return ResponseResult.send(res, ResponseResult.error(409, 'Email or username already exists'));
        }
        return ResponseResult.send(res, ResponseResult.error(500, error.message));
    }
};
