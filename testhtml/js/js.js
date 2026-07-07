//2026 0616 연산자
//+=, -=
let q = 10; //변수 q는 10을 대입
q += 5;
document.getElementById("o1").innerHTML = q;

let w = 15;
w -= 5
document.getElementById("o2").innerHTML = w;

let e = 15; //const상수는 참조만 할뿐 가공하지 못함 3.14 ,cm,mm,1.5리터
e *= 2
document.getElementById("o3").innerHTML = e;

let r = 12;
r /= 6
document.getElementById("o4").innerHTML = r;

let t = 13;
t %= 6
document.getElementById("o5").innerHTML = t;

let u = 5;
u **= 2
document.getElementById("o6").innerHTML = u;

let i = 5;
i++;
let o = i;
document.getElementById("o7").innerHTML = o;

let p = 5;
p--;
let a = p;
document.getElementById("o8").innerHTML = a;

//2026 0615 
let x = 5; let y =6;
let z = x + y;

document.getElementById("syntax").innerHTML=z;
//스크립트에서는 세미콜론이 안찍어도 문제가 발생되지 않지만
//그런데 자바는 무조건 마감할때 세미콜론을 사용해야됨



//경고창
//alert("자바스크립트 세계에 오신걸 환영합니다")
//1)스크립트로 문자열(스트링) 집어 넣기
document.getElementById("inner").innerHTML = '나의 첫번째 자바스크립트'
//도큐먼트는 요소들중에 #inner를 찾아서 문자열을 넣는다

//2)추후 배울 함수를 테스트 function 함수의 간략정의 함수는 호출할때만 실행됨
//함수는 두종류 function  = () => 리액트에서 모듈을 만들때 쓰던 함수가 화살표 함수
//함수를 호출할때..함수명()
function myString(){//함수 함수명()
document.getElementById("demo").innerHTML='함수는 호출할때만 실행되는 코드블럭'
}
//3) 버튼을 클릭시 유튜브로 이동
function getUrl(){
window.location.href = 'https://www.youtube.com'
}

//4)아이디로 찾지 않고 도큐먼트에 집어넣기 단점 어디에서 튀어 나올지 모름
//document.write(5+6) 정석되로 사용하는 것이 좋다

//es6(ECMAScript 2015)자바스크립트의 표준 규격인 6번째 버전
//가장 큰 변화와 혁신을 가져온 업데이트
//5)let과 const 옛날자바스크립트는..
var str = "많은수여서 변수 변하는 수여서 변수";
//변수는 var 그뒤에 나오는 것이 변수명..
str = "맘대로 바꿈 이렇게 되면 심각한 프로그래밍에 혼란을 일으킴"

document.getElementById("var").innerHTML = str

//6번 이리하여 let과 const가 등장 재선언 재할당
let str1 = '나나나' 
//str1 ="yyyyy" 재할당 금지 변수에 값을 넣고 다시 그 변수값을 변경할수 없다
//let str1 = 'ㄹㄹㄹ' 재선언 금지 동일한 변수명 사용할수 없다

//7번 더 간단하게 화살표함수(Arrow Function) 등장
var add1 = function (a, b){
    return a + b;
    //함수는 리턴을 실행하고 종료
}
add1(7, 6)

//화살표 함수 간결하고 직관적인 변화
const add = (a, b) => a + b;
//8)`백틱스를 사용하여 문자열 안에 변수나 식을 쉽게 사용

const name = "Gemini";
console.log(`hello ${name}`);

//9 class에 등장 다른 객체지향언어 Java, C++에서 사용하는 클래스 개념이 도입
//Prototype기반의 상속을 더 명확하게 직관적인 문법으로 사용함

//10 코드를 여러파일로 나누고 필요한 부분만 불러와서 사용할수 있는기능
//import와 export키워드를 사용

//비 동기(일이 순차적으로 하나가 해결되어야 해결됨)를 좀더 발전시킴
//이걸 프로미스 객체로 발전 시켰다  
