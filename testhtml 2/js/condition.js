//1) if else if else
//시간 객체에서 시간을 불러옴
const time = new Date().getHours();

//인사말 선언만;
let greeting;

if(time < 10) {
    greeting = '굿모닝';
}else if (time < 20) {
    greeting = '오늘은 좋은날';
}else{
    greeting = '좋은 저녁';
}

document.getElementById('h').innerHTML = greeting;

//2)스위치..
let day;//변수day는 선언만

let date = new Date().getDay();
//변수 데이트에 시간객체에 속한 데이를 대입

switch (date) {//스위치예약어 (매개변수)
case 0:
    day = "일요일";
    break;
case 1:
    day = "월요일";
    break;
case 2:
    day = "화요일";
    break;
case 3:
    day = "수요일";
    break;
case 4:
    day = "목요일";
    break;
case 5:
    day = "금요일";
    break;
default:
    day = "토요일";
    break;
}
document.getElementById('whatday').innerHTML = " 오늘은 " + day + " 입니다"

//3)삼항연산자
let age = 49;
let text = (age < 18) ? "Minor" : "Adult";//true false
document.getElementById("age").innerHTML = text;

//4)true false
let x = 5;
document.getElementById("t1").innerHTML= (x == 8);
document.getElementById("t2").innerHTML= (x != 8);
document.getElementById("t3").innerHTML= (x != 5);
document.getElementById("t4").innerHTML= (x >= 4);
document.getElementById("t5").innerHTML= (x <= 4);

//5)논리연산자
let q = 6; let w = 3;
document.getElementById("n1").innerHTML =
(q < 10 && w > 1) + "<br>" +
(q < 10 && w < 1) + "<br>" +
(q < 3 || w < 1) + "<br>" +
!(q == w)

//6) 복습용 예제
function checkGrade(){

const score = document.getElementById('scoreInput').value;
const resultDiv = document.getElementById('result');

//6-1)js boolean & logical
const isValid = score >= 0 && score <= 100;
//점수가 0 ~100 사이인가?

//6-2)논리 부정 연산자 사용
if(!isValid){
    resultDiv.textContent = "0 ~ 100점 사이를 입력하세요";
    return;
    //반환 이 함수의 실행을 여기서 종료하고 원래 호출한 곳으로 돌아가라
}

//6-3) js if / else if
let grade;
if(score >= 90) grade = "A";
else if(score >= 80) grade = "B";
else if(score >= 70) grade = "C";
else grade = "F";

//6-4) js Ternary 
const status = (score >= 60) ? "합격":"불합격";

//6-5) js switch
let message;
switch(grade){
    case "A":message = "최우수학생입니다"; break;
    case "B":message = "잘했습니다"; break;
    case "C":message = "조금 더 노력하세요"; break;
    default:message ="재시험이 필요합니다"
}

//
resultDiv.innerHTML = `등급: ${grade} <br> 결과: ${status} <br>
메시지: ${message}`;

}

