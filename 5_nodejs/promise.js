const fs = require('fs').promises;

//아래에 3명을 동시에 실행, 결과 순서 보장, 하나라도 실패하면 즉시중단
const promise1 = Promise.resolve('First result');
const promise2 = new Promise((resolve) => setTimeout(() => resolve('second result'), 1000));
const promise3 = fs.readFile('myfile.txt', 'utf8');

Promise.all([promise1, promise2, promise3])
.then(results => {
    console.log('Results:', results);
}).catch(error => {
console.error('Error in one of the promises:', error);
});

/*
자바스크립트에서 비동기라는걸 처음에 사용할때는
callback함수는 콜백함수 지옥에 빠질수 잇다
그래서 다른 대안들이 나오기 시작

getUser(userId, (err, user) => {
    if(err) return handleErro(err);
    getOrder(user.id,(err, orders) =>{
        if
        })
    })

    그래서 나온 대안이 promise async/await
*/