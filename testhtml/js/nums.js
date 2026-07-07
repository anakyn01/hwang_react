let x = 10; let y="20"; let z = x + y;
document.getElementById("n1").innerHTML = z;

//nan
let nan = NaN;
document.getElementById('nan').innerHTML =
100 / "Apple" + "<br/>" +
" but 드 이건 허용" +
100 / "10" + "<br/>" +
typeof nan;


//infinity
let myNumber = 2;
let txt = "";
while(myNumber != Infinity) {//무한수 까지 증가
    myNumber = myNumber * myNumber;
    txt = txt + myNumber + "<br>";
}
document.getElementById("inf").innerHTML = txt;

let q = 0xFF;
document.getElementById('six').innerHTML = "0xFF = " + q;

let qq = 123e5;//12300000
let ww = 123e-5; //0.00123
document.getElementById("e").innerHTML = qq + "<br>" + ww;

let five = 999999999999999; //15자리
let six =  9999999999999999;
document.getElementById("int").innerHTML =
"Accurate: " + five + "<br>Inaccurate" + six;

//소수점 연산
let floatPlus = 0.2 + 0.1;
document.getElementById('bad').innerHTML =
"0.2 + 0.1 = " + floatPlus + " What ?"

//소수점 연산을 정확히 하려면..
let good = (0.2 * 10 + 0.1 * 10) / 10;
document.getElementById('good').innerHTML =
"0.2 + 0.1 = " + good

let p1 = Number.MAX_SAFE_INTEGER;
let p2 = Number.MIN_SAFE_INTEGER;

document.getElementById('print').innerHTML = 
p1 + "<br>" + p2;

//bigint
let bigInt = 12345678901112131415n;
let other = BigInt("12345678901112131415");
document.getElementById('show').innerHTML =
bigInt + "<br>" + other;

