require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 引入数据库配置

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false // 不生成 createdAt 和 updatedAt 字段
});

module.exports = User; 