const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
//프론트엔드에서 보내는 JSON 데이터를 읽기 위한 설정입니다.

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'company'
});

db.connect((err) => {
    if(err) throw err;
    console.log('MySql (company) connected');
});

app.post('/api/users/register',(req, res) => {
    //1) 프론트에서 보낸 7가지 정보를 꺼내 옵니다
    const { firstName, lastName, email, password, zipCode, address, detailAddress} = req.body;
//2)DB의 users테이블에 이정보를 넣으라는 내용
const sql =`
INSERT INTO users (first_name, last_name, email, password, zip_code, adress, detail_address)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;

//? 자리에서 꺼내온 정보들을 순서대로 매칭해서 DB에 넣어주세용
db.query(sql,[firstName, lastName, email, password, zipCode, address, detailAddress], (err, result) => {
    if(err) {
        console.error('회원가입 에러:', err);
        if (err.code === 'ER_DUP_ENTRY'){
        return res.status(400).json({message:'이미 존재하는 이메일입니다'});
        }
        return res.status(500).json({message:'서버 오류가 발생했습니다'});
    }
//저장이 무사히 끝났다면 성공했다고 알려줌
res.status(201).json({message:'회원가입이 완료되었습니다'});
});
});

//서버실행
app.listen(5000,()=>{
    console.log('Server running on port 5000');
})