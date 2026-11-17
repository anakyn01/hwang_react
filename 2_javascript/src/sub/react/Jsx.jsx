
//만약 함수를 만들 경우에는 상단에 쓴다
function kwtohp(kw){
/* 함수는 리턴을 실행지키고 종료 */
   return kw * 1.36;
}

//If 컴포넌트 추상화
function If({ condition, children}){
    return condition ? children : null;
}

const mystyles = {
    color:"red", fontSize:"20px",
    backgroundColor:"lightyellow"
}


function Jsx ({ user }){//본 함수형 컴포넌트

    const hp = 218 * 1.36;

    const myobj = {
        name:"Bmw", model:"640", color:"white"
    }

    const x = "myclass";



    //값이 10보다 작으면 바나나 그렇지 않으면 사과
    const q = 5;
    let w = "Apple";

    if (q < 10) { w = "Banana";}

    const e = 5;
    return(
        <>
{/*<div>
    <If condition={user.isAdmin}>
        <AdminPanel/>
    </If>
    <If condition={!user.isAdmin}>
         {/*<StandardPanel/>
    </If>
</div>*/}

        <h1>Javascript XML</h1>
<p>
(1) jsx의 가장 강력한 기능중에 하나는 자바스크립트 표현식을 마크업내에 직접 사용한다
예를 변수를 만든다음 중괄호 안에 표시할수 있다
</p> 
<p>1번에 예시 : it has {hp} horsepower</p> 
<p>2번에 예시 : 표현식안에서 함수를 호출할수 있다
it has {kwtohp(218)} horsepower
</p> 
<p>3번에 예시 : 객체 속성을 참조 할수 있다 
My car is a {myobj.color} {myobj.name} {myobj.model}
</p>
<p className={x}>
4번에 예시 : 동적 클래스를 사용할때 좋다 클래스명 간단히 관리
</p> 
<p style={mystyles}>변수로 스타일을 선언 할수 있다</p> 
<p>리액트에서는 if를 지원하지만 jsx에서는 내부에서 사용할수 없어서 외부로 내보내거나
삼항연산자를 사용해야 됩니다    
</p>  
<h1>{w}</h1>
<h2>간결한 사용을 원하는 삼항연산자를 사용합니다</h2>
<h1>{(e) < 10 ? "Banana":"Apple"}</h1>
        </>
    )
}
export default Jsx;