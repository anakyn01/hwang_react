console.log('1.Start');

//2) Next tick queue
process.nextTick(() => console.log('2.Next tick'));

//3) Microtask queue(Promise)
Promise.resolve().then(() => console.log('3.Promise'));

//4)Timer phase
setTimeout(() => console.log('4. Timeout'), 0);

//5)Check phase
setImmediate(() => console.log('5. Immediate'));

console.log('6.end')

/*
nojs에 이벤트 루프와 비동기 작업들의 실행우선순위
1) 메인스크립트 (동기코드[Synchronous]) 실행
가장 먼저 Call Stack들어온 동기 코드들이 실행됩니다
먼저 1번 실행 중간에 비동기 함수들 당장은 실행되지 않고
각자의 대기열 Queue로 보내진다
그리고 6번이 출력됩니다


2) nextTick 큐처리 동기 실행이 모두 끝나면(콜 스택이 비워지면)
이벤트 루프가 시작되기 전에 가장 먼저 nextTick Queue를 확인합니다
2번 출력

3) 마이크로태스크 큐 처리
nextTick큐가 비워지면 다음으로 Nicrotask Queue를 확인

4) 타이머 단계
마이크로태스크 큐까지 모두 비워지면 본격적인 이벤트 루프의 페이즈에 진입합니다

5)타이머 단계 이후 몇가지 중간단계 (Pending I/O, Poll등을 )거친후
체크 단계에 도달합니다
setImmediate는 항상 이 Check단계에서 실행되도록 설계
*/