//1)세트 만들기 일반적인 방법 미리생성되어 있는것
const letters = new Set(["a","b","c","a"])

//2) 비어진 값에 새로 추가
const Null = new Set();
Null.add(1);
Null.add(2);
Null.add(3);

let txt1 = "";
let txt2 = "";

//각각 출력을 위해 for문 활용
for (const q of letters) {
    txt1 += q;
}

for (const w of Null) {
    txt2 += w;
}

document.getElementById('set').innerHTML =
letters.size + " 개 입니다 " + "<br>" +
Null.size + " 개 입니다 " + "<br>" +
txt1 + "<br/>" +
txt2;