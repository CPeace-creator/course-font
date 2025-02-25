require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 引入数据库配置

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    field:'user_name',
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false // 不生成 createdAt 和 updatedAt 字段
});

module.exports = User;
