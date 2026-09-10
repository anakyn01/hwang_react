const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Match = sequelize.define('Match', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    sender_id: { type: DataTypes.BIGINT, allowNull: false },
    receiver_id: { type: DataTypes.BIGINT, allowNull: false },
    status: { 
        type: DataTypes.ENUM('REQUESTED', 'ACCEPTED', 'NO_SHOW'),
        defaultValue: 'REQUESTED' 
    },
    action: { type: DataTypes.STRING, allowNull: true }
}, {
    tableName: 'matches',
    timestamps: true 
});

module.exports = Match;