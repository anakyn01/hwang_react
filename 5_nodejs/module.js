const http = require('http'); //req, res
const https = require('https'); //SSL / TLS
const fs = require('fs'); //create read
const path = require('path');//파일이나 폴더의 경로
const os= require('os');//운영체제의 cpu memory
const url= require('url');//url을 분석하고 쪼개거나 합치는것
const EventEmitter= require('events');
//사용자 정의 이벤트를 만들고 감지(listen)하기 위해서
const {Transform}= require('stream');//데이터를 조각내어 흐름대로 처리하기 위해
const {Buffer}= require('buffer');
//컴퓨터가 이해하는 이진(Binary)데이터를 다루기 위해서
const crypto = require('crypto');
/*암호화 (Encryption): 평문(데이터) → 암호문 (보호 및 보안)
복호화 (Decryption): 암호문 → 평문 (원상복구 및 열람)
*/
const timers = require('timers');
// 일정 시간 뒤에 실행하거나 반복 실행하게 해주는 타이머 모듈
const dns = require('dns');
//도메인 주소를 IP 주소로 변환(또는 역변환)해 주는 모듈
const assert = require('assert');
//도메인 주소를 IP 주소로 변환(또는 역변환)해 주는 모듈
const util= require('util');
// 문자열 포맷팅이나 디버깅 등 개발에 편리한 유틸리티 기능 모음
const readline = require('readline');
//터미널(콘솔) 화면에서 사용자가 키보드로 입력한 값을 읽어오는 모듈

// [Events] 커스텀 이벤트 관리자 생성
class ServerEmitter extends EventEmitter{}
// 기본 EventEmitter를 상속받아 우리만의 이벤트 클래스 생성
const serverEvents = new ServerEmitter();

// [Path] & [FS] 로그 파일 경로 설정 및 스트림 준비
const logDir = path.join(__dirname,'logs');
//현재 파일이 있는 경로(__dirname)에 'logs'라는 
// 폴더 경로를 안전하게 합침
if (!fs.existsSync(logDir)){
// 만약 해당 경로에 'logs' 폴더가 존재하지 않는다면
fs.mkdirSync(logDir);
// 동기식(실행이 끝날 때까지 멈춤)으로 'logs' 폴더를 새로 생성함
}
const logFilePath = path.join(logDir, 'server.log');
// 'logs' 폴더 안에 'server.log'라는 파일의 최종 경로를 생성

// [Stream] 데이터를 대문자로 변환하는 커스텀 트랜스폼 스트림
const upperCaseStream = new Transform({
    // 데이터 조각(chunk)이 들어올 때마다 실행되는 함수
    transform(chunk, encoding, callback){
this.push(chunk.toString().toUpperCase());
// 들어온 데이터를 문자열로 바꾸고 대문자로 변환해서 다음으로 넘김
callback(); // 현재 조각의 처리가 끝났음을 시스템에 알림
    }
});

// 'server.log' 파일에 데이터를 이어쓰기
// ('a': append) 모드로 기록할 준비를 함
const logWriteStream = 
fs.createWriteStream(logFilePath,{flag:'a'});

/* 파이프라인 연결: 입력 -> 대문자 변환 -> 파일 쓰기
upperCaseStream에 데이터가 들어오면 자동으로 
logWriteStream(파일)으로 흘러가도록 파이프(pipe) 연결*/

// 로깅 유틸리티 함수 (터미널과 파일에 동시에 로그를 남기는 함수)
function logMessage(msg){
// [Util] 현재 시간(ISO 형식)과 메시지를 
// '[시간] 메시지' 형태의 문자열로 깔끔하게 포맷팅
const formattedMsg = util.format('[%s] %s\n', 
    new Date().toISOString(), msg);
    upperCaseStream.write(formattedMsg);   
    // 포맷팅된 문자열을 대문자 변환 스트림으로 보냄 (결국 파일에 저장됨)
    console.log(formattedMsg.trim());
    // 터미널 화면에도 출력함 (trim으로 끝에 불필요한 줄바꿈 제거)
}

// [HTTP] 웹 서버 생성
const server = http.createServer((req, res) => {
    // 클라이언트가 접속할 때마다 실행되는 콜백 함수
const parsedUrl = url.parse(req.url, true);
// [URL] 클라이언트가 요청한 웹 주소(req.url)를 
// 파싱하여 보기 쉽게 객체 형태로 만듦

/* [Crypto] 요청을 구분하기 위해 무작위 8바이트 데이터를 
생성하고 이를 16진수 문자열로 바꿈 (Trace ID 생성)*/
const traceId = crypto.randomBytes(8).toString('hex');

/*[Assert] 방금 만든 Trace ID가 정확히 16글자인지 검사함. 
만약 아니면 'Trace ID 생성 오류'를 내고 서버 중단 */
assert.strictEqual(traceId.length, 16, 'Trace ID 생성 오류');

// 요청받은 경로(pathname)와 생성된 Trace ID를 로그로 남김
logMessage(`요청수신:${parsedUrl.pathname} (TraceId: ${traceId})`);

// 만약 사용자가 메인 페이지('/')로 접속했다면
if(parsedUrl.pathname === '/'){
//[Buffer] 화면에 보여줄 한글/영문 메시지를 메모리(Buffer)에 이진 데이터로 담음
const responseData = 
Buffer.from(`환영합니다! 시스템 상태 모니터 서버입니다. (TraceID: ${traceId})`);

// 클라이언트에게 "요청 성공(200)이며, 
// 응답 데이터는 일반 텍스트(UTF-8)"라고 헤더를 보냄
res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
res.end(responseData);
// 준비해둔 버퍼 데이터를 전송하고 응답을 마무리함

// [Events] 응답을 성공적으로 마쳤다는 'requestHandled' 이벤트를 
// 발생시키고 traceId를 함께 넘김
serverEvents.emit('requestHandled', traceId);
} 
// 만약 사용자가 상태 확인 페이지('/health')로 접속했다면
else if (parsedUrl.pathname === '/health') {
// [OS] 컴퓨터의 현재 남은 메모리 용량을 바이트에서 메가바이트(MB) 단위로 계산함
const freeMem = os.freemem() / (1024 * 1024);
// 클라이언트에게 "요청 성공(200)이며, 응답 데이터는 JSON 형식"이라고 헤더를 보냄
res.writeHead(200, {'Content-type':'application/json'});
// 남은 메모리 등의 정보를 JSON 문자열로 변환하여 전송하고 응답을 마무리함
res.end(JSON.stringify({
status:'ok', freeMemoryMB:Math.round(freeMem),
platfrom:os.platform()
}));

}else{
    res.writeHead(404);
    res.end('not found');
}


});

