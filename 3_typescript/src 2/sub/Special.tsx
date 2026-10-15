const Special = () => {

//1.any 예제(타입 검사를 완전히 패스) 예를 사용하지 않음 에러
let anyValue: any = "홍길동";
anyValue = 12345;
anyValue = [true, false];

/*2.unknown 예제 (무엇이든 될수 있지만 사용 전 검사 필수)
let unknownValue: unknown = "안녕하세요"; 에러가 발생
그전에 아래처럼 미리 검사를 해야 됩니다
*/
let unknownValue: unknown = "안녕하세요";
let textLength = 0;
if (typeof unknownValue === "string") {
 textLength = unknownValue.length;
}

/*3.never예제 절대 반환되지 않거나 일어날수 없는 사항
무한루프가 돌거나 실행 도중 에러를 던져서 함수가 끝날때 사용
*/
const throwError = (message: string): never => {
    throw new Error(message);
    //여기서 프로그램이 멈추기 때문에 아무것도 반환하지 않는다
}

/*4.undefined & null 
값이 아직 준비되지 않거나 (undefined), 
의도적으로 비울때(null)
유니온(|)으로 묶어서 사용합니다

*/
let score: number | undefined = undefined;
//아직 시험을 안 봐서 점수가 할당이 안됨
let userProfile: string | null = null;
//회원 프로필 사진이 없음을 명시적으로 표시

const loadData = () => {
    score = 100; //나중에 데이터가 들어오면 할당
}


    return(
        <>
<h1>특수유형</h1>
<hr/>
<h3>any :</h3>
<p>
가장유연한 타입 기본적으로 컴파일러에게 타입 검사를 건너뛰도록지시<br/>
{JSON.stringify(anyValue)}
- 사용시점 -<br/>
자바스크립트 코드를 타입스크립트로 마이그레이션 할때<br/>
데이터 유형을 알 수 없는 동적 콘텐츠를 다룰떼<br/>
특정 경우에 타입 검사를 제외해야 할 때<br/>
</p>   
<h3>unknown</h3>
<p>무엇이든 될수 있으므로 사용하기전에 어떤 종류의 검사를 수행해야 한다
- 필수적 -
사용전에 타입검사
타입 어설션 없이는 타입의 속성에 접근할수 없다
해당 유형의 값을 호출하거나 생성할수 없다
{textLength}
</p>
<h3>never</h3>
<p>
- 절대 반환하지 않는 함수
- 타입 검사를 절대 통과하지 못하는 타입가드
</p> 
<button onClick={() => throwError("강제로 에러를 발생시킴")}>
    never 함수 실행
</button>
<h3>
undefined null
</h3>
<p>
- undefined : 선언되었지만 값이 할당되지 않음
- null : 값이나 객체를 나타내지 않는 명시적 할당
</p>    
        </>
    )
}

export default Special