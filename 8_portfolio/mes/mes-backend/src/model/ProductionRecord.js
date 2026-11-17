const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ProductionRecord = sequelize.define('ProductionRecord', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    lineName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'LINE_NAME'
    },
    targetCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'TARGET_COUNT' // 목표 생산 대수
    },
    actualCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'ACTUAL_COUNT' // 실제 양품 생산 대수
    },
    defectCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'DEFECT_COUNT' // 불량 대수
    },
    yieldRate: {
        type: DataTypes.FLOAT,
        defaultValue: 100.0,
        field: 'YIELD_RATE' // 수율 (%)
    }
}, {
    tableName: 'PRODUCTION_RECORDS',
    timestamps: true,
    createdAt: 'RECORDED_AT',
    updatedAt: 'UPDATED_AT'
});

module.exports = ProductionRecord;