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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`백앤드 서버가 http://localhost:${PORT} 에서 열심히 돌아가고 있습니다`)
})
