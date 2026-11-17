const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ProcessLine = sequelize.define('ProcessLine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    lineName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'LINE_NAME' // 예: "AP SMT Line 1", "Titanium CNC Line"
    },
    processType: {
        type: DataTypes.STRING(50),
        field: 'PROCESS_TYPE' // 예: "SMT", "CNC", "ASSEMBLY"
    },
    status: {
        type: DataTypes.STRING(30),
        defaultValue: 'RUNNING',
        field: 'STATUS' // RUNNING(가동), STOP(정지), MAINTENANCE(점검)
    },
    currentProduct: {
        type: DataTypes.STRING(50),
        field: 'CURRENT_PRODUCT' // 예: "iPhone 18 Pro"
    },
    operator: {
        type: DataTypes.STRING(50),
        field: 'OPERATOR'
    }
}, {
    tableName: 'PROCESS_LINES',
    timestamps: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT'
});

module.exports = ProcessLine;