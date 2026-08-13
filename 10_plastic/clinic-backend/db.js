const oracledb = require('oracledb');
require('dotenv').config();

async function initalize(){
    try{
await oracledb.createPool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    connectString:process.env.DB_CONNECTION_STRING,
    poolMin:10,
    poolMax:10,
    poolIncrement:0
})
console.log('Oracle 커넥션 풀이 성공적으로 생성되었습니다.');
    }catch(err){
console.error('Oracle DB 연결 실패:', err);
    }
}
module.exports = {initalize};