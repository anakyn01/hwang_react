const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('MatchRequest',{
sender_id:{type:DataTypes.BIGINT, allowNull:false},
receiver_id:{type:DataTypes.BIGINT, allowNull:false},
status:{
  type:DataTypes.ENUM('PENDING','ACCEPTED','REJECTED','COMPLETED'),
  defaultValue:'PENDING'  
}       
    })
}