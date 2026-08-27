const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
/*
서버 역할을 할 핵심 객체를 만듭니다
express 도구를 실행해서 'app'이라는 
이름의 서버 준비를 마칩니다
*/
//서버의 기본 규칙(미들웨어)을 설정합니다.
app.use(cors());
app.use(express.json());

//MariaDB(주방)와 연결할 통로(커넥션 풀)를 만듭니다.
const pool = mysql.createPool({
    host:'localhost',
    port:3307,
    user:'dateUser',
    password:'1234',
    database:'dating_db',
    waitForConnections:true,
    connectionLimit:10,
});

//유저 목록 줘!
app.get('/api/profiles', async (req, res) => {
    try{
const [rows] = await pool.query(`
SELECT 
u.id,
u.nickname,
TIMESTAMPDIFF(YEAR, u.birthdate, CURDATE()) AS age,
u.bio,
p.photo_url
FROM users u
LEFT JOIN user_photos p ON u.id = p.user_id AND p.is_main = TRUE
LIMIT 10  
    `);
//명령어는 있지만 결과값이 없습니다
res.json({success:true, data:rows});    
    }catch (error){
        console.error(error);
        res.status(500).json({
success: false, message:'DB 조회 중 에러가 발생했습니다.'            
        })
    }
})
/*굳이 조인이 아닌 left조인 사용한 이유..
사진이 null값이면..
리스트에 등장하지못함
*/
//상배방에 좋아요 ㅅㄹ어..기록
app.post('/api/swipe', async(req, res) => {
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
})

//새로운 유저를 맞이할 준비! (회원가입)
app.post('/api/signup', async (req, res) => {
//1. 프론트엔드(사용자)가 보낸 가입 정보들을 꺼냅니다.
const {email, password, nickname,age,gender,photos, interests, bio} =req.body;
//2. 필수 정보가 다 있는지 확인합니다. (간단한 문지기 역할)
if (!nickname || !age || !gender ) {
    return res.status(400).json({
        success:false,
        mesaage:'필수 정보를 모두 입력 사항입니다.'
    });

//트랜잭션을 위해서 단독 커넥션 하나를 빌려옵니다
const connection = await pool.getConnection();

}try{
 await connection.beginTransction();   
//3. MariaDB(주방)에 새로운 유저 정보를 등록(INSERT)합니다. 
const [userResult] = await connection.query(
`INSERT INTO users (email, password, nickname, age, gender, bio)
VALUES (?, ?, ?, ?, ?)
`,
[email, password, nickname, age, gender, bio]    
);
// 방금 가입된 사람의 고유 ID 번호
const newUserId = userResult.insertId;

//user_photos 테이블에 사진 저장
if(photos && photos.length > 0) {
    //여러 장의 사진을 한 번에 저장하기 위해 배열 형태로 묶어줍니다.
const photoValues = photos.map(p => [newUserId, p.url, p.isMain]);
await connection.query(
`INSERT INTO user_photos (user_id, photo_url, is_main) VALUES ?`,
[photoValues]
);
}

if(interests && interests.length > 0) {
const interestValues = interests.map(interest => [newUserId, interest]);
await connection.query(
    `INSERT INTO user_interests (user_id, interest) VALUES ?`,
    [interestValues]
);
}

await connection.commit();

//4. 성공적으로 가입되었다고 안내합니다.
res.json({
    success:true,
    message:'회원가입이 완료되었습니다! 승인여부 확인후 2-3일 내로 처리해드리겠습니다',
    newUserId: newUserId
});

} catch (error) {
    await connection.rollback();
    console.error(error);
    /*5. 만약 DB에 이메일이나 닉네임이 'UNIQUE'로 설정되어 있는데 
똑같은 값이 들어오면 중복 에러(ER_DUP_ENTRY)를 뱉어냅니다.
*/ 
if(error.code === 'ER_DUP_ENTRY'){
    return res.status(409).json({
        success:false,
        message:'이미 가입된 정보가 존재합니다'
    });
} 

//그외에 사고 발생시..
res.status(500).json({
    success:false, mesaage:'회원가입 처리중에 서버 에러가 발생했습니다'
})

}finally{
 connection.release();   
}
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`백앤드 서버가 http://localhost:${PORT} 에서 열심히 돌아가고 있습니다`)
})
