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

app.get('/api/posts', (req, res) => {
    //클라이언트에서 page파라미터를 안보내면 1페이지로 간주 ?page=2
    const page = parseInt(req.query.page) || 1;
    const limit = 5;//한페이지당 5개씩 출력
    const offset = (page - 1) * limit;
    /*데이터를 가져올때 몇개를 건너뛰고 가져올지를 계산
    1 => 0 
    2페이지면 5개를 건너뛰고
    */

    //전체 게시물수 구하기
    const countSql = 'SELECT COUNT(*) AS total FROM posts';
    db.query(countSql, (err, countResult) => {
        if (err) return res.status(500).send(err);
//DB에서 알려준 전체 게시물 개수를 변수에 담습니다.
        const total = countResult[0].total;
//전체 게시물을 5로 나누고 올림 처리해서 '총 몇 페이지'가 필요한지 구합니다. 
// (예: 11개면 3페이지 필요)
        const totalPages = Math.ceil(total / limit);

        //해당 페이지의 게시물만 가져오기
const sql = 'SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?';
//LIMIT ? OFFSET ?: ? 자리에 우리가 계산한 limit(5)와 offset을 넣어서 잘라옵니다.
        db.query(sql, [limit, offset], (err, result) => {
            if (err) return res.status(500).send(err);
//결과 데이터(게시물들)와 
// 페이징 정보(총 페이지, 현재 페이지)를 하나로 묶어서 프론트엔드로 보냅니다.
            res.json({posts:result, totalPages, currentPage:page});
        })
    })
})

/*게시글 리스트 불러오기(GET) 페이징을 하지 않을때
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
});*/

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

//add put 수정페이지
app.get('/api/posts/:id',(req, res) => {
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result[0]);
    })
})
//add put 수정페이지 2
app.put('/api/posts/:id',(req, res) => {
const {title, content, author} = req.body;
const sql = 'UPDATE posts SET title =?, content=?, author=? WHERE id=?';
db.query(sql, [title, content, author, req.params.id], (err, result) =>{
    if (err) return res.status(500).send(err);
    res.send('Post updated');
})
})

//delete
app.delete('/api/posts/:id', (req, res) => {
    const sql = 'DELETE FROM posts WHERE id=?';
    db.query(sql, [req.params.id], (err, result) => {
        if(err) return res.status(500).send(err);
        res.send('Post deleted');
    })
})

app.listen(5000, () => {
    console.log('Server running on port 5000');
})

//rest api get,post,put, delete
