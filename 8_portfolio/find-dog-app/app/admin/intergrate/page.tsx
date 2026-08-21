'use client';

import React,{useState} from 'react';
import { Layout } from '../../components/layout/Layout';
import * as A from "../DashBoard.styled";
import axios from 'axios';
import {Row, Col, Card, Form, Button} from "react-bootstrap";

axios.defaults.withCredentials = true;

export default function Intergrate(){

    const [boardType, setBoardType] = useState('YOUTUBE');

    const [formData, setFormData] = useState({
        title:'', 
        content:'',
        youtubeUrl:'',
        thumbnailUrl:'',
        imageUrl:'',
        videoUrl:'',
        attachmentUrl:'',
    });
//유튜브에는 숏도 있음
const extractYoutubeId = (url: string) => {
const regExp = 
/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
const match = url.match(regExp);
return (match && match[2].length === 11) ? match[2] : null;
}

    const handleChange = (e:React.ChangeEvent<any>) => {
const {name, value} =e.target;

setFormData(prev =>{
    const newData = {...prev, [name]: value};

    if(boardType === 'YOUTUBE' && name === 'youtubeUrl'){
        const videoId = extractYoutubeId(value);
        if(videoId){
            newData.thumbnailUrl = 
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    }
return newData;
})
    }

    const handleBoardTypeChange = (type: string) => {
setBoardType(type);
setFormData({
title:'', content:'',youtubeUrl:'',thumbnailUrl:'',imageUrl:'',
videoUrl:'',attachmentUrl:'',
});
    }

    const handleSubmit = async (e:React.FormEvent)=>{
e.preventDefault();

let endpoint = '';
let payload = {};

if(boardType === 'YOUTUBE'){
    endpoint = 'http://localhost:8080/api/youtube';
    payload = {
        title:formData.title,
        youtubeUrl:formData.youtubeUrl,
        thumbnailUrl:formData.thumbnailUrl
    };
}else if( boardType === 'FELLOW'){
    endpoint = 'http://localhost:8080/api/fellow-news';
    payload = {
        title:formData.title,
        content:formData.content,
        imageUrl:formData.imageUrl,
        videoUrl:formData.videoUrl,
        attachmentUrl:formData.attachmentUrl
    };
}else if ( boardType === 'HELP'){
    endpoint = 'http://localhost:8080/api/need-help';
    payload = {
        title:formData.title,
        content:formData.content,
        imageUrl:formData.imageUrl,
        videoUrl:formData.videoUrl,
        attachmentUrl:formData.attachmentUrl
    };
}
try{
const response = 
await axios.post(endpoint, payload);
alert(response.data || '성공적으로 등록되었습니다');
// 등록 완료 후 폼 비우기
setFormData({
 title:'', content:'', youtubeUrl:'', thumbnailUrl:'', 
 imageUrl:'', videoUrl:'', attachmentUrl:''   
})
}catch(error: any){
console.error('등록에러 :', error);
alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
}
    };

    return(
        <Layout>
            <A.PageHeader>
                <h1 className='h3 mb-0 text-gray-800'>
                    통합 콘텐츠 등록관리
                </h1>
            </A.PageHeader>

            <A.GridRow>
                <Col lg={8}>
                <Card className='shadow mb-4 border-left-primary'>
                    <Card.Header className='py-3'>
<h6 className='m-0 font-weight-bold text-primary'>
     신규 콘텐츠 등록
</h6>
                    </Card.Header>
<Card.Body>
<form onSubmit={handleSubmit}>

<div className="from-group mb-4 p-3 bg-light rounded">
    
    <label className='font-weight-bold text-gray-800'>
        등록 카테고리 선택
    </label>

    <div className="d-flex gap-3 mt-2">
        
        <div className="custom-control custom-radio mr-3">

            <Form.Check
            type="radio" id="typeYoutube" name="boardType"
            className='custom-control-input'
            checked={boardType === 'YOUTUBE'}
            onChange={() => handleBoardTypeChange('YOUTUBE')}
            />
            <label className='custom-control-label font-weight-bold text-danger'
            htmlFor='typeYoutube'>
            🎥 어서찾아주개 유튜브    
            </label>

        </div>


        <div className="custom-control custom-radio mr-3">

            <Form.Check
            type="radio" id="typeFellow" name="boardType"
            className='custom-control-input'
            checked={boardType === 'FELLOW'}
            onChange={() => handleBoardTypeChange('FELLOW')}
            />
            <label className='custom-control-label font-weight-bold text-danger'
            htmlFor='typeFellow'>
            📰 펠로우 소식
            </label>

        </div>


        <div className="custom-control custom-radio mr-3">

            <Form.Check
            type="radio" id="typeHelp" name="boardType"
            className='custom-control-input'
            checked={boardType === 'HELP'}
            onChange={() => handleBoardTypeChange('HELP')}
            />
            <label className='custom-control-label font-weight-bold text-danger'
            htmlFor='typeHelp'>
            🚨 도움이 필요해요
            </label>
        </div>
    </div>
</div>

<hr/>

{/* 공통입력 : 제목 */}
<div className="form-group mb-3">
    <label htmlFor="" className='font-weight-bold'>
        제목
    </label>
    <Form.Control
name="title"
placeholder='게시물 제목을 입력하세요'  
value={formData.title}
onChange={handleChange}
required  
    />
</div>

{boardType === 'YOUTUBE' && (
    <>
    <div className="form-group mb-3">
<label htmlFor="" className='font-weight-bold'>
    유튜브 영상 주소 (URL)
</label>
<Form.Control
type="url"
name="youtubeUrl"
placeholder='유튜브주소를 복사붙여넣기 하세요'
value={formData.youtubeUrl}
onChange={handleChange}
required
/>
<small className='form-text text-muted'>
주소를 입력하면 아래 썸네일이 자동으로 채워집니다.    
</small>
</div>
<div className="from-group mb-4">
    <label htmlFor="" className='font-weight-bold'>
        자동 추출된 썸네일 URL
    </label>
    <Form.Control
    type="url" name="thumbnailUrl"
    value={formData.thumbnailUrl}
    onChange={handleChange}
    required
    />
</div>
{
    formData.thumbnailUrl && (
        <div className="mb-4 text-center">
            <img src={formData.thumbnailUrl} alt="썸네일 미리보기" 
            className='img-thumbnail'
            />
        </div>
    )
}
</>
)}

{(boardType === 'FELLOW' || boardType === 'HELP') && (
    <>
    <div className="form-group mb-3">
<label htmlFor="" className='font-weight-bold'>
상세 내용 (본문 글)    
</label>
<Form.Control
as = "textarea" rows={6} name="content"
placeholder="자세한 사연이나 소식을 적어주세요."
value={formData.content} 
onChange={handleChange}
required
/>
<div className='form-group mb-3'>
    <label htmlFor="" className='font-weight-bold text-primary'>
        대표 이미지 URL (필수)
    </label>
    <Form.Control
    type="url" name="imageUrl"
    placeholder='https://..'
    value={formData.imageUrl}
    onChange={handleChange}
    required
    />
</div>    

{
    formData.imageUrl && (
        <div className="mb-4 text-center">
            <img src={formData.imageUrl} alt="썸네일 미리보기" 
            className='img-thumbnail'
            />
        </div>
    )
}

<Row>
    <Col md={6} className='from-group mb-4'>
    <label className=''>동영상 첨부 URL (선택)</label>
    <Form.Control
        type="text" name="videoUrl" placeholder='"/uploads/video.mp4'
        value={formData.videoUrl} onChange={handleChange}    
    />
    </Col>
    <Col md={6} className='from-group mb-4'>

    <label className=''>기타 첨부파일 URL (선택)</label>
    <Form.Control
        type="text" name="attachmentUrl" placeholder='"/uploads/file.pdf'
        value={formData.attachmentUrl} onChange={handleChange}    
    />

    </Col>
</Row>
    </div>
    </>
)}

<Button type="submit" variant='primary'
className='btn-block w-100 font-weight-bold p-3 mt-4'>
{boardType=== 'YOUTUBE' ? '유튜브영상 등록하기' : 
boardType === 'FELLOW' ? '펠로우 소식 등록하기' :
'도움 요청글 등록하기'
}    
</Button>
</form>
</Card.Body>                    
</Card>
</Col>

{/*안내 가이드 패널 */}
<Col lg={4}>
                    <Card className='shadow mb-4'>
                        <Card.Header className='py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'>
                                💡 카테고리별 등록 안내
                            </h6>
                        </Card.Header>
                        <Card.Body className='text-gray-800'>
                            <p><strong>🎥 어서찾아주개 유튜브</strong><br />
                                유튜브 영상 주소만 붙여넣으면 메인 화면의 '2단 그리드' 영역에 썸네일과 함께 노출됩니다.
                            </p>
                            <hr />
                            <p><strong>📰 펠로우 소식</strong><br />
                                센터의 훈훈한 소식이나 근황을 올립니다. 메인 화면의 '3단 그리드'에 정방형으로 예쁘게 렌더링됩니다. 대표 이미지는 필수입니다!
                            </p>
                            <hr />
                            <p><strong>🚨 도움이 필요해요</strong><br />
                                긴급한 구조나 지원이 필요한 동물들의 사연을 올립니다. 메인 화면의 '4단 그리드'에 노출되어 가장 많은 이미지를 한눈에 보여줍니다.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </A.GridRow>
        </Layout>
    )
}
