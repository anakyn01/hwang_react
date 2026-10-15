const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ComponentSCM = sequelize.define('ComponentSCM', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    componentName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'COMPONENT_NAME' // 예: "A19 Pro AP Chip", "48MP Camera Module"
    },
    category: {
        type: DataTypes.STRING(50),
        field: 'CATEGORY' // 예: "CHIP", "CAMERA", "FRAME", "DISPLAY"
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'STOCK_QUANTITY'
    },
    minThreshold: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        field: 'MIN_THRESHOLD' // 최소 안전 재고
    },
    supplier: {
        type: DataTypes.STRING(100),
        field: 'SUPPLIER' // 협력사 이름
    },
    status: {
        type: DataTypes.STRING(30),
        defaultValue: 'NORMAL',
        field: 'STATUS' // NORMAL(정상), WARNING(부족), DANGER(위험)
    }
}, {
    tableName: 'COMPONENT_SCM',
    timestamps: true,
    createdAt: 'CREATED_AT',
    updatedAt: 'UPDATED_AT'
});

module.exports = ComponentSCM;