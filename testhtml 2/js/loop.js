
const cars = ['BMW','Volvo','Saab',"Ford","Fiat","Audi"]
//단일 솔루션에 여러변수값을 사용하고자 할때배열 array
//배열은 색인(index) [0,1,2,3,4,5]
let text = "";
text += cars[0] + "<br>";
text += cars[1] + "<br>";
text += cars[2] + "<br>";
text += cars[3] + "<br>";
text += cars[4] + "<br>";
text += cars[5] + "<br>";
document.getElementById('bad').innerHTML = text;

//올바른 예
let car = "";
for (let i=0; i < cars.length; i++){
    car += cars[i] + '<br>';
  /*
  let i=0; 색인시작
  i < cars.length 5 < 6 색인에 끝
  i++ 0~5까지 각각 개별 증가 
  for문을 사용하면 지정한 범위까지 반복합니다
  */  
}
document.getElementById('good').innerHTML = car;

//while loop
let nums = "";
let n = 0;

while (n < 10) { //10보다 작을때 까지

    nums += "출력되는 숫자는 " + n + "<br/>";
    n++;//주의 사항 증가를 선언하지 않으면..무한루프에 빠진다
}

document.getElementById("while").innerHTML = nums;

//do while loop
let num = "";
let m = 0;

 do { //10보다 작을때 까지
    num += "출력되는 숫자는 " + m + "<br/>";
    m++;//주의 사항 증가를 선언하지 않으면..무한루프에 빠진다
}while (m < 10)

document.getElementById("do").innerHTML = num;

//break
let stop = "";

for (let z = 0; z < 10; z++) {
if (z === 3){break;}//해당사항에서 중지하기 때문에 0,1,2
stop += "the number is " + z + "<br/>"
}
document.getElementById("stop").innerHTML = stop;

//continue
let multi = "";
for (let c = 1; c < 10; c++) {
    if (c === 3) {continue;}
    multi += c*10 + "<br>";
}

document.getElementById('continue').innerHTML = multi;



