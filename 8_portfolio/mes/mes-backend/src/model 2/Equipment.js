const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Equipment = sequelize.define('Equipment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    equipmentName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'EQUIPMENT_NAME' // 예: "CNC Machine #3", "SMT Mounter #1"
    },
    cleanroomZone: {
        type: DataTypes.STRING(50),
        field: 'CLEANROOM_ZONE' // 예: "Zone A (Class 100)"
    },
    temperature: {
        type: DataTypes.FLOAT,
        field: 'TEMPERATURE' // 클린룸 온도 (℃)
    },
    humidity: {
        type: DataTypes.FLOAT,
        field: 'HUMIDITY' // 클린룸 습도 (%)
    },
    status: {
        type: DataTypes.STRING(30),
        defaultValue: 'NORMAL',
        field: 'STATUS' // NORMAL, WARNING, ERROR
    }
}, {
    tableName: 'EQUIPMENTS',
    timestamps: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT'
});

module.exports = Equipment;