const User = require('../models/User');
const bcrypt = require('bcrypt'); // 引入 bcrypt 库
// 插入新用户
exports.addUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body; // 增加对密码的接收
        if (!userName || !email || !password) {
            return ResponseResult.error(400,"Name, email, and password are required").send(res)
        }
        const saltRounds = 10;
        const hashedPassword = hashPassword(password,saltRounds);
        const newUser = await User.create({ userName, email, password: hashedPassword });
        return ResponseResult.success(newUser).send(res)
    } catch (error) {
        return ResponseResult.error(error.message).send(res)
    }
}
// 加密
const hashPassword = async (plainText,saltRounds) => {
    return await bcrypt.hash(plainText, saltRounds);
}
// 验证
const comparePassword = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
}
