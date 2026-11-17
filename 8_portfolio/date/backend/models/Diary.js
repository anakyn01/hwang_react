const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Diary = sequelize.define('Diary', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: true }
}, {
    tableName: 'diaries',
    timestamps: true 
});

module.exports = Diary;