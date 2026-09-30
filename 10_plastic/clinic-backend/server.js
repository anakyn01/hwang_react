require('dotenv').config();
const {Like} = require("typeorm");
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const AppDataSource = require("./db"); // db.js 파일 경로 확인

const Member = require("./src/entity/Member"); // Member.js 파일 경로 확인
const FooterSettings = require("./src/entity/FooterSettings");
const Consult = require('./src/entity/Consult');
const NavSetting = require('./src/entity/NavSetting');
const MainVisual = require("./src/entity/MainVisual");
const ToneSetting = require("./src/entity/ToneSetting");
const PopupSetting = require("./src/entity/PopupSetting");
const Popup = require("./src/entity/Popup");

const nodemailer = require('nodemailer');

const multer = require('multer');
const fs = require('fs');
const path = require('path');

/*
💡 업로드된 이미지를 프론트에서 볼 수 있도록 폴더 개방
(app.use 들이 모여있는 곳에 추가)
*/

const app = express();

// 1. CORS 설정 (프론트엔드 3000번 포트의 접근만 안전하게 허용)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
//이미지
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//업로드 폴더가 없으면 자동으로 생성
const uploadDir = 
path.join(__dirname, 'public/images');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive:true});
}

//파일저장규칙 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename:function(req, file, cb) {
// 한글 이름 깨짐 방지 및 중복 방지를 
// 위해 파일명 앞에 현재 시간(ms)을 붙임  
const ext = path.extname(file.originalname);
cb(null, Date.now() + ext);      
    }
});
const upload = multer({storage: storage});

app.post('/api/admin/upload', upload.single('logoImage'),(req, res) => {
    if(!req.file) {
        return res.status(400).json({
            success:false, message:'파일이 없습니다'
        });
    }
    res.status(200).json({success:true, fileName:req.file.filename})
})

// 2. TypeORM 오라클 DB 연결
AppDataSource.initialize()
    .then(() => {
        console.log("✅ 오라클 DB가 성공적으로 연결되었습니다.");
    })
    .catch((error) => {
        console.error("❌ DB 연결 실패:", error);
    });

// 3. 헬스 체크 API (서버 상태 확인용)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: '성형외과 백엔드 서버가 정상 작동 중입니다.' });
});

// 4. 회원가입 API
app.post('/api/register', async (req, res) => {
    try {
        // 프론트엔드에서 보낸 데이터 분해
        const {
            userName,
            userId,
            userPw,
            email,
            isMailAgreed,
            phone,
            isSnsAgreed,
            gender,
            residentNum,
            zipcode,
            address1,
            address2,
        } = req.body;

        // 🎯 [추가됨] 필수값 검증 로직: 하나라도 없으면 DB까지 안 가고 서버에서 바로 차단
        if (!userName || !userId || !userPw || !email || !phone || !residentNum) {
            return res.status(400).json({
                success: false,
                message: '필수 입력값이 누락되었습니다. (이름, 아이디, 비밀번호, 이메일, 휴대폰번호, 주민등록번호)'
            });
        }

        // 비밀번호 암호화 (소금 뿌리기)
        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(userPw, salt);

        // DB 저장을 위한 레포지토리 가져오기
        const memberRepository = AppDataSource.getRepository(Member);

        // DB 컬럼에 맞게 데이터 조립 (IS_ADMIN은 DB 기본값 0으로 자동 세팅됨)
        const newMember = {
            USER_NAME: userName,
            USER_ID: userId,
            USER_PW: hashedPw,
            EMAIL: email,
            IS_MAIL_AGREED: isMailAgreed ? 'Y' : 'N', // 💡 DB에 IS_MAIL_AGREED 컬럼 필수!
            PHONE: phone,
            IS_SNS_AGREED: isSnsAgreed ? 'Y' : 'N',
            GENDER: gender,
            RESIDENT_NUM: residentNum,
            ZIPCODE: zipcode,
            ADDRESS1: address1,
            ADDRESS2: address2,
        };

        // DB에 저장 실행
        await memberRepository.save(newMember);

        // 성공 응답
        res.status(201).json({ success: true, message: '회원가입이 완료되었습니다.' });

    } catch (error) {
        // 🎯 오라클 UNIQUE 제약조건 위배 에러 (아이디 중복 처리)
        if (error.message && error.message.includes('ORA-00001')) {
            console.error('회원가입 에러: 중복된 아이디입니다.');
            return res.status(409).json({ success: false, message: '이미 사용 중인 아이디입니다.' });
        }

        // 그 외 서버 에러 처리
        console.error('회원가입 에러:', error);
        res.status(500).json({ success: false, message: '회원가입 중 서버 오류가 발생했습니다.' });
    }
});

