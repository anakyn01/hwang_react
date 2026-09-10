const { DataTypes} = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.BIGINT, 
    primaryKey: true, 
    autoIncrement: true 
},
  email: { 
    type: DataTypes.STRING(255), 
    allowNull: false, 
    unique: true 
},
  password: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
},
  nickname: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
},
  age: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
},
  gender: { 
    type: DataTypes.ENUM('M', 'F', 'O'), 
    allowNull: false 
},
  bio: { 
    type: DataTypes.TEXT 
},
  address: { 
    type: DataTypes.STRING(255) 
},
  latitude: { 
    type: DataTypes.DECIMAL(10, 8) 
},
  longitude: { 
    type: DataTypes.DECIMAL(11, 8) 
},
  profile_image_main: { 
    type: DataTypes.STRING(255) 
},
  profile_image_sub1: { 
    type: DataTypes.STRING(255) 
},
  profile_image_sub2: { 
    type: DataTypes.STRING(255) 
},
  points: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
},
  no_show_count: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0 
},
  suspended_until: { 
    type: DataTypes.DATE, 
    allowNull: true 
},
  status: { 
    type: DataTypes.ENUM('PENDING', 'ACTIVE', 'INACTIVE', 'BANNED'), 
    defaultValue: 'PENDING'
  },
  membership_tier: {
    type: DataTypes.ENUM('STANDARD', 'PREMIUM'),
    defaultValue: 'STANDARD'
  }},{
    tableName:'users',
    timestamps:true
  });

  module.exports = User;