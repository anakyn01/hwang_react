//1) '',""
let str = `He's often called "Johnny"`;
document.getElementById("good").innerHTML = str;

//2)\ 이런걸 문자라고 합니다
let die = "We are the so-called \"Vikings\" from the north";
document.getElementById("demo").innerHTML = die;

//3) 보간법
let firstName = "영일";
let lastName = "황";

let name = `Welcome 여러분 전 ${firstName}, ${lastName}!`;

document.getElementById('name').innerHTML = name;

//계산도 가능
let price = 10;//정수
let VAT = 0.25;//실수
let total  = `Total: ${(price * (1 + VAT)).toFixed(2)}`

document.getElementById('total').innerHTML = total;

//현업개발..
let header = "Template Strings";
let tags = ["tss","javascript","es6"]

let html = `<h2>${header}</h2><ul>`;

for (const x of tags) {
    html += `<li>${x}</li>`;
}

html += `</ul>`;
document.getElementById("ul").innerHTML = html;

//indexOf
let str = "please locate where 'locate' occurs!"
//0123456
let index = str.indexOf("locate");
document.getElementById('find').innerHTML = index;