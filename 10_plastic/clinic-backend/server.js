/*
서버를 아주 쉽게 만들 수 있도록 도와주는
 Node.js의 대표적인 프레임워크인 'Express'
*/
const express = require('express');
/*
주소가 다르면 다르면 브라우저가 
보안상 요청을 막는데, 이를 허용해 줍니다
*/
const cors = require('cors');
//환경변수(DB 비밀번호, 포트 번호 등)를 읽어서 프로그램에 적용
require('dotenv').config();
//직접 만든 오라클 DB 연결 파일(db.js)을 불러와서 'db'라는 이름으로 사용
const db = require('./db');
const AppDataSource = require('./db');
//Express의 기능들을 사용할 수 있도록 'app'이라는 이름의 서버 객체를 만듭니다.
const app = express();

//.env 파일에 PORT 값이 있으면 그 값을 쓰고, 
// 없으면 기본값으로 5000번을 사용하라는 뜻
const port = process.env.PORT || 5000;

app.use(cors());
/*
클라이언트(프론트엔드)가 데이터를 
JSON 형식(예: { "name": "홍길동" })으로 보냈을 때,
서버가 이를 자바스크립트 객체로 이해하고 사용할 수 있도록 변환
*/
app.use(express.json());
/*
HTML 폼(form) 태그를 통해
전송된 데이터를 서버가 이해할 수 있도록 변환
extended: true는 복잡한 객체 형태의 데이터도 해석
*/
app.use(express.urlencoded({ extended:true}));

app.get('/api/health', (req, res) => {
    res.json({status:'ok', message:'성형외과 백앤드 서버가 정상 작동중'});
});

//회원가입 API
app.post('/api/register', async(req, res) => {
    try{
const {username, password, phone} = req.body;
const userRepository = AppDataSource.getRepository(User)

const newUser = userRepository.create({
    username:username, password:password,
    phone:phone
})

await userRepository.save(newUser);
res.json({success:true, message:'회원가입이 완료 되었습니다'})

    }catch(error){
if(error.message && error.message.includes('ORA-00001')){
console.error('회원가입 에러: 중복된 아이디 입니다..');
return res.status(409).json({success:false, message:'이미 사용 중인 아이디입니다.'})   
}
console.error('회원가입 에러:', error);
res.status(500).json({success:false, message:'회원가입중 서버오류 발생'})
    }
})

//서버 시작 과정을 순서대로 처리하기 위한 비동기 함수를 선언
async function startup(){
    console.log('서버 시작 중.....');
 try{
   //DB 연결 초기화
    await AppDataSource.initalize();
    console.log('TypeORM 오라클 DB연결 완료..')
    /*
    지정한 포트(5000번)에서 클라이언트의 요청을 
    기다리기(listen) 시작합니다
    */
    app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
   })
 }catch(error){
console.error("DB연결실패: ", error);
 }

}
startup();

process.on('SIGINT', async () => {
    console.log('서버를 종료합니다...');
// db.js의 close 함수를 불러와 열려있는 DB 연결을 안전하게 먼저 끊어줍니다.    
    await db.close();
// DB 연결을 다 끊었으면 Node.js 프로세스를 정상적으로 완전히 종료(0)합니다.
    process.exit(0);
})
