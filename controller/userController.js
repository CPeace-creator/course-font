const User = require('../models/User');
const utils = require('../utils/utils');
const bcrypt = require('bcrypt');
const ResponseResult = require('../utils/ResponseResult');

// 注册
exports.addUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return ResponseResult.send(res, ResponseResult.error(400, "Name, email, and password are required"));
        }
        const saltRounds = parseInt(process.env.SALT || 10, 10);
        console.log('SALT_ROUNDS:', process.env.SALT);
        console.log('saltRounds:', saltRounds);

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await utils.hashPassword(password, salt);

        const newUser = await User.create({ userName, email, password: hashedPassword });
        return ResponseResult.send(res, ResponseResult.success(newUser));
    } catch (error) {
        return ResponseResult.send(res, ResponseResult.error(500, error.message));
    }
}