//로그인 api 코드 추가하기
app.post('/api/login', async(req, res) => {
try{
// 프론트 앤드에서 보낸 아이디와 비밀번호 받기
const {userId, userPw} = req.body;
// 비워진 것에 대한 방어
if(!userId || !userPw) {
    return res.status(400).json({
        success:false,
        message:'아이디와 패스워드를 모두 입력해 주세요'
    });
}

//db 리파지토리 가져오기
const memberRepository =
AppDataSource.getRepository(Member);

//db에서 해당 아이디를 가진 회원 찾기
const user = await memberRepository.findOne({
where:{USER_ID: userId}    
})

//가입된 아이디가 없는 경우
if(!user) {
    return res.status(401).json({
        success:false,
        message:'존재하지 않는 아이디입니다'
    });
}
//비밀번호 검증(프론트에서 온 평문 비밀번호 vs DB의 암호화된 비밀번호)
const isMatch = 
await bcrypt.compare(userPw, user.USER_PW);

//비밀번호가 틀린경우
if(!isMatch) {
    return res.status(401).json({
success:false,
message:'비밀번호가 일치하지 않습니다'       
    });
}

//4 로그인 성공! (프론트앤드에서 라우팅을 위해 isAdmin값을 같이 넘겨줍니다)
res.status(200).json({
success:true, message:'로그인에 성공했습니다',
isAdmin:user.IS_ADMIN 
//관리자면 1, 일반 회원이면 0   
})
}catch(error){
console.error('로그인 에러:',error);
res.status(500).json({
success:false,
message:'로그인 처리중 서버 오류가 발생했습니다'    
});
}
});

//footer세팅 관리자
app.get('/api/admin/footer', async (req, res) =>{
    try{
// 테이블 데이터를 다룰수 있는 권한(저장소)를 가져 옵니다
const footerRepo = AppDataSource.getRepository(FooterSettings);
// 푸터 설정은 여러개가 필요 없습니다 무조건 고유번호가 1번인 데이터 딱 하나만 찾습니다
const footer = await footerRepo.findOne({where:{id:1}});
// 만약 테이블을 방금 만들어서 아직 한번도 저장한 적이 없다면
if(!footer) {
    //에러가 아니기에 프론트앤드가 뻗지 않게 빈 껍데기를 성공 상태로 보냅니다
    return res.status(200).json({ success:true, data:null});
}
// db에서 찾은 데이터를 프론트엔드의 3가지 상태(state)구조에 완벽히 맞춰서 조립
res.status(200).json({
    success:true,
    data:{
        companyInfo:{
name: footer.name || "",
address:footer.address || "",
clinicName:footer.clinicName||"",
phone:footer.phone||"",
email:footer.email||"",
locationUrl:footer.locationUrl||""            
        },
        schedules:footer.schedules||[],
        familySites:footer.familySites||[]
    }
})
    }catch (error) {
console.error('푸터 조회 에러:', error);
res.status(500).json({
    success:false,
    message:'푸터 데이터를 불러오지 못했습니다'
})
    }
});
//footer post
app.post('/api/admin/footer', async(req, res) => {
    try{
//1) 프론트에서 post로 보낸 데이터(req.body)를 3개의 덩어리로 분해
const {companyInfo, schedules, familySites} = req.body;
//2) 테이블 저장소를 가지고 옵니다
const footerRepo = AppDataSource.getRepository(FooterSettings);
/*3) 덮어쓰기를 하기 위해 기존에 저장된 설정(id가 1번인 데이터)이 
있는지 먼저 찾아봅니다.*/
let footer = await footerRepo.findOne({where:{id:1}});

//4. 만약 최초 저장이라 기존 데이터가 없다면?
if(!footer) {
//db에 새롭게 넣을 준비를 합니다 이때 고유번호(id)는 무조건 1로 강제 고정합니다!
footer = footerRepo.create({id:1});
}

footer.name = companyInfo.name;
footer.address = companyInfo.address;
footer.clinicName = companyInfo.clinicName;
footer.phone = companyInfo.phone;
footer.email = companyInfo.email;
footer.locationUrl = companyInfo.locationUrl;
footer.schedules = schedules;
footer.familySites = familySites;

//footer객체를 최종적으로 저장
await footerRepo.save(footer);

//
res.status(200).json({
    success:true, message:'푸터설정이 성공적으로 저장되었습니다'
})
    } catch(error){
console.error('푸터 저장 에러: ',error);
res.status(500).json({
success:false,
message:'푸터 저장 중 서버 오류가 발생했습니다.'
});
    }
})

