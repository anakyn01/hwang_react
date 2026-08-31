'use client';

import React,{useState} from 'react';
import {Layout} from '../../components/layout/Layout';
import * as A from "../DashBoard.styled";
import axios from 'axios';
import {Row, Col, Card, Form, Button} from "react-bootstrap";

axios.defaults.withCredentials = true;

export default function ShelterAdmin(){
    //
const [imageInputType, setImageInputType] = useState('LINK');
    //보호 동물 데이터 상태관리
    const [formData, setFormData] = useState({
status:'ACTIVE',
gender:'UNKNOWN',
breed:'',
noticeNo:'',
regDate:'',
rescueLocation:'',
imageUrl:'',
imageFile: null as File | null,
content:'',        
    });
    //add
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if(e.target.files && e.target.files[0]){
const file = e.target.files[0];
setFormData(prev => ({...prev, imageFile:file, imageUrl:''}));    
}    
}   

const handleChange = (e:React.ChangeEvent<any>) => {
const {name, value} = e.target;
setFormData(prev => ({...prev,[name]:value}));  
}

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

const endpoint = 'http://localhost:8080/api/shelter-animals';
const submitData = new FormData();
Object.entries(formData).forEach(([key, value ]) =>{
    if(value !== null) {
        submitData.append(key, value);
    }
});

try{
const response = await axios.post(endpoint, submitData, {
headers:{
'Content-type':'multipart/form-data'
}
});
alert('보호 동물이 성공적으로 등록되었습니다.');
}catch(error:any){
console.error('등록에러: ', error);
alert('서버 오류가 발생했습니다. 잠시후 다시 시도해 주세요');
}
    };
    return(
        <Layout>
            <>
            <A.PageHeader>
<h1 className='h3 mb-0 text-gray-800'>
    보호소 데이터 관리
</h1>
</A.PageHeader>
<A.GridRow>
    <Col lg={8}>
<Card className='shadow mb-4 border-left-warning'>
<Card.Header className='py-3'>
    <h6 className='m-0 font-weight-bold text-warning'>
        신규 보호 동물 등록
    </h6>
</Card.Header>
<Card.Body>
    <form onSubmit={handleSubmit}>
<div className="form-group mb-4 p-3 bg-light rounded">
    <Row>
        <Col md={6}>
<label className='font-weight-bold text-gray-800'>
공고상태
</label>
<Form.Select name="status" 
value={formData.status} 
onChange={handleChange}>
<option value="ACTIVE">공고중 (보호중)</option>
<option value="COMPLETED">입양 완료 / 종료</option>
</Form.Select>        
        </Col>
        <Col md={6}>
<label className='font-weight-bold text-gray-800'>
성별
</label>        
<Form.Select name="gender" 
value={formData.status} 
onChange={handleChange}>
<option value="UNKNOWN">성별 미상</option>
<option value="MALE">수컷</option>
<option value="FEMALE">암컷</option>
</Form.Select>  
        </Col>
    </Row>
</div> 

{/* 2. 기본 정보 입력 */}
<Row className='mb-3'>
    <Col md={6} className='form-group'>
<label className='font-weight-bold'>
품종
</label>
<Form.Control
name="breed"
placeholder='예: [개] 푸들, [고양이] 코숏'
value={formData.breed}
onChange={handleChange}
required
/>   
    </Col>
    <Col md={6} className='form-group'>
    <label className='font-weight-bold'>
        공고번호
    </label>
    <Form.Control
name="noticeNo"
placeholder='예 충북 청주-2026-00001' 
value={formData.noticeNo}
onChange={handleChange}
required   
    />
    </Col>
</Row>
<Row className='mb-3'>

    <Col md={6} className='form-group'>
<label className='font-weight-bold'>
등록날짜
</label>
<Form.Control
type="date"
name="regDate"
value={formData.regDate}
onChange={handleChange}
required
/>    
    </Col>

        <Col md={6} className='form-group'>
<label className='font-weight-bold'>
구조장소
</label>
<Form.Control
name="rescueLocation"
placeholder='예 : 용암삼일무지개아파트'
value={formData.rescueLocation}
onChange={handleChange}
required
/>    
    </Col>
</Row>

<hr className='my-4'/>

{/* 3. 이미지 및 상세 내용 */}
<div className="form-group mb-3">
<label className='font-weight-bold text-primary'>
대표 사진 URL (필수)    
</label>
<div className="d-flex gap-4 mb-3 mt-2">
<Form.Check
type="radio" id="imgLink" name="imageInputType"
label="URL(링크)로 입력"
checked={imageInputType === 'LINK'}
onChange={() => setImageInputType('LINK')}    
/>
<Form.Check
type="radio"
id="imgUpload"
name="imageinputType"
label="직접 업로드"
checked={imageInputType === 'UPLOAD'}
onChange={() => setImageInputType('UPLOAD')}
/>
</div>
{/*조건부 입력창 렌더링 */}
{imageInputType === 'LINK' ? (
<Form.Control
type="url"
name="imageUrl"
placeholder='이미지 링크를 붙여 넣어 주세요'
value={formData.imageUrl}
onChange={handleChange}
required={imageInputType === 'LINK'}
/>    
):(
<Form.Control
type="file" 
name="imageFile"
accept="image/*"
onChange={handleFileChange}
required={imageInputType === 'UPLOAD'}
/>

)}
</div>
{(formData.imageUrl || formData.imageFile) && (
    <div className="mb-4 text-center">
        <img
src={formData.imageFile ? 
    URL.createObjectURL(formData.imageFile):
    formData.imageUrl}  
    alt="대표사진 미리보기"
className='img-thumbnail shadow-sm'          
        />
    </div>
)}


<div className="form-group mb-4">
<lable className="font-weight-bold">
특이사항 및 상세 설명    
</lable>
<Form.Control
as="textarea" rows={5}
name="content"
placeholder='동물의 건강 상태, 성격, 발견 당시 상황 등을 적어주세요.'
value={formData.content}
onChange={handleChange}
required
/>
</div>
<Button type="submit" variant='warning'
className='btn-block w-100 font-weight-bold p-3 mt-4 text-dark'>
보호 동물 등록하기    
</Button>
    </form>
</Card.Body>
</Card>    
    </Col>
<Col lg={4}>
<Card className='shadow mb-4'>
    <Card.Header className='py-3'>
<h6 className='m-0 font-weight-bold text-warning'>
    등록및 관리 안내
    </h6>        
    </Card.Header>
    <Card.Body className='text-gray-800'>
<p><strong>공고 상태 관리</strong></p>
기본값은 '공고중'입니다. 입양처가 정해지거나 보호가 종료되면 상태를
<strong>'입양완료'</strong>로 변경해 주세요.
앱 화면에서 회색 '완료'뱃지로 자동 전환됩니다.
    </Card.Body>
</Card>
</Col>


</A.GridRow>
            </>
        </Layout>
    )
}
/*
</form><Form.Control
type="url"
name="imageUrl"
placeholder='이미지 링크를 붙여 넣어 주세요'
value={formData.imageUrl}
onChange={handleChange}
required
/>
</div>
{(formData.imageUrl || formData.imageFile) && (
    <div className='mb-4 text-center'>
<img src={formData.imageUrl} alt="대표사진 미리보기"/>        
    </div>
)}
*/