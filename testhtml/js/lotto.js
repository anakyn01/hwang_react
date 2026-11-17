function generateLotto(){
    const fixedInput = document.getElementById('fixedNumbers').value;
    //사용자가 입력창에 적은 고정으로 뽑고 싶은 번호들을 가져온다
    const count = parseInt(document.getElementById('combCount').value);
    //사용자가 선택한 몇개임을 생성하지 에 대한 숫자를 가져옵니다
    //parseInt는 문자를 숫자로 바꿔주는 도구
    const resultDiv = document.getElementById('result');
//결과를 화면에 보여줄 html공간을 찾아내서  resultDiv이름으로 준비   

//2단계 데이터가공 
const fixed = fixedInput ? fixedInput.split(',').map(n => parseInt(n.trim())) : [];
/*쪼갠 각각의 글자 앞뒤의 공백을(trim()) 없애고 숫자로 바꾼다(parseint)
값이 없으면 빈 배열[]
*/
//로또 생성 루프시작
    let html = "<h3>생성된 번호</h3>";

    for(let i=0; i < count; i++){//지정된 범위까지 반복

        let numbers = new Set(fixed);
        //중복되지 않는 고정수가 주머니를 만듬

        while(numbers.size < 6){//번호가 6개 될때까지..
let num = Math.floor(Math.random() * 45) + 1;
//0 ~ 0.9999 거기다가 45를 곱해서 0 .44.999
numbers.add(num) //뽑은 번호를 주머니에 넣음
        }

        let sortedNums = Array.from(numbers).sort((a,b) => a -b);
//정렬을 이용하여 작은숫자부터 큰숫자로

        html += `<p>${sortedNums.join(', ')}</p>`;
        //정렬된 번호들을 쉼표로 묶어서(join)화면에 보여줄 문구(html)뒤에 덧붙임
    }
    resultDiv.innerHTML = html;
}