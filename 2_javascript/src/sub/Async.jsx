import React,{useState} from 'react';
import {Button, Alert, Card, 
Container, Row, Col} from 'react-bootstrap';


const Async = () => {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    //실행 함수
    const fetchFreeWeather = async () => {
        setLoading(true);
        setError(null);

        try{

const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

if(!response.ok){
    throw new Error('데이터를 가져오는데 실패 했습니다')
}

const data = await response.json();

//가상의 날씨 데이터 세팅
setWeather({
    city:'서울',
    temp: Math.floor(Math.random() * 30),
    desc: data.title.substring(0,10)
});

        } catch (err){
            setError('네트워크 오류가 발생했습니다');
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
        <Container>
            <Row>
                <Col>
<h3>날씨</h3>
<Button variant='primary'
onClick={fetchFreeWeather} 
disabled={loading}
>
{loading ? '불러오는중...':'가상 날씨 확인'}

</Button>   

{error && <Alert variant='danger' className='mt-3'>
 {error}   
    </Alert>}    
{weather &&(
<Card className='mt-3'>
<Card.Body>
    <Card.Title>{weather.city}</Card.Title>
    <Card.Text>
        온도:{weather.temp}<br/>
        상태:{weather.desc}
    </Card.Text>
</Card.Body>
</Card>         
)}               
</Col>
            </Row>
        </Container>
        </>
    )
}
export default Async