const fs = require('fs').promises;
//nodejs기본 내장모듈 파일시스템 불러옴
async function readFile(){//비동기 작업을 다룰 함수선언
    //안전한 실행을 위해 try catch
    try{
const data = await fs.readFile('myfile.txt','utf8');
/*
await : 파일을 읽어 올때까지 이줄에서 잠시 기다려라
다 읽어오면 그결과를 데이터변수에 저장합니다

*/
console.log(data);
//파일을 성공적으로 다 읽으면 그내용을 콘솔에 출력

    }catch(error){
        //만약 try블록에 문제가 발생하면 에러내용을 콘솔에 출력
console.error('Error reading file', error);
    }

}

//위에서 만든 함수를 실제로 실행 호출합니다
readFile();



/*
비동기 코드가 동기 코드처럼 느껴지게 합니다
비동기 작업을 처리하는 최신방식
es6 2015년
es2017에서 표준화됨
async : Promise를 반환하는 비동기 함수를 선언하는데 사용
await : Promise가 해결될때 까지 실행을 일시 중지 한는데 사용
비동기 함수 내에서만 사용할수 있습니다
*/