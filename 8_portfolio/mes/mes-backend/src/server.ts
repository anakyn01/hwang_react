const express = require('express');
//const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./db');
const User = require('./model/User');
const ProcessLine = require('./model/ProcessLine');
const ComponentSCM = require('./model/ComponentSCM');
const QualityInspection = require('./model/QualityInspection');
const Equipment = require('./model/Equipment');
const ProductionRecord = require('./model/ProductionRecord');

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
//let connection;

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
//connection = await oracledb.getConnection(dbConfig);

//입력한 이메일이 이미 데이터베이스에 존재하는지 
// 확인하기 위해 조회 쿼리를 실행합니다.
/*const checkResult = await connection.excute(
`SELECT COUNT(*) AS cnt FROM users WHERE email = :email`,
{email},
{outFormat:oracledb.OUT_FORMAT_OBJECT}
);*/
//조회 결과 개수가 0보다 크다면 이미 가입된 이메일이 존재한다는 뜻입니다.
const existingUser = await User.findOne({where:{email}});
if (existingUser){
return res.status(409).json({success:false,message:'이미 존재하는 이메일 입니다'}); 
}
//비밀번호를 평문으로 저장하면 위험하므로, 
// bcrypt를 이용해 안전하게 암호화(해싱)합니다.
const salt = await bcrypt.genSalt(10);
//원본 비밀번호와 salt를 합쳐서 해시화된 비밀번호를 만듭니다
const hashedPassword = await bcrypt.hash(password, salt);
//오라클 DB에 회원 정보를 삽입(INSERT)하는 SQL 쿼리문입니다


await User.create({
 firstName, lastName, email, 
 password:hashedPassword,
 companyName, position, tel, address, detailAddress,
 gender
});

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
  
  console.log("전달받은 토큰 값:", token);

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

console.error("JWT 검증 실패 원인:", err.message);

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

//로그인 API (새로 추가됨)
app.post('/api/auth/login', async(req, res) => {
  try{
const {email, password} = req.body;

// 이메일 또는 비밀번호 누락 체크
if(!email || !password){
return res.status(400).json({ success:false, message:'이메일과 비밀번호를 입력해주세요.'});
}

const user = await User.findOne({where:{email}});
//사용자가 아닌경우
if (!user) {
  return res.status(401).json({
    success:false, message:'존재하지 않는 이메일이거나 비밀번호가 틀렸습니다.'
  })
}

const token = jwt.sign(
  {id:user.id, email:user.email},
  JWT_SECRET,
  { expiresIn: '48h'}
);
//토큰과 간단한 사용자 정보 응답
return res.status(200).json({
  success:true,
  message:'로그인 성공',
  //
  token,
  user:{
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email
  }
});
  }catch(err){
console.error(err);
return res.status(500).json({
  success:false,
  message:'서버 오류가 발생했습니다'
});
  }
});

//2. 라인 공정 제어 API (/process)
app.get('/api/process/lines', verifyToken, async (req, res ) => {
  try{
const lines =
await ProcessLine.findAll();
return res.status(200).json({
  success:true, lines
});
  } catch (err) {
return res.status(500).json({
  success:false, message:'공정 라인 조회 실패'
});
  }
});

app.post('/api/process/lines', verifyToken, async(req, res ) =>{
  try{
const {lineName, processType, currentProduct, operator} = req.body;
const newLine = await ProcessLine.create({
  lineName, processType, currentProduct, operator
});
return res.status(201).json({
  success:true, line:newLine
})  
//하나 이상의 새 리소스가 생성 되었음을 나타냄
}catch(err){
return res.status(500).json({
  success:false, message:'공정 라인 등록 실패'
});  
  }
});

//3. 핵심 부품 SCM API (/components)
app.get('/api/scm/components', verifyToken, async (req, res) => {
  try{
const components =
await ComponentSCM.findAll();
return res.status(200).json({
  success:true, components
});
  }catch(err){
return res.status(500).json({
  success:false, message:'SCM 자재 조회 실패'
}); 
  }
});

