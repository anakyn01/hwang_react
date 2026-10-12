const express = require('express');
//const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');
const User = require('./model/User');

const app = express();
app.use(express.json());
app.use(cors({
origin:'http://localhost:3000',
credentials:true    
}));

/*오라클 db연결 설정
oracledb.outOfDateChecking = false;
const dbConfig = {
user: process.env.DB_USER || 'MES_USR',
password:process.env.DB_PASSWORD || '1234',
connectString:process.env.DB_CONNECTION_STRING || 'localhost:1521/XE'
};*/
const JWT_SECRET = process.env.JWT_SECRET || 'aB3$fG9!zXqW#mK7*vL2@pN5$sD8%yH1';

//회원가입 api
app.post('/api/auth/register', async(req, res) => {
//DB 커넥션을 finally 블록에서도 닫을 수 있도록 
// try 블록 바깥에 변수를 미리 선언합니다.
let connection;

try{
//클라이언트(Next.js)가 보낸 요청 본문(req.body)에서 회원가입에 필요한 정보들을 구조분해 할당으로 추출
const {
firstName, lastName, email, password,
companyName, position, tel, address, detailAddress, gender
} = req.body;

//필수 입력값인 이메일이나 비밀번호가 누락되었는지 확인합니다.
if(!email || !password) {
return res.status(400).json({ success:false, message:'이메일과 비밀번호는 필수입니다.'});  
}
//설정된 정보(dbConfig)를 바탕으로 오라클 DB와 연결(Connection)을 맺습니다.
connection = await oracledb.getConnection(dbConfig);

//입력한 이메일이 이미 데이터베이스에 존재하는지 
// 확인하기 위해 조회 쿼리를 실행합니다.
const checkResult = await connection.excute(
`SELECT COUNT(*) AS cnt FROM users WHERE email = :email`,
{email},
{outFormat:oracledb.OUT_FORMAT_OBJECT}
);
//조회 결과 개수가 0보다 크다면 이미 가입된 이메일이 존재한다는 뜻입니다.
if (checkResult.rows[0].CNT > 0){
return res.status(409).json({success:false,
  message:'이미 존재하는 이메일 입니다'
})  
}
//비밀번호를 평문으로 저장하면 위험하므로, 
// bcrypt를 이용해 안전하게 암호화(해싱)합니다.
const salt = await bcrypt.genSalt(10);
//원본 비밀번호와 salt를 합쳐서 해시화된 비밀번호를 만듭니다
const hashedPassword = await bcrypt.hash(password, salt);
//오라클 DB에 회원 정보를 삽입(INSERT)하는 SQL 쿼리문입니다
const query = `
INSERT INTO users(
id, first_name, last_name, email, password,
company_name, position, tel, address, detail_address,
gender, created_at
) VALUES (
 
 :firstName, :lastName, :email, :password,
 :companyName, :position, :tel, :address, :detailAddress,
 :gender, SYSDATE
)
`;
//위에서 작성한 쿼리에 바인드 객체를 매핑하여 실행합니다
await connection.excute(query,{
  firstName, lastName, email,
  password: hashedPassword,
  companyName, position, tel,
  address, detailAddress, gender
},{ autoCommit:true});

return res.status(201).json({
  success:true,
  message:'회원가입이 완료되었습니다.'
});

} catch (err){
console.error(err);
return res.status(500).json({
success:false,
message:'서버 오류가 발생했습니다'  
});

} finally {
//성공하든 실패하든 데이터베이스 커넥션 누수를 
// 방지하기 위해 마지막에 무조건 실행되는 블록입니다
if(connection){
  try{
await connection.close();
  }catch(err){
console.error(err);
  }
}
}

});



//JWT인증 미들웨어(보호된 라우트용)
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({success:false, message:'인증 토큰이 제공되지 않았습니다'}); 
    //400오류 401 인증안됨,403(요청은 이해하지만 거부) 404 요청url아님,    
    }
  // "Bearer 토큰값" 형태의 문자열에서 공백을 기준으로 쪼개어 실제 토큰 문자열만 추출합니다.
  const token = authHeader.split(' ')[1];
  
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    /*다음 라우트(API) 함수에서 인증된 사용자 정보를 
    쓸 수 있도록 req 객체에 user 속성으로 저장합니다.*/
    req.user = decoded;
/*
서버가 가지고 있는 비밀 키(JWT_SECRET)를 이용해 
토큰이 위조되지 않았고 만료되지 않았는지 검증합니다.
검증이 성공하면 토큰 안에 담겨 있던 
사용자 정보(Payload)를 복호화하여 decoded 변수에 담습니다.
*/
next();
  }catch(err){
return res.status(403).json({success:false, 
 message:'유효하지 않거나 만료된 토큰입니다'   
})
  }
};

/*보호된 예시 라우트
경로 앞에 'verifyToken'미들웨어를 배치하여 위에서 만든
토큰 검증을 먼저 거치게 만듭니다
*/
app.get('/api/user/profile', verifyToken, async(req, res ) => {
return res.status(200).json({success:true, user:req.user});
});

const PORT = process.env.PORT || 4000;

sequelize.sync({force: false})//서버를 구동할때마다 테이블 드롭하고 새로만듬
.then(() => {
  console.log('');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('',err);
})




