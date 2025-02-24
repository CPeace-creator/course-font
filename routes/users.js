const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// 添加用户
router.post('/add', UserController.addUser);

module.exports = router;
