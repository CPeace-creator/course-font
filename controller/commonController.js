const User = require('../models/User');
const ResponseResult = require('../utils/ResponseResult');
const utils = require('../utils/utils');
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ where: { user_name: userName } });
    if (!user) {
        return ResponseResult.send(res, ResponseResult.error(500, "账号不存在,请注册!"));
    }
    if (await utils.comparePassword(user.password, password)) {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return ResponseResult.send(res, ResponseResult.success({ token }));
    } else {
        return ResponseResult.send(res, ResponseResult.error(500, "密码不正确,请重试!"));
    }
}
