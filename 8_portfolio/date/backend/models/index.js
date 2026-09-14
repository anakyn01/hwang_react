const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('dating_db','root','1234',{
host:'localhost',
dialect:'mysql',
logging:false
});

//모델들을 불러와서 sequelize 객체와 연결해 줍니다.
const User = require('./User')(sequelize);
const MatchRequest = require('./MatchRequest')(sequelize);
const PointHistory = require('./PointHistory')(sequelize);

module.exports = {sequelize, User, MatchRequest, PointHistory};