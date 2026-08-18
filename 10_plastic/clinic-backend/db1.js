// 오라클 DB와 통신하기 위한 공식 라이브러리를 불러옵니다.
const oracledb = require('oracledb');
//.env 파일에 저장된 비밀번호, 접속 주소 등 숨겨야 
// 할 환경변수들을 읽어오게 합니다.
//Environment Variables
require('dotenv').config();
/*
오라클 Thin 모드 사용 (별도 오라클 클라이언트 프로그램 설치 없이 
가볍게 연결하는 방식)
DB에서 데이터를 가져올 때 기본값인 배열([...]) 대신
우리가 다루기 쉬운 JSON 객체({키: 값}) 형태로 받도록 설정합니다.
*/
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

//DB 연결을 시작하는 비동기 함수(기다림이 필요한 함수)를 선언합니다.
async function initalize(){
/*
DB와 연결을 미리 맺어두고 재사용하는 '커넥션 풀(Connection Pool)'을 생성
매번 새로 연결하는 것보다 속도가 훨씬 빠릅니다.
*/    
    try{
await oracledb.createPool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    connectString:process.env.DB_CONNECTION_STRING,//db주소
    poolMin:2,//접속자가 없어도 평상시에 최소한으로 유지해둘 연결 개수입니다.
    poolMax:10,//동시 접속자가 많아질 때 최대 몇 개까지 연결을 늘릴지 설정합니다.
    poolIncrement:1// 연결이 더 필요할 때 한 번에 몇 개씩 연결을 추가할지 설정합니다.
})
console.log('Oracle 커넥션 풀이 성공적으로 생성되었습니다.');
    }catch(err){
console.error('Oracle DB 연결 실패:', err);
    }
}
// 서버를 끌 때 DB 연결도 안전하게 끊어주기 위한 함수를 선언합니다.
async function close(){
    try{
/*
생성되어 있던 커넥션 풀을 가져와서(getPool) 안전하게 닫습니다(close).
괄호 안의 0은 하던 작업을 즉시 중단하고 닫으라는 의미입니다.
*/
await oracledb.getPool().close(0);
// 성공적으로 닫히면 터미널에 메시지를 띄웁니다.
console.log('Oracle DB 커넥션 풀 종료');
    }catch(err){
console.error(err);
    }
}
//다른 파일(예: server.js)에서 이 파일에 있는 initialize와 close 함수를 가져다 쓸 수 있도록 밖으로 내보냅니다.
module.exports = {initalize, close};