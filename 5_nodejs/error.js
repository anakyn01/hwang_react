const fs = require('fs')
//파일 읽기/쓰기

function readConfigFile(filename, callback){

    fs.readFile(filename, 'utf-8', (err, data) =>{
        //fs.readFile을 사용해 파일을 비동기적으로 읽습니다
        if (err) {//파일을 읽는 과정에서 물리적인 에러가 발생하는지 확인
            //Error NO ENTRY
            if (err.code === 'ENOENT'){
 return callback(new Error(`Config file ${filename} not found`));
 //파일이 없다는 알기 쉬운 에러 객체를 새로 만들어 콜백함수의 첫번떄 인자(에러자리)로 넘겨주고 종료합니다
            }else if(err.code === 'EACCES'){
 // 에러 코드가 'EACCES'(Error ACCESs) 즉, 파일에 접근할 권한이 없는 경우인지 확인합니다.               
return callback(new Error(`No permission to read ${filename}`));
// 권한이 없다는 에러 객체를 만들어 콜백 함수로 넘겨주고 종료합니다.
}
return callback(err);
// 위에서 지정한 에러 외의 다른 모든 에러는 발생한 원본 에러(err)를 그대로 콜백 함수에 넘겨줍니다.
    }
    try{
// 파일은 성공적으로 읽었지만, 
// JSON 변환 중 에러가 날 수 있으므로 try-catch 문을 사용합니다.
const config = JSON.parse(data);
// 읽어온 일반 텍스트 데이터(data)를 자바스크립트에서 쓸 수 있는 객체 형태(JSON)로 변환합니다.
callback(null, config);
// 변환에 성공했다면, 에러가 없다는 의미로 첫 번째 인자에 null을 넣고, 
// 두 번째 인자에 변환된 객체(config)를 넣어 콜백을 실행합니다.    
}catch(parseError){
// JSON.parse() 과정에서 에러가 발생했다면 
// (예: 파일 내용이 올바른 JSON 형식이 아닐 때) 이 블록이 실행됩니다.
callback(new Error(`Invalid JSON in ${filename}`));
// JSON 형식이 잘못되었다는 에러 객체를 만들어 콜백 함수로 넘겨줍니다.
// (try-catch 안에서는 return을 쓰지 않아도 함수 마지막이라 자연스럽게 종료됩니다)
    }
});
}

readConfigFile('config.json', (err, config) => {
    // 위에서 만든 함수를 호출합니다. 
    // 파일명은 'config.json'이고, 작업이 끝나면 실행될 콜백 함수를 화살표 함수로 정의하여 넘겨줍니다.
if(err) {
//콜백 함수의 첫 번째 인자인 err에 값이 있다면 
// (즉, 에러가 발생해서 넘어왔다면)
console.error('Failed to read config:', err.message);
//콘솔에 에러 메세지를 빨간 글씨로 출력
return;//에러가 발생했으므로 성공 로그르 띄우지 않고 실행을 멈춤

}
console.log('Config loaded successfully', config);
//// 에러가 null이라면(성공했다면) 성공 메시지와 
// 함께 파싱된 설정값(config)을 콘솔에 출력합니다.
})