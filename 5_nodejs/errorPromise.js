const fs = require('fs').promises;
//콜백 지옥 없이 
//async/await 문법을 사용할 수 있습니다.
async function loadUserData(userId){
    //함수 앞에 async키워드를 붙여 비동기 함수로 선언
    try{
const data = await fs.readFile(`users/${userId}.json`, 'utf8');
const user = JSON.parse(data);
// 읽어온 텍스트 데이터(data)를 자바스크립트 객체로 변환합니다.
if(!user.email){
//파싱된 사용자 객체에 'email'데이터가 누락되었는지 검사
throw new Error('Invalid user data:missing email')
}
return user;
//모든 과정과 검사를 에러 없이 통과했다면, 
// 최종적으로 완성된 사용자 객체를 반환합니다.
    }catch(error){
if(error.code === 'ENOENT'){
    throw new Error(`User ${userId} not found`);
}else if (error instanceof SyntaxError){
    throw new Error('Invalid user data format');
}
throw error;

    }finally{
        //성공또는 실패가 끝난후 무조건 마지막에 한번 실행
console.log(`Finished processing user ${userId}`);

    }
}

(async () => {
    try{
const user = await loadUserData(123);
//위에서 만든 비동기 함수를 호출하고 결가를 받아올때까지 기다립니다
console.log('user loaded:', user);
    }catch(error){
console.error('Failed to load user:', error.message);
    }
})();