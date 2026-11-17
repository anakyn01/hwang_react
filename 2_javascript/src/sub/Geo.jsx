//상태관리
import React, {useState} from 'react';

import {
Container, Row, Col, Button, Alert   
} from 'react-bootstrap';

const Geo = () => {

//1)상태관리
const[location, setLocation] = useState({lat:null, lon:null});
const[error, setError] = useState(null);
/*
 useState({lat:null, lon:null}); 현재 위도 경도를 담아두는 변수
 처음엔 값이 없으니 null시작

 setLocation 은 location을 업데이트 할때 쓰는 명령어
 error 위치를 가져오다가 문제가 생기면 그내용을 담을 변수
*/
const getLocation = () => {
    //1.브라우저가 위치 정보를 지원하는지 확인
    if (!navigator.geolocation){
        //브라우저가 내장하고 있는 지오로케이션(위치탐색)기능이 없다면
        setError('이 브라우저는 위치 정보를 지원하지 않습니다');
        return;}

    //2.위치정보 요청
    navigator.geolocation.getCurrentPosition(
//성공시 : 브라우저가 위치를 찾으면 이코드가 실행됨
(position) => {
    setLocation({
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    });
    setError(null);//에러가 있었다면 지워줌
},
(err) => {
    //실패시나 사용자가 위치 허용을 거부하거나 오류가 나면 실행
    setError('위치를 가져올수 없습니다: ' +err.message);
}

    );

    
};


    return(
        <>
        <Container fluid>
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <h1 className='mt-5 mb-2'>
                    위치기반 실습   
                    </h1>   

<Button variant="primary"
onClick={getLocation}
>
현재 위치 가져오기
</Button>

{/*에러 출력 부분 */}
{error && <Alert variant="danger"
className='mt-3'
>{error}</Alert>}

{/* 정상적으로 나올시에 */}
{location.lat &&(
    <div className="mt-3">
        <p><strong>위도:</strong>{location.lat}</p>
        <p><strong>경도:</strong>{location.lon}</p>
    </div>
)}


                </Col>
            </Row>
        </Container>        
        </>
    )
}
export default Geo;