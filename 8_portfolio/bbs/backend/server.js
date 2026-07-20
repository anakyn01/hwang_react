//외부 라이브러리 모듈을 불러옵니다
const express = require('express');
//웹서버를 만드릭 위한 프레임쿼크인 express를 가져옵니다
const mysql = require('mysql2');
//MySQL데이터베이스와 통신하기 위한 도구를 가져옵니다
const cors = require('cors');
//다른 도메인 주소에서 이서버에 접속할수 있게 허용해 주는 보안

const app = express();
//express실행 객체를 생성하여 app변수에 담습니다(서버의 본체)
app.use(cors());//모든 곳에서 이 서버로의 접속을 허용하도록 설정
app.use(express.json());
//클라이언트가 보낸 JSON형식의 데이터를 서버가 읽을수 있게 변환해 주는 설정 

//글을 쓸때 아이디 패스워드 키
const db = mysql.createConnection({
    host:'localhost',
    //현재는 컴퓨터 로컬에서 사용하기에..로컬호스트지만 aws를 사용할때는 엔드포인트 사용
 user:'root', //musql사용자명 기본
 password:'1234',
 database:'board_db'
});

//실제 데이터베이스 접속을 시도
db.connect((err) => {
    if(err) throw err;
    //만약 접속중에 에러가 발생하면 에러 내용을 출력하고 멈춤
    console.log('MySQL Connected!');
    //접속에 성공하면 콘솔창에 성공 메세지를 뛰웁니다
});

//게시글 리스트 불러오기(GET)
//사용자가 서버주소 /api/posts로 요청하면 실행
app.get('/api/posts', (req, res) => {
//데이터베이스에서 모든 게시글 정보를 가져와서 생성시간(created_at) 역순으로 정렬하는 sql문장
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    //데이터베이스에 위 sql문장을 실행해 달라고 요청
    db.query(sql, (err, result) => {
        //만약 데이터를 가져오다가 에러가 나면 500에러 코드를 보냅니다
        if (err) res.status(500).send(err);
        //에러가 없다면 가져온 게시글 데이터를 사용자에게 전송
        res.send(result);
    })
});

//게시글 작성(post)
//사용자가 게시글 정보를 담아 서버주소 /api/posts 로 보내면 실행
app.post('/api/posts', (req, res) => {
    //사용자가 보낸 데이터에서 제목,내용,작성자 정보를 꺼내옵니다
    const {title, content, author} = req.body;
    //데이터베이스에서 새로운 게시글을 입력하는 sql문장 '?'자리에 실제 데이터가 들어갑니다
    const sql = 'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)';
    //데이터베이스에 실제 데이터들을 담아 sql문장을 실행
    db.query(sql, [title, content, author], (err, result) =>{
        if(err) res.status(500).send(err);//입력중에 에러가 발생하면 에러메세지를 보냄
        res.send('Post added...');
        //성공적으로 저장되면 Post added라는 문구를 응답으로 보냄
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
})