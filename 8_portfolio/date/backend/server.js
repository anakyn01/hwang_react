const express = require('express');
//웹 서버를 만들기 위한 가장 기본적인 도구인 express를 가져옵니다.
const cors = require('cors');
//플러터 앱과 백엔드 서버의 주소가 달라도 통신이 되게끔 허락해주는 보안 도구입니다.

//DB와 자바스크립트를 연결해주는 번역기인 Sequelize 도구를 가져옵니다.
const {Sequelize, DataTypes, Op} = 
require('sequelize');

//bcrypt
const bcrypt = require('bcrypt');

//모델 임포트
const sequelize = require('./config/database');
const User = require('./models/User');
const Match = require('./models/Match');
const Diary = require('./models/Diary');
const Admin = require('./models/Admin');
//express 도구를 실행해서 'app'이라는 이름의 서버 객체를 만듭니다.
const app = express();

//서버의 기본 규칙(미들웨어)을 설정합니다.
app.use(cors());
app.use(express.json());

const multer = require('multer');
const path = require('path');
const fs = require('fs');

//업로드 폴더가 없으면 자동 생성
if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');
//외부(플러터)에서 업로드된 사진을 URL로 볼 수 있게 허용
app.use('/uploads', express.static('uploads'));
//사진 저장 규칙 설정
const storage = multer.diskStorage({
destination:(req, file, cb) => cb(null, 'uploads/'), 
filename:(req, file, cb) => cb(null, Date.now() + path.extname(
 file.originalname))  
});
const upload = multer({storage});

/*
서버 역할을 할 핵심 객체를 만듭니다
express 도구를 실행해서 'app'이라는 
이름의 서버 준비를 마칩니다
*/


//MariaDB(주방)와 연결할 통로(커넥션 풀)를 만듭니다.
// const sequelize = new Sequelize('dating_db','root','1234',{
//     host:'localhost',
//     dialect:'mysql',
//     logging:false,
// });

//🚀 3. 실제 영업 시작 (API 엔드포인트)
//회원가입..
//새로운 유저를 맞이할 준비! (회원가입)
app.post('/api/signup', upload.array('photos', 3),async (req, res) => {
//1. 프론트엔드(사용자)가 보낸 가입 정보들을 꺼냅니다.
const {email, password, nickname,age,
    gender,photos, bio} =req.body;
//2. 필수 정보가 다 있는지 확인합니다. (간단한 문지기 역할)
if (!email || !password || !nickname 
    || !age || !gender ) {
    return res.status(400).json({
        success:false,
        message:'필수 정보를 모두 입력 사항입니다.'
    });
}
//트랜잭션을 엽니다
const t = await sequelize.transaction();
try{
//사진처리
let profile_image_main = 
req.files[0] ? `/uploads/${req.files[0].filename}` :null;
let profile_image_sub1 = 
req.files[1] ? `/uploads/${req.files[1].filename}` :null;
let profile_image_sub2 = 
req.files[2] ? `/uploads/${req.files[2].filename}` :null;

//add
const hashedPassword = await bcrypt.hash(password, 10);

const newUser = await User.create({
    email, 
    password:hashedPassword,//무언가 새로 바꾸면 적용을 필히.. 
    nickname, 
    age, 
    gender, 
    bio,
    profile_image_main,
    profile_image_sub1,
    profile_image_sub2,
    status:'PENDING'
},{ transaction: t});

await t.commit(); 

//4. 성공적으로 가입되었다고 안내합니다.
res.json({
    success:true,
    message:'회원가입이 완료되었습니다! 승인여부 확인후 2-3일 내로 처리해드리겠습니다',
    newUserId: newUser.id//새로 생성된 아이디를 프론트엔드로 보내줌
});
} catch (error) {
    await t.rollback();
    console.error(error);
    /*이메일 중복 에러캐치*/
    if(error.name === 'SequelizeUniqueConstrantError'){
    return res.status(409).json({
        success:false,
        message:'이미 가입된 정보(이메일)가 존재합니다'
    });
} 

//그외에 사고 발생시..
res.status(500).json({
    success:false, 
    message:'회원가입 처리중에 서버 에러가 발생했습니다'
});

}
});

