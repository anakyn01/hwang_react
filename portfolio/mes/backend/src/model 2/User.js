const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // IDENTITY 자동 증가 매핑
        field: 'ID'
    },
    firstName: {
        type: DataTypes.STRING(50),
        field: 'FIRST_NAME'
    },
    lastName: {
        type: DataTypes.STRING(50),
        field: 'LAST_NAME'
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        field: 'EMAIL'
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'PASSWORD'
    },
    companyName: {
        type: DataTypes.STRING(100),
        field: 'COMPANY_NAME'
    },
    position: {
        type: DataTypes.STRING(50),
        field: 'POSITION'
    },
    tel: {
        type: DataTypes.STRING(30),
        field: 'TEL'
    },
    address: {
        type: DataTypes.STRING(255),
        field: 'ADDRESS'
    },
    detailAddress: {
        type: DataTypes.STRING(255),
        field: 'DETAIL_ADDRESS'
    },
    gender: {
        type: DataTypes.STRING(20),
        field: 'GENDER'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'CREATED_AT'
    }
}, {
    tableName: 'USERS',
    timestamps: false // 수동으로 관리하므로 자동 타임스탬프 비활성화
});

module.exports = User;