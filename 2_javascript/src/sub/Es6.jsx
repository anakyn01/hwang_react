const Es6 = () => {

    //1.변수 (let, const)
    const title = "ES6학습 페이지";
    let count = 0;

    //2.화살표 함수
    const sayHello = () => console.log("안녕");

    //3.템플릿 문자열
    const greeting = `반갑습니다, ${title}`;

    //4.배열 맵(map)
    const list = ['클래스', '화살표함수', '구조분해'];

    //5.구조분해
    const user = {name:'황영일', age:49};
    const { name, age } = user;

    //6.스프레드 연산자
    const oldList = [1,2];
    const newList = [...oldList, 3]

    return(
        <>
        <div className="">
            <h1>{greeting}</h1>
            <p>구조 분해된 이름: {name}, 나이:{age}</p>
            <ul>
{list.map((item, index) => 
  <li key={index}>
    {item}
  </li>
)}
            </ul>
        </div>
        </>
    )
}

export default Es6