//퀵상담
app.post('/api/consult/quick', async (req, res) => {
try{
const {name, phone, department} = req.body;
//필수값 검증
if(!name || !phone || !department) {
return res.status(400).json({success:false, message:'이름, 연락처, 상담분야를 모두 입력해 주세요'})    
}
const consultRepo = AppDataSource.getRepository(Consult);

const newConsult = consultRepo.create({
NAME:name, 
PHONE:phone, 
DEPARTMENT:department, 
PASSWORD:"0000",
USER_ID:"비회원",
TITLE:`[빠른상담] ${department} 문의입니다`,
CONTENT:`${name}님의 빠른 상담 신청입니다. 빠른 시일내에 연락바랍니다`,
STATUS:'대기중'
});
//3.DB저장
await consultRepo.save(newConsult);
res.status(200).json({
    success:true, 
    message:'빠른 상담 신청이 완료되었습니다'})
} catch(error) {
console.error('빠른 상담 신청 에러:', error);
res.status(500).json({ success:false, message:'상담 신청중 오류가 발생했습니다'})
}
});

//상담내역 전체 조회
app.get('/api/admin/consult', async (req, res) => {
    try{
const consultRepo = AppDataSource.getRepository(Consult);
const list = await consultRepo.find({ order:{CREATED_AT:"DESC"}});
res.status(200).json({success:true, data:list});
    }catch(error){
console.error('상담 내역 조회 에러:', error);        
res.status(500).json({success:false});
    }
});
//상담 상태 토글
app.put('/api/admin/consult/:id/status', async (req, res) => {
    try{
const consultRepo = AppDataSource.getRepository(Consult);
const consult = await consultRepo.findOne({ where:{ID:req.params.id}});
if (!consult) return res.status(404).json({ success:false, message:"데이터가 없습니다"})
consult.STATUS = consult.STATUS === '대기중' ? '상담완료' : '대기중';   
await consultRepo.save(consult);
res.status(200).json({success:true, message:'상태가 변경되었습니다'});
}catch(error){
res.status(500).json({success:false, message:'상태가 변경 실패'});
    }
});
//상담 내역 삭제
app.delete('/api/admin/consult/:id', async (req, res) => {
    try{
const consultRepo = AppDataSource.getRepository(Consult);
await consultRepo.delete(req.params.id);
res.status(200).json({success:true});
    }catch(error){
console.error('상담 삭제 에러:', error);        
res.status(500).json({success:false});
    }
});

//[ADMIN] 내비게이션 설정 API
app.get('/api/admin/nav' , async ( req, res) => {
    try{
const navRepo =
AppDataSource.getRepository(NavSetting);
let setting = await navRepo.findOne({where:{ID:1}});
//처음 세팅이라 DB에 값이 없다면 기본값을 내려줍니다.
if(!setting) {
    return res.status(200).json({
success:true,
data:{
    LOGO_TYPE:"TEXT",
    LOGO_TEXT:"안효범안스성형외과",
    LOGO_FILE:"",
    MENUS:"[]"
}        
    });
}
res.status(200).json({success:true, data:setting});
    }catch(error){
console.error('내비게이션 조회 에러:', error);
res.status(500).json({success:false});
    }
});

//최초저장이거나 변경
app.put('/api/admin/nav' , async ( req, res) => {
    try{
//프론트에서 보낸 데이터
const {logoType, logoText, logoFileName, menus} = req.body;
const navRepo = AppDataSource.getRepository(NavSetting);
// DB에 기존 설정이 없으면 ID 1번으로 새로 생성
let setting = await navRepo.findOne({where:{ID:1}});

if(!setting) {
    setting = navRepo.create({ID:1});
}

setting.LOGO_TYPE = logoType;
setting.LOGO_TEXT = logoText || "";
setting.LOGO_FILE = logoFileName || "";

//💡 프론트에서 넘어온 배열(menus)을 오라클 clob에 넣기 위해 문자열(JSON)로 변환
setting.MENUS = JSON.stringify(menus);
await navRepo.save(setting);
res.status(200).json({success:true});
    }catch(error){
console.error('내비게이션 저장 에러', error);
res.status(500).json({success:false});
    }
});

