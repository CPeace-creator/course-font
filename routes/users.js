const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// 添加用户
router.post('/add', UserController.addUser);

router.post('/upload',UserController.uploadAvatar);
module.exports = router;
