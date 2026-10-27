import {useState} from 'react';
import { Container, Row, Col, Button, Form 
    } from "react-bootstrap";


const Forms = () => {

//이름
const [name, setName] = useState("");

function handleChange(e){
    setName(e.target.value);
}

//엔터치면 팝업창으로 이름 전송
const [yourname, setYourName] = useState("");

function inputChange(e){
    setYourName(e.target.value);
}

function formSubmit(e){
    e.preventDefault();
    alert(yourname);
}


const [mytxt, setMytxt] = useState("");

function txtChange(e) {
    setMytxt(e.target.value);
}

//select email 예시
const [email, setEmail] = useState("gmail");

const mailChange = (event) => {
    setEmail(event.target.value)
}



    return(
        <>
<Container fluid>
    <Row>
<Col md={3}>
<h1>Forms</h1>
<form>
    <label htmlFor="">
Enter your name:
<Form.Control 
value={name}
onChange={handleChange}
/>        
    </label>
<p>Current value:{name}</p>
</form>
</Col>

<Col md={3}>
<h1>submit</h1>
<form onSubmit={formSubmit}>
<label htmlFor="">
    Enter your name:
    <Form.Control
value={yourname} 
onChange={inputChange}   
    />
</label>
<Button type="submit">전송</Button>
</form>
</Col>

<Col md={3}>
<form>
<h1>textarea</h1>
<p>장문에 글을 쓸때 </p>
<textarea name="" id="" value={mytxt} onChange={txtChange}/>
<p>Current value : {mytxt}</p>
</form>
</Col>

<Col md={3}>
<h1>select</h1>
<form>
    <select value={email} onChange={mailChange}>
        <option value="gmail">gmail</option>
        <option value="daum">daum</option>
        <option value="naver">naver</option>
    </select>
</form>
</Col>
    </Row>
</Container>
        </>
    )
}

export default Forms