const express = require('express');
const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
origin:'http://localhost:3000',
credentials:true    
}));

//오라클 db연결 설정
oracledb.outOfDateChecking = false;
const dbConfig = {
user: process.env.DB_USER || 'MES_USR',
password:process.env.DB_PASSWORD || '1234',
connectString:process.env.DB_CONNECTION_STRING || 'localhost:1521/XE'
};
const JWT_SECRET = process.env.JWT_SECRET || 'aB3$fG9!zXqW#mK7*vL2@pN5$sD8%yH1';

//회원가입 api
app.post('/api/auth/register', async(req, res) => {

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

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});




