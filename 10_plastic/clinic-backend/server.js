/*
서버를 아주 쉽게 만들 수 있도록 도와주는
 Node.js의 대표적인 프레임워크인 'Express'
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
//환경변수(DB 비밀번호, 포트 번호 등)를 읽어서 프로그램에 적용
const bcrypt = require('bcrypt');
const AppDataSource = require("./db");
const Member = require("./src/entity/Member");
/*
주소가 다르면 다르면 브라우저가 
보안상 요청을 막는데, 이를 허용해 줍니다
*/

//Express의 기능들을 사용할 수 있도록 'app'이라는 이름의 서버 객체를 만듭니다.
const app = express();
app.use(cors());
app.use(express.json());

//서버시작시 TypeORM DB연결
AppDataSource.initialize()
.then(() => {console.log("오라클db가 성공적으로 연결");})
.catch((error) => console.log("db 연결실패", error));

app.get('/api/health', (req, res) => {
    res.json({status:'ok', message:'성형외과 백앤드 서버가 정상 작동중'});
});

//회원가입 API
app.post('/api/register', async(req, res) => {
    try{
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

//add 1.비밀번호 암호화
/*
해킹을 당해도 원본 비밀번호를 알 수 없도록 
'소금(salt)'이라는 무작위 문자열을 생성합니다.
숫자 10은 복잡도를 의미하며, 
클수록 안전하지만 서버가 계산하는 데 시간이 더 걸립니다.
보통 10을 사용합니다
*/
const salt = await bcrypt.genSalt(10);
/*
사용자가 입력한 비밀번호(userPw)에 생성된 
소금(salt)을 버무려 알아볼 수 없는 
복잡한 암호(해시)로 만듭니다.
*/
const hashedPw = await bcrypt.hash(userPw, salt);

const memberRepository = AppDataSource.getRepository(Member);

const newMember = {
    USER_NAME:userName, 
    USER_ID:userId,
    USER_PW:hashedPw,
    EMAIL:email,
    IS_MAIL_AGREED:isMailAgreed ? 'Y' : 'N',
    PHONE:phone,
    IS_SNS_AGREED:isSnsAgreed ? 'Y' : 'N',
    GENDER:gender,
    RESIDENT_NUM:residentNum,
    ZIPCODE:zipcode,
    ADDRESS1:address1,
    ADDRESS2:address2,
};

await memberRepository.save(newMember);

res.status(201).json({success:true, message:'회원가입이 완료 되었습니다'})
}catch(error){
if(error.message && error.message.includes('ORA-00001')){
console.error('회원가입 에러: 중복된 아이디 입니다..');
return res.status(409).json({success:false, message:'이미 사용 중인 아이디입니다.'})   
}
console.error('회원가입 에러:', error);
res.status(500).json({success:false, message:'회원가입중 서버오류 발생'})
}
})

/*서버 시작 과정을 순서대로 처리하기 위한 비동기 함수를 선언
async function startup(){
    console.log('서버 시작 중.....');
 try{
   //DB 연결 초기화
    await AppDataSource.initalize();
    console.log('TypeORM 오라클 DB연결 완료..')
    /*
    지정한 포트(5000번)에서 클라이언트의 요청을 
    기다리기(listen) 시작합니다

    app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
   })
 }catch(error){
console.error("DB연결실패: ", error);
 }

}
startup();    */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
/*process.on('SIGINT', async () => {
    console.log('서버를 종료합니다...');
// db.js의 close 함수를 불러와 열려있는 DB 연결을 안전하게 먼저 끊어줍니다.    
    await db.close();
// DB 연결을 다 끊었으면 Node.js 프로세스를 정상적으로 완전히 종료(0)합니다.
    process.exit(0);
})*/
