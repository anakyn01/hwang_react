type BasicProps ={
    title: string;//타이틀 타입 이 문자열
    children?: React.ReactNode
    /*?기호가 붙어 있으면 있어도 되고 없어도 된다라는 선택사항
    리액트에서 화면에 그릴수 있는 모든것(HTML태그 
    문자열 다른 리액트 컴포넌트등을 다 ㅎ용하겠다는 뜻
    )
    */
};
/*
카드 컴포넌트가 부모에게서 받아올 데이터(Props)의
이름과 종류(타입)을 미리 지정해 두는 일종의 설계도
*/

const Basic = ({title, children}: BasicProps) => {
    return(
        <>
<h2>{title}</h2>
<p>{children}</p>
        </>
    )
}

type GreetingProps = {name: string;} //아래에 쓰는 함수타입 지정
function Greeting({name}: GreetingProps){
    return(
        <div className="">
            Hello, {name}!
        </div>
    )
}

const Ext = () => {

    //타입추론 예시
    let username = "alice";
    let score = 100;
    let flag = [true, false, true];

    function add(a:number, b:number){
        return a + b;
    }

    return(
        <>
        <h1>명시적 타입과 타입 추론</h1>
<p>
(1) 명시적 타입 지정 : 변수의 타입을 명시적으로 선언 <br/>
다음과 같은 경우 명시적 데이터 유형을 사용하세요 <br/>
- 함수 매개변수 및 반환 유형<br/>
- 객체 리터럴<br/>
- 초기값이 최종 유형과 다를 수 있는 경우<br/>
<code>
// String<br/>
greeting: string = "hello TypeScript"<br/>
<br/>
// Number<br/>
userCount: number = 42;<br/>
<br/>
// Boolean<br/>
isLoading : boolean = true;<br/>
<br/>
// Aray of numbers<br/>
scores: number[] = [100, 95, 98];<br/>    
</code><br/>
예시<br/>
<Greeting name="라혜"/>
<Greeting name="상민"/>

(2) 타입추론 : TypeScript는 하당된 값을 기반으로 타입을 자동으로 결정합니다 <br/>
타입 추론은 다음과 같은 경우에 사용합니다 <br/>
즉시 할당을 사용하는 간단한 변수 선언 <br/>
문맥상 타입이 명확한 경우 <br/>
타입스크립트는 변수의 초기값을 기반으로 
변수의 타입을 자동으로 판단(추론)할수 있습니다<br/>
</p>
<p>유저 이름 : {username}</p>
<p>기본 점수: {score}</p>

        </>
    )
}

export default Ext