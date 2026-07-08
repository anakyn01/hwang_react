//초기설정
const express = require('express');
//require('express'): 
// 프로젝트에 설치된 Express 모듈을 불러옵니다.
const app = express();
//이 app 객체를 통해 서버의 길 안내(라우팅) 및 
// 각종 설정을 제어하게 됩니다.
const port = 8080;
//포트는 서버로 들어오는 통로 번호라고 생각하시면 됩니다.

/*2 기본 라우팅 (경로설정)
app.get(...) 클라이언트(웹 브라우저)가 
특정 주소로 GET 요청을 보냈을 때 서버가 어떻게 응답할지 정의합니다.
/ 웹사이트의 가장 기본 주소(루트 경로)를 의미합니다.
http://localhost:8080   a href="/"
(req, res) : 콜백 함수로, 사용자가 접속했을 때 실행됩니다.
req(Request) : 사용자의 요청 정보가 담겨 있습니다
res(Response) : 서버가 사용자에게 응답할 때 사용하는 객체입니다.
*/
app.get('/', (req, res) => {
res.send('Home Page');
//브라우저 화면에 'Home Page'라는 텍스트를 띄워줍니다.
});

app.get('/about', (req, res) =>{
res.send('About Page');
});

app.get('/contact', (req, res) =>{
res.send('Contact Page');
});



//여기까지가 라우팅


//아래는 라우팅 응답하는 와꾸 html을 그림
app.get('/html', (req, res) => {
res.send(`
    <html>
    <head>
    <title>Express Routing</title>
    <style>
body{font-family:Arial, sans-serif; margin:40px;}
h1{color:#0066cc;} p{margin-bottom:20px;}
    </style>
    </head>
    <body>
    <h1>HTML Response from Express</h1>
    <p>this response was sent using Express routing.</p>
    <nav>
    <a href="/">home</a> | 
    <a href="/about">about</a> | 
    <a href="/contact">contact</a>
    </nav>
    </body>
    </html>
    `);
});

//404에러
app.use((req, res) =>{
res.status(404).send('404 - Page not found');
});

//서버실행
app.listen(port, () => {
console.log(`app listening at http://localhost:${port}`)
});

/*
가장 인기있고 단순성과 유연성으로 유명
npm install express
app.get() 
app.post()
app.put()
app.delete()
app.all() 모든 http메서드를 처리함
*/