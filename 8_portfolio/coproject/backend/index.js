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
INSERT INTO users (first_name, last_name, email, password, zip_code, address, detail_address)
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

//login
app.post('/api/users/login',(req, res) => {
    //1)
    const {email, password} = req.body;

    //2)
    const sql ='SELECT * FROM users WHERE email = ? AND password = ?';

    //3)
    db.query(sql,[email, password], (err, results) => {

        if(err) {
            console.error('로그인 에러:',err);
            return res.status(500).json({message:'서버 오류가 발생했습니다'});
        }
        if(results.length === 0) {
return res.status(401).json({message:'이메일 또는 비밀번호가 올바르지 않습니다'})
        }
const user = results[0];//검색된 첫번째 회원 정보
res.status(200).json({
    message:'로그인 성공!',
    name:user.first_name
})        
    })
})

//회원목록조회 API
app.get('/api/users', (req, res) => {
    //비밀번호를 제외한 회원 정보들을 최근 가입순으로 가져옵니다
    const sql=`
SELECT id, first_name, last_name, email, zip_code, address, detail_address
FROM users
ORDER BY id DESC    
    `;

    db.query(sql, (err, results) => {
        if(err) {
            console.error('회원 목록 조회 에러:', err);
            return res.status(500).json({message:'서버 오류가 발생했습니다'});
        }
        //조회된 회원 배열을 프론트엔드로 보냅니다
        res.status(200).json(results);
    })
})

//관리자
//[POST] 헤더 설정 저장 API
app.post('/api/settings/header', (req, res) =>{
    //보내온 데이터를 각각의 변수로 꺼낸다
    const {logoType, logoText, logoImage, menus} = req.body;
    //DB에 실행할 쿼리문을 미리 문자열로 만들어 둔다
    const updateSettingsSql = `
    INSERT INTO header_settings (id, logo_type, logo_text, logo_image)
    VALUES (1, ?,?,?)
    ON DUPLICATE KEY UPDATE
    logo_type = VALUES(logo_type),
    logo_text = VALUES(logo_text),
    logo_image = VALUES(logo_image)
    `;

    //?자리에[LogoType, LogoText, LogoImage]순서대로 값을 넣어 쿼리를 실행
    db.query(updateSettingsSql, [logoType, logoText, logoImage], (err) =>{

        //퀴리 실행중에 에러가 발생 했다면
        if(err) {
            console.error('설정 저장 에러:', err);
            return res.status(500).json({message:'설정 저장중 오류가 발생'});
        }

        //2) 기존에 등록된 메뉴를 싹 비우고 새로 입력받은 메뉴들로 체웁니다
        db.query('DELETE FROM header_menus', (err) => {
            if(err) return res.status(500).json({message:'메뉴 갱신중 오류가 발생'});
            //menus배열이 존재하고 ,메뉴가 1개 이상 잇을때만 작업을 한다
            if(menus && menus.length > 0) {
                const menuValues = menus.map(m => [m.title, m.link]);

                const insertMenuSql = 'INSERT INTO header_menus (title, link) VALUES ?';

                db.query(insertMenuSql, [menuValues], (err) => {
                    if(err) {
                        console.error('메뉴 삽입 에러:', err);
                        return res.status(500).json({message:'메뉴 저장 중 오류가 발생했습니다'});
                    }
                    res.status(200).json({message:"헤더 설정이 성공적으로 저장되었습니다."});
                });
            }else{
                // 메뉴가 하나도 없는 경우: 삽입 없이 바로 성공 응답을 보낸다
                res.status(200).json({message:'헤더 설정이 성공적으로 저장 되었습니다'});
            }
        });
    });
});


//[get]헤더 설정 불러오기



//관리자 끝


//서버실행
app.listen(5000,()=>{
    console.log('Server running on port 5000');
})