//이벤트 리스너 등록 (앞서 발생시킨 'requestHandled' 이벤트를 기다림)
serverEvents.on('requestHandled', (id) => {
    timers.setTimeout(() => {
        logMessage(`TraceId[${id}] 처리가 완료 되었습니다`);
    }, 2000);
})

// [Readline] CLI 환경 구성 (터미널에서 사용자와 대화할 수 있는 인터페이스 생성)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('---- node.js통합서버설정 ----');

//[DNS] 현재 내 컴퓨터의 
// 호스트 이름(os.hostname())을 통해 실제 IP 주소를 조회함
dns.lookup(os.hostname(), (err, address) => {
    if (err) throw err;
    console.log(`서버 호스트 ip확인 완료 : ${address}`);

    // 터미널에서 사용자에게 질문을 던지고,
rl.question('서버포트를 3000에서 시작 하시겠습니까? (y/n)',(answer) =>{
// 입력을 기다림 (입력값은 answer 변수에 담김)
    if (answer.toLowerCase() === 'y') {
        server.listen(3000, () => {
            logMessage('서버가 3000번 포트에서 시작 되었습니다');

            https.get('https://nodejs.org',(res) =>{
logMessage(`외부 인터넷 연결 확인 완료(상태코드:${res.statusCode})`);
            }).on('error', (e) =>{
logMessage(`외부 인터넷 연결 실패(상태코드:${e.message})`);
            });
        });
    }else{
        console.log('서버 시작을 취소합니다');
        process.exit(0); //프로그램 종료
    }
    rl.close();//입력받는 리드라인을 닫아줌
}) 

})



/*
HTTP(http) : HTTP 서버 및 클라이언트를 생성
요청(Request)을 받아 응답(Response)을 처리
HTTPS(https) : SSL/TLS로 암호화된 안전한 HTTP 통신을 지원
File(fs) : 파일 시스템과 상호작용합니다
Path(path) :파일 읽기, 쓰기, 삭제, 디렉토리 생성 등을 
동기(Sync) 또는 비동기 방식(Promise, Callback)으로 
처리할 수 있습니다
OS(os) : 현재 실행 중인 운영체제의 정보(CPU 코어 수, 
메모리 용량, 네트워크 인터페이스 등)를 가져옵니다.
URL(url) : URL 문자열을 파싱(Parsing)하여 호스트명, 
쿼리 스트링, 경로 등의 구성 요소로 분리하거나, 
반대로 구성 요소를 조합하여 URL을 생성
Events(events) : 이벤트 주도 아키텍처
(Event-Driven Architecture)의 핵심입니다. 
사용자 정의 이벤트를 발생(emit)시키고, 
이를 감지하여 특정 콜백 함수를 실행(on)할 수 있습니다.
Stream(stream) : 대용량 데이터를 작게 쪼개어 연속적으로 
처리할 수 있게 해줍니다. 메모리 효율성을 극대화하며, 
동영상 스트리밍이나 대용량 파일 처리에 주로 사용됩니다.
Buffer(buffer) : 이진 데이터(Binary Data)를 다루기 
위한 모듈입니다. V8 엔진의 메모리 외부 공간에 원시 데이터를 
저장하며, 주로 파일이나 네트워크 통신에서 데이터를 주고받을 때 
사용됩니다.
Crypto(crypto) :해시(Hash), 암호화(Encryption), 복호화, 
전자 서명 등 강력한 암호화 기능을 제공합니다
Timers(timers) : 특정 시간 이후에 콜백 함수를 
실행하거나(setTimeout), 일정한 주기마다 
반복 실행(setInterval)하는 
타이머 기능을 제공
DNS(dns) : 도메인 이름 시스템(DNS) 조회 기능을 제공
Assert(assert) : 유닛 테스트(Unit Test)를 위한 모듈로, 
특정 조건이 참(True)인지 검증합니다
Util(util) : 디버깅, 포맷팅, 구형 콜백 API를 프로미스(Promise)로 변환
Readline(read) : process.stdin과 같은 Readable 스트림에서 데이터를 
한 번에 한 줄씩 읽어오는 인터페이스를 제공
*/