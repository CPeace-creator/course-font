const User = require('../models/User');
const bcrypt = require('bcrypt'); // 引入 bcrypt 库
const ResponseResult = require('../utils/ResponseResult'); // 引入 ResponseResult

// 插入新用户
exports.addUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body; // 增加对密码的接收
        if (!userName || !email || !password) {
            return ResponseResult.send(res, ResponseResult.error(400, "Name, email, and password are required"));
        }
        const saltRounds = 10;
        const hashedPassword = await hashPassword(password, saltRounds);
        const newUser = await User.create({ userName, email, password: hashedPassword });
        return ResponseResult.send(res, ResponseResult.success(newUser));
    } catch (error) {
        return ResponseResult.send(res, ResponseResult.error(500, error.message));
    }
}

// 加密
const hashPassword = async (plainText, saltRounds) => {
    return await bcrypt.hash(plainText, saltRounds);
}

// 验证
const comparePassword = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
}