//메인 비주얼 캐러셀 설정
app.get('/api/admin/visual', async(req, res) => {
try{
const visualRepo=AppDataSource.getRepository(MainVisual);
let setting = await visualRepo.findOne({where:{ID:1}});

if(!setting) {
return res.status(200).json({success:true, data:{SLIDES:"[]"}});
}
res.status(200).json({success:true, data:setting});
}catch(error){
console.error('메인비주얼 조회 에러:', error);
res.status(500).json({success:false});
}
});
app.put('/api/admin/visual', async(req, res) => {
try{
const {slides} = req.body;    
const visualRepo=AppDataSource.getRepository(MainVisual);

let setting = await visualRepo.findOne({where:{ID:1}});

if(!setting) {
setting = visualRepo.create({ID:1});
}

setting.SLIDES = JSON.stringify(slides);

await visualRepo.save(setting);
res.status(200).json({success:true});
}catch(error){
console.error('메인비주얼 저장 에러:', error);
res.status(500).json({success:false});    
}
});

//1.회원목록전체조회(최신 가입순)
app.get('/api/admin/users', async (req, res) => {
try{
const memberRepo = AppDataSource.getRepository(Member);

//프론트에서 보낸 파라미터 받기(기본값 설정)
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const search = req.query.search || "";

//데이터베이스에게 건너뛸 개수 계산
const skip = (page - 1) * limit;

//검색어가 있으면 이름(USER_NAME)으로 필터링
const whereClause = search ? { USER_NAME: Like(`%${search}%`)}:{};

//데이터 검색 및 전체개수(totalCount)같이 가져오기
const [users, totalCount] = await memberRepo.findAndCount({
where:whereClause,
order:{USER_IDX: "DESC"},
skip:skip,
take:limit    
});

//총 페이지 수 계산
const totalPages = Math.ceil(totalCount / limit);


res.status(200).json({
    success:true, 
    data:users,
pagination:{
totalCount, totalPages, 
currentPage:page,
limit    
}
});
}catch(error){
console.error('회원목록조회에러:', error);
res.status(500).json({success:false, message:'서버 에러'});
}
});

app.put('/api/admin/users/:idx/status', async (req, res) => {
try{
const memberRepo = AppDataSource.getRepository(Member);
const users = await memberRepo.find({where:{USER_IDX:req.params.idx}});

if(!user) return res.status(404).json({success:false, message:'회원이 없습니다'})
user.STATUS = user.STATUS === '정지' ? '정상' :'정지';
await memberRepo.save(user);
res.status(200).json({success:true, message:'상태가 변경 되었습니다'});
}catch(error){
console.error('상태 변경 에러:', error);
res.status(500).json({success:false});
}
});

app.delete('/api/admin/users/:idx', async (req, res) => {
try{
const memberRepo = AppDataSource.getRepository(Member);
await memberRepo.delete(req.params.idx);
res.status(200).json({success:true, message:'삭제되었습니다'});
}catch(error){
console.error('회원목록조회에러:', error);
res.status(500).json({success:false});
}
});

//톤앤매너 설정
app.get('/api/admin/tone', async(req, res) => {
    try{
const toneRepo = AppDataSource.getRepository(ToneSetting);
let setting = await toneRepo.findOne({where:{ID: 1}});

if(!setting){
return res.status(200).json({success:true, 
    data:{PRIMARY_TONE:"BLUE", IS_DARK_MODE:"N"}});
}
res.status(200).json({success:true, data:setting});
    }catch(error){
console.error('테마 설정 조회 에러:', error);
res.status(500).json({success:false});
    }
});
app.put('/api/admin/tone', async(req, res) => {

    try{
const { primaryTone, isDarkMode} = req.body;

const toneRepo = AppDataSource.getRepository(ToneSetting);
let setting = await toneRepo.findOne({where:{ID: 1}});
if(!setting){
setting = toneRepo.create({ID:1});
}
setting.PRIMARY_TONE = primaryTone;
setting.IS_DARK_MODE = isDarkMode;

await toneRepo.save(setting);
res.status(200).json({success:true});
    }catch(error){
console.error('테마 설정 조회 에러:', error);
res.status(500).json({success:false});
    }
});

//1. 팝업 목록 및 설정 전체 조회
app.get('/api/admin/popups', async(req, res) => {
try{
const settingRepo = AppDataSource.getRepository(PopupSetting);
const popupRepo = AppDataSource.getRepository(Popup);

let setting = await settingRepo.findOne({where:{ID: 1}});
const popups = await popupRepo.find({order:{POPUP_IDX:"DESC"}});

res.status(200).json({
success:true,
maxPopups:setting ? setting.MAX_POPUPS: 1, 
popups   
});
}catch(error){
console.error('팝업 조회 에러:', error);
res.status(500).json({success:false});    
}
});

