const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PointHistory = sequelize.define('PointHistory', {
  user_id: { type: DataTypes.BIGINT, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false }, 
  reason: { type: DataTypes.STRING(255), allowNull: false }   
}, {
  tableName: 'point_histories',
  timestamps: true
});

module.exports = PointHistory;