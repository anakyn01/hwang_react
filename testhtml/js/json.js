async function loadData(){
/*async: 이함수안에서 시간이 걸리는 작업(데이터 통신 )을 수행할것임을 선언
이 키워드가 있어야 내부에서 await을 사용합니다
*/
const resultDiv = document.getElementById('result');
/*html문서에서 id='result'를 가진 요소를 찾아와 자바스크립트 객체로 가져옵니다
const 참조만 할뿐 값이 바뀌지 않게 고정
*/
try{//이 안에 있는 코드들중에 에러가 발생할 가능성이 있는 것들을 감싼다
//에러가 발생하면 바로 아래 catch구문으로 점프합니다
const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
/*
fetch() : 서버에 해당 주소의 데이터를 달라고 요청을 보낸다
await: 서버에서 응답이 올때 까지 여기서 잠시 기다려..
기다린후에 결과값이 오면 response변수에 담습니다
*/
const data = await response.json();
/*서버로 받은 응답은 날것의 상태..이를 자바스크립트가 바로 쓸수 있는
객체(JSON)로 바꾸는 과정..이과정도 시간이 걸리기에 await
*/
//html테그를 생성하여 화면에 출력
resultDiv.innerHTML = `
<div style="border: 1px solid #ccc; padding:15px; border-radius:8px;">
<h3>ID:${data.id}</h3>
<h2 style="color:blue;">제목: ${data.title}</h2>
<p>내용 : ${data.body}</p>
</div>
`;

} catch(error){
resultDiv.innerHTML ="데이터를 불러오는데 실패 했습니다";
console.error("에러",error);
}


}

loadData();//호출하여 실행