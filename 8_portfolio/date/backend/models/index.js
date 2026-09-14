// 회원님의 DB 설정 파일을 불러옵니다.
const sequelize = require('../config/database');

// 1. 모델들을 단순히 불러오기만 합니다. (뒤에 괄호를 붙이지 않습니다!)
const User = require('./User');
const MatchRequest = require('./MatchRequest');
const PointHistory = require('./PointHistory');

// 2. 다른 파일(seed.js나 라우터 등)에서 한 번에 꺼내 쓸 수 있도록 묶어서 내보냅니다.
module.exports = { sequelize, User, MatchRequest, PointHistory };