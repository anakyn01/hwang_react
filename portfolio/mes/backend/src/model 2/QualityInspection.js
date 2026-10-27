const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const QualityInspection = sequelize.define('QualityInspection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    serialNumber: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'SERIAL_NUMBER' // 아이폰 개별 시리얼 번호
    },
    inspectionType: {
        type: DataTypes.STRING(50),
        field: 'INSPECTION_TYPE' // 예: "VISION_SCRATCH", "WATERPROOF_TEST"
    },
    result: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'RESULT' // PASS 또는 FAIL
    },
    defectReason: {
        type: DataTypes.STRING(255),
        field: 'DEFECT_REASON' // 불량 판정 시 사유
    },
    inspector: {
        type: DataTypes.STRING(50),
        field: 'INSPECTOR' // 담당 AI 유닛 또는 오퍼레이터
    }
}, {
    tableName: 'QUALITY_INSPECTIONS',
    timestamps: true,
    createdAt: 'INSPECTED_AT',
    updatedAt: false
});

module.exports = QualityInspection;