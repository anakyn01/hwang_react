import {useState} from 'react';
import { Container, Row, Col, Button } from "react-bootstrap"

const Forms2 = () =>{
//1)다중입력 기존에는 원시값을 적용했음  블록이 아닌 리턴하는 것이 객체
const [inputs, setInputs] = useState({});

const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
/*
values => 리액트에서 이전상태를 안전하게 가져와서 다음상태를
만들때 사용하는 함수형 업데이트 방식

...values (스프레드연산자) 기존 객체의 내용을 드대로 복사 전개 합니다
React는 상태가 변경되었음을 감지할때 주소값을 비교하기 때문에
기존 객체를 직접수정하면 안되고 반드시 새로운 객체를 만들어야 한다 불변성 유지

[name]: value 계산된속성명 변수 name에 담긴 문자열을 그대로 객체의 key로
사용하겠다는 뜻

다 좋은데 이렇게 쓰는 이유
예를 들어 입력창이 2개 일때 2개에 대한 useState를 만들어야 하므로 불편하다

name만 잘 적어주면 입력창이 10개든 100개든 단하나의 함수로 처리 할수 있다


e.target : 
현재 이벤트가 발생한 HTML <input> 태그 자체를 가리킵니다

name : 
해당 input 태그의 name 속성값입니다. (예: name="username")

value : 
사용자가 현재 input 창에 타이핑한 실제 텍스트 값입니다.
*/    
}

//2)체크박스
const [checks, setChecks] = useState({});

const checkChange = (e) => {
const target = e.target;
const value = target.type === 'checkbox' ? target.checked : target.value;
const name = target.name;
setChecks(values => ({...values, [name]:value}))
}

const checkSubmit = (event) => {
    let fillings = '';
    if (checks.tomato) fillings += 'tomato';
    if (checks.onion) {
        if (checks.tomato) fillings += ' and ';
        fillings += 'onion';
    }
    if (fillings == '') fillings = 'no fillings';
    alert(`${checks.firstname} wants a burger with ${fillings}` );
    event.preventDefault();
}

//3)라디오
const[selectedFruit, setSelectedFruit] = useState('banana');

const radioChange = (event) => {
    setSelectedFruit(event.target.value)
}

const radioSubmit = (event) => {
    alert(`Your favorite fruits is : ${selectedFruit}`);
    event.preventDefault();
}
//4)리스트
const cars2 = [
    {id:1001, brand:'Ford'},
    {id:1002, brand:'BMW'},
    {id:1003, brand:'Audi'},
]
const cars = ['ford','bmw','audi']
    return(
        <>
<Container fluid>
    <Row>
        <Col md={3}>
        <h1>Multiple Inputs <small>다중입력처리</small></h1>
        <form action="">
            <label htmlFor="">
                first name:
                <input
                type="text"
                name="firstname"
                value={inputs.firstname}
                onChange={handleChange}
                />
            </label>
            <label htmlFor="">
                lastt name:
                <input
                type="text"
                name="lastname"
                value={inputs.lastname}
                onChange={handleChange}
                />
            </label>
            <p>Current values:{inputs.firstname}
              {inputs.lastname}  
            </p>
        </form>
        </Col>
        <Col md={3}>
        <h1>Checkbox</h1>
        <form onSubmit={checkSubmit}>
            <label htmlFor="">My name is :
                <input
           type="text" 
           name="firstname"   
           value={checks.firstname}
           onChange={checkChange}  
                />
            </label>
            <p>I want a burger with:</p>
            <label htmlFor="">tomato:
                <input 
                type="checkbox"
                name="tomato"
                checked={checks.tomato}
                onChange={checkChange}
                />
            </label>
            <label htmlFor="">Onion:
                <input 
                type="checkbox"
                name="onion"
                checked={checks.onion}
                onChange={checkChange}
                />
            </label>
            <Button 
            variant='outline-success'
            type="submit">
                Submit
            </Button>
        </form>
        </Col>
        <Col md={3}>
        <h1>Radio</h1>
        <form onSubmit={radioSubmit}>
            <p>Select your favorit fruit:</p>
            <label>
<input  type="radio" name="fruit" value="apple"
 checked={selectedFruit === 'apple'}               
onChange={radioChange}
/>Apple
            </label><br/>
            <label>
<input  type="radio" name="fruit" value="banana"
 checked={selectedFruit === 'banana'}               
onChange={radioChange}
/>banana
            </label><br/>
            <label>
<input  type="radio" name="fruit" value="cherry"
 checked={selectedFruit === 'cherry'}               
onChange={radioChange}
/>cherry
            </label><br/>
<Button type="submit">
    Submit
</Button>
        </form>
        </Col>
        <Col md={3}>
        <h1>Lists</h1>
        <h2>My cars:</h2>
        <ul>
            {cars.map((car) => <li>i am a {car}</li>)}
        </ul>
        <h1>keys</h1>
        <ul>
{cars2.map((car) => <li key={car.id}>i am a {car.brand}</li>)}
        </ul>
        </Col>
    </Row>
</Container>
        </>
    )
}

export default Forms2