// 2. 최대 노출 갯수 설정 저장
app.put('/api/admin/popups/setting', async(req, res) => {
try{
const {maxPopups} = req.body;    
const settingRepo =AppDataSource.getRepository(PopupSetting);

let setting = await settingRepo.findOne({where:{ID: 1}});

if(!setting) setting = settingRepo.create({ID:1});

setting.MAX_POPUPS = maxPopups;
await settingRepo.save(setting);

res.status(200).json({success:true});
}catch(error){
console.error('팝업 조회 에러:', error);
res.status(500).json({success:false});       
}
});

// 3. 새 팝업 등록 (이미지 업로드 포함)
app.post('/api/admin/popups', upload.single('popupImg'), async(req, res) => {
try{
if(!req.file) return res.status(400).json({
success:false, message:"이미지가 없습니다"    
});
const {title, link, startDate, endDate, useTodayClose} = req.body;   
const popupRepo = AppDataSource.getRepository(Popup);

const newPopup = popupRepo.create({
TITLE:title,
LINK:link || "",
FILE_NAME:req.file.filename,
START_DATE :startDate,
END_DATE :endDate,
USE_TODAY_CLOSE :useTodayClose === 'true' ? 'Y' : 'N'     
});
await popupRepo.save(newPopup);
res.status(200).json({success: true});
}catch(error){
console.error('팝업 등록 에러:', error);
res.status(500).json({success:false});       
}
});
// 4. 팝업 삭제
app.delete('/api/admin/popups/:idx', async(req, res) => {
try{
const popupRepo = AppDataSource.getRepository(Popup);
await popupRepo.delete(req.params.idx);
res.status(200).json({success:true});
}catch(error){
console.error('팝업 삭제 에러:', error);
res.status(500).json({success:false});   
}
});

// 5. 서버 실행
const PORT = process.env.PORT || 4000;

//비밀번호 찾기
app.post('/api/send-reset-email', async (req, res) => {
    try{
const{userId, userName , phone} = req.body;

if(!userId|| !userName || !phone) {
return res.status(400).json({
    success:false, message:'인증 정보를 모두 입력해 주세요'
});
}

const memberRepository = 
AppDataSource.getRepository(Member);

//오라클에서 찾기
const user = await memberRepository.findOne({
where:{ USER_ID:userId, USER_NAME:userName, PHONE:phone}    
});

if(!user) {
return res.status(401).json({
sucess:false,
message:'입력하신 정보와 일치하는 회원이 없습니다.'    
});
}

//이메일 발송기 세팅(구글 gmail 기준)
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'anakyn01@gmail.com',
    pass:''
  }  
});

const resetUrl =
`http://localhost:3000/find/reset?userId=${user.USER_ID}`;

const mailOptions = {
from: '"성형외과 관리자" <nop@nobodyhelpme.com>',
to: user.EMAIL, // DB에 저장된 유저의 이메일로 쏩니다!
subject: '[성형외과] 비밀번호 재설정 안내',
html:`
<div style="padding: 20px; text-align: center;">
<h2>비밀번호 재설정</h2>
<p>${user.USER_NAME}님, 본인인증이 완료되었습니다.</p>
<p>아래 버튼을 클릭하여 새로운 비밀번호를 설정해 주세요.</p>
<a href="${resetUrl}" style="display:inline-block; padding:10px 20px; background-color:#4e73df; color:#fff; text-decoration:none; border-radius:5px; margin-top:20px;">
새 비밀번호 설정하기
</a>
</div>
`  
};
//이메일 전송
await transporter.sendMail(mailOptions);
res.status(200).json({
success:true, message:'이메일 발송 성공'
});
    }catch(error){
console.error('이메일 발송 에러', error);
res.status(500).json({
    success:false, message:'서버 오류가 발생했습니다'
});
    }
})

//비밀번호변경 api
app.post('/api/reset-password', async(req, res) => {
    try{
const {userId, newPw} = req.body;

if(!userId || !newPw) {
    return res.status(400).json({
        success:false, message:'잘못된 요청입니다.'
    });
}

const memberRepository = AppDataSource.getRepository(Member);

const user = await memberRepository.findOne({
 where:{USER_ID:userId}   
});

if(!user) {
    return res.status(404).json({
        success:false, message:'회원을 찾을 수 없습니다.'
    });
}

//새비밀번호를 암호화
const hashedPw = await bcrypt.hash(newPw, 10);

user.USER_PW = hashedPw;

await memberRepository.save(user);

res.status(200).json({
        success:false, message:'비밀번호가 성공적으로 변경되었습니다.'
    });
    }catch(error){
console.error('비밀번호 업데이트 에러:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
});

//포트폴리오로 고도화 아이디 확인하고 그사람에 가입 이메일을 판단하고..거기에 맞는 이메일 발송하겠끔..


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});