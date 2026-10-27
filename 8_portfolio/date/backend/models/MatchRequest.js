const { DataTypes } = require('sequelize');
// 회원님 방식대로 database 설정 파일을 직접 불러옵니다.
const sequelize = require('../config/database'); 

const MatchRequest = sequelize.define('MatchRequest', {
  sender_id: { type: DataTypes.BIGINT, allowNull: false }, // User의 id가 BIGINT이므로 맞춰줍니다.
  receiver_id: { type: DataTypes.BIGINT, allowNull: false },
  status: { 
    type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'), 
    defaultValue: 'PENDING' 
  }
}, {
  tableName: 'match_requests',
  timestamps: true
});

module.exports = MatchRequest;