//2차 회원가입
app.patch('/api/users/:id/secondary-signup', async(req, res) =>{
const userId = req.params.id;
const { phone_number, occupation, address} = req.body; 
try{
const user = await User.findByPk(userId);
if(!user) {
return res.status(404).json({
success:false, message:'유저를 찾을수 없습니다'    
});
}
await user.update({phone_number, occupation, address});
res.json({success:true, message:'추가 정보 입력이 완료되었습니다'});
}catch(error){
console.error("2차 회원가입 에러:", error);
res.status(500).json({
success:false, message:'정보 저장중 에러가 발생했습니다'
});    
}   
})

//로그인
app.post('/api/login', async (req, res) => {
    // req.body에서 사용자가 앱에 입력한 이메일과 비밀번호를 꺼냅니다.
    const {email, password} = req.body;
/*
DB의 User 테이블에서 이메일과 비번이 똑같은 사람 1명
(findOne)을 찾습니다.
*/
try{
const user = 
await User.findOne({where:{ email}});
//// 만약 못 찾았다면? (null)
if(!user){
 // 401(권한없음) 에러를 앱으로 돌려보냅니다.
 return res.status(401).json({
    success:false, message:'이메일이나 비밀번호가 틀렸습니다'
 });
}

//add bcrypt
const isMatch = 
await bcrypt.compare(password, user.password);
if(!isMatch){
return res.status(401).json({
success:false, message:'이메일이나 비밀번호가 틀렸습니다'    
});   
}
 
 //상태 검사 1: 관리자가 아직 승인 안 한 대기 상태라면?
 if(user.status === 'PENDING'){
    return res.status(403).json({
 success:false, message:'수질 검사(승인)가 진행 중입니다. 조금만 기다려주세요!'       
    });
 }

 //상태 검사 2: 노쇼 3번 해서 영구정지 당한 사람
 if (user.status === 'BANNED'){
    return res.status(403).json({
        success:false,
        message:'이용 수칙 위반으로 영구 정지된 계정입니다.'
    });
 }

//모든 관문을 통과했다면 정상 로그인 성공!
res.json({ success:true, message:'로그인 성공', user});

} catch (error) {
    console.error("로그인 에러:", error);
res.status(500).json({
success:false, message:'서버 에러가 발생 했습니다'});   
}
});

//💘 매칭 수락 및 포인트 차감 (트랜잭션)

app.get('/api/match/accept', async (req, res) => {
// 매칭 번호(match_id)와 수락 버튼을 누른 사람 번호(user_id)를 꺼냅니다.
const { match_id, user_id } = req.body;
/*
돈이 빠져나가는 중요한 작업이므로, 
중간에 에러가 나면 무를 수 있게 트랜잭션(t)을 엽니다.
*/
const t = await sequelize.transaction();
try{
// 1. 수락 누른 사람의 정보를 DB에서 가져옵니다.
const user = await User.findByPk(user_id);
// 돈이 없으면 실행이 안되게..에러를 발생시켜 아래에 코드가 안돌게 막습니다
if(user.points < 100 ) {
    throw new Error('포인트가 부족합니다. 충전해 주세요!');
}
//내 포인트에서 100점을 뺍니다. (트랜잭션 t에 포함시킴)
await user.update({ points:user.points - 100},{ transction:t});
//4.매칭 상태를 요청에서 수락으로 바꿉니다
await match_id.update({ status:'ACCEPTED'},{where:{id:match_id},
transaction:t});

await t.commit();

//명령어는 있지만 결과값이 없습니다
res.json({success:true, message:'수락 완료! 연락처가 열렸습니다.'});
} catch (error) {
    //중간에 에러가 났다면, 돈 빠져나간 걸 다시 되돌립니다(rollback).
    await t.rollback();
    res.status(400).json({
        success:false, message:error.message
    });
}
});
/*굳이 조인이 아닌 left조인 사용한 이유..
사진이 null값이면..
리스트에 등장하지못함
*/
//상배방에 좋아요 ㅅㄹ어..기록
/*app.post('/api/swipe', async(req, res) => {
const {sender_id, receiver_id, action} = req.body;

try{
    await pool.query(
'INSERT INTO matches (sender_id, receiver_id, action) VALUES (?, ?, ?)',
[sender_id, receiver_id, action]
    )

}catch(error){
    console.error(error);
            res.status(500).json({
success: false, message:'저장에 실패했습니다.'            
        })
}
})*/

//🚨 노쇼 신고 접수 (3진 아웃)
app.post('/api/match/noshow', async (req, res) => {
// target_user_id는 노쇼를 한 "나쁜 놈"의 ID 번호입니다.
const {match_id, target_user_id} = req.body;
//1. 해당 매칭 건을 '노쇼' 상태로 바꿉니다.
await match_id.update({ status:'NO_SHOW'},{where:{id:match_id}});
//
const targetUser = await User.findByPk(target_user_id);
//기존 노쇼횟수에 1을 더함..
const newCount = targetUser.no_show_count + 1;
//4. 만약 이번 신고로 3번이 채워졌다면?
if (newCount >= 3){
    await targetUser.update({no_show_count:newCount, status:'BANNED'});
}else{
// 아직 1~2번이면 횟수만 올립니다.
await targetUser.update({no_show_count:newCount});    
}
res.json({success:true, message:'신고 접수 완료! 강력하게 제재하겠습니다'});
});

//mypage
app.get('/api/mypage/:user_id', async(req, res) =>{

    const userId = req.params.user_id;

    // 1. 유저의 기본 프로필 정보를 찾습니다. (이름, 나이 등등)
    const user = await User.findByPk(userId);

    //2.만남에 관련된 것을 모두 셉니다
    const receivedLikes = await Match.count({
where: {receiver_id:userId, status:'REQUESTED'}
});

//3. [성사된 매칭 개수]
const matchedCount = await Match.count({
where :{
[Op.or]:[{ sender_id:userId},{receiver_id:userId}],
status:'ACCEPTED'    
}    
});

// 4. [작성한 일기 개수]
const diaryCount = await Diary.count({
    where:{user_id:userId}
});

res.json({
    success:true,
    data:{
        profile:user,
        status:{
            received_likes: receivedLikes,
            matches: matchedCount,
            diaries: diaryCount
        }
    }
})


});

//admin start
app.post('/api/admin/login', async(req, res) => {
    const { email, password } = req.body;

    try {
const admin = await Admin.findOne({where:{email}});

if(!admin) {
    return res.status(401).json({
success:false, message:'Nop 관리자 이메일'        
    });
}

const isMatch = 
await bcrypt.compare(password, admin.password);

if(!isMatch) {
    return res.status(401).json({
success:false, message:'nop password'        
    });
}

res.json({
    success:true, name:admin.name,
    message:'관리자 대시보드에 로그인하셨습니다'
});
    } catch(error) {
console.error("어드민 로그인 에러", error);
res.status(500).json({
success:false, message:'서버 통시 에러'
});
    }
});

//유저 목록 조회
app.get('/api/admin/users', async (req, res) => {
    try{
const users = await User.findAll({ order:[['id','DESC']]});
res.json({success:true, users});
    }catch(error){
res.status(500).json({ 
    success:false, message:'유저 목록 로딩 실패'});
    }
});

app.patch('/api/admin/users/:id/approve', async(req, res) => {
    try {
const user = await User.findByPk(req.params.id);
if(!user) return res.status(404).json({
    success:false, message:'유저를 찾을수 없습니다'
});
await user.update({status:'ACTIVE'});
res.json({success:true, message:'승인 완료'});
    }catch(error) {
res.status(500).json({
    success:false, message:'승인처리실패'
});
    }
})
//admin end


const PORT = 3000;
app.listen(PORT, async () => {
    await sequelize.authenticate();
// 👉 1. 기존에 꼬여있는 테이블들을 밀어버리기 위해 '관계 보호 장치'를 잠시 끕니다.
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    //add
    await sequelize.sync({alter:true});

    // 👉 3. 테이블이 예쁘게 만들어졌으니 '관계 보호 장치'를 다시 켭니다.
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

//add 관리자 계정이 DB에 하나도 없으면 자동생성
const Admin = require('./models/Admin');
const adminCount = await Admin.count();
if (adminCount === 0){
const hashedAdminPassword = await bcrypt.hash('1234', 10);
await Admin.create({
email:'test@test.com',
password:hashedAdminPassword,
name:'최고관리자'    
})
console.log('기본 관리자 계정 생성완료(test@test.com / 1234)');
}

    console.log("데이터베이스 연결확인 완료");
    console.log(`백앤드 서버가 http://localhost:${PORT} 에서 열심히 돌아가고 있습니다`)
})