app.post('/api/scm/components', verifyToken, async (req, res) => {
  try{
const {componentName, category, stockQuantity, minThreshold,supplier} =req.body;
const status = stockQuantity <= minThreshold ? 'WARNING' : 'NORMAL';
const component = await ComponentSCM.create({
componentName, category, stockQuantity, minThreshold, status,
supplier  
});  
return res.status(201).json({
  success:true, component
});
}catch(err){
return res.status(500).json({
  success:false, message:'SCM 자재 등록 실패'
}); 
  }
});

//4.비전 품질 검사 API (/quality)
app.get('/api/quality/inspections', verifyToken, async(req, res) => {
  try{
const inspections = await QualityInspection.findAll({
  limit:50, order:[['INSPECTED_AT', 'DESC']]
});
return res.status(200).json({
  success:true, inspections //누락됨
});
  }catch(err){
return res.status(500).json({success:false, 
  message:'품질 검사 이력 조회 실패'});
  }
})

app.post('/api/quality/inspections', verifyToken, async(req, res) => {
  try{
const { serialNumber, inspectionType, 
  result, defectReason, inspector} = req.body;
const inspection = await QualityInspection.create({
  serialNumber, inspectionType, result, defectReason, inspector
});
return res.status(201).json({sucess:true, inspection});
  }catch(err){
 return res.status(500).json({
  success:false, message:'품질 검사 결과 등록 실패'});   
  }
})


//5. 클린룸 및 설비 제어 API (/cleanroom)
app.get('/api/equipment/status', verifyToken, async(req, res) => {
  try{
const equipments = await Equipment.findAll({});
return res.status(200).json({success:true, equipments});
  }catch(err){
return res.status(500).json({
  success:false, message:'설비 상태 조회 실패'});
  }
});

app.post('/api/equipment/status', verifyToken, async(req, res) => {
  try{
const { equipmentName, cleanroomZone, 
  temperature, humidity, status } = req.body;
const equipment = await Equipment.create({
  equipmentName, cleanroomZone, 
  temperature, humidity, status
});
return res.status(201).json({sucess:true, equipment});
  }catch(err){
return res.status(500).json({
  success:false, message:'설비 상태 등록 실패'});    
  }
})

//6. 실시간 통합 관제(생산 실적 및 수율) API (/analytics)
app.get('/api/analytics/records', verifyToken, async(req, res) => {
  try{
const records = await ProductionRecord.findAll();
return res.status(200).json({success:true, records});
  }catch(err){
return res.status(500).json({
  success:false, message:'통합 관제 데이터 조회 실패'});
  }
});

app.post('/api/analytics/records', verifyToken, async(req, res) => {
  try{
/*
// 1. 요청 본문(req.body)에서 스마트팩토리 라인명, 
// 목표 생산량, 실제 양품 생산량, 불량 대수를 비구조화 
// 할당으로 추출합니다.
*/    
const {lineName, targetCount, actualCount, defectCount} = req.body;

//2. 해당 공정에서 생산된 총 수량
// (전체 생산 수 = 실제 양품 수 + 불량 대수)을 계산하여 
// total 변수에 담습니다.
const total = actualCount + defectCount;
/* 3. 총 생산 수(total)가 0보다 클 경우 
전체 생산량 대비 양품 수의 비율을 계산하고
(소수점 둘째 자리까지 반올림 후 숫자로 변환), 
0이면 0으로 인한 에러(Division by zero)를 
방지하기 위해 기본 수율 100.0%를 부여합니다.*/
const yieldRate =
total > 0 ? Number(((actualCount / total) * 100)
.toFixed(2)) : 100.0;
//Sequelize의 ORM 메서드인 `create`를 사용
const record = await ProductionRecord.create({
lineName, targetCount, actualCount, defectCount, 
yieldRate
});
return res.status(201).json({sucess:true, record});
  }catch(err){
return res.status(500).json({success:false, 
  message:'통합 관제 데이터 등록 실패'});    
  }
})
