'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setSourceType, updateRecommendedField, parseAnimalUrl, submitRecommendedAnimal } from '../../redux/recommendedAdminSlice';

import { Layout } from '../../components/layout/Layout';
import * as A from "../DashBoard.styled";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function RecommendedAnimalAdmin(){
    const dispatch = useDispatch<AppDispatch>();

    // Redux Store 상태 조회
    const { sourceType, formData, isParsing, isLoading } = useSelector((state: RootState) => state.recommendedAdmin);

    // URL 파싱 핸들러
    const handleParseUrl = async () => {
        if(!formData.sourceUrl) {
            alert('SNS 주소를 먼저 입력해 주세요!');
            return;
        }
        const resultAction = await dispatch(parseAnimalUrl({ url: formData.sourceUrl, sourceType }));
        if (parseAnimalUrl.fulfilled.match(resultAction)) {
            alert('데이터를 성공적으로 불러왔습니다! 빈칸이나 틀린 부분을 수정해 주세요.');
        } else {
            alert('데이터를 파싱하는 과정에서 기본 예시 데이터가 적용되었습니다.');
        }
    };

    // 입력값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        dispatch(updateRecommendedField({ name, value }));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(submitRecommendedAnimal({ sourceType, formData }));

        if (submitRecommendedAnimal.fulfilled.match(resultAction)) {
            alert('추천 동물이 성공적으로 등록되었습니다!');
        } else {
            alert(resultAction.payload || '등록에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return(
        <Layout>
            <A.PageHeader>
                <h1 className="h3 mb-0 text-gray-800">
                    추천 입양 동물 관리
                </h1>
            </A.PageHeader>

            <A.GridRow>
                <Col lg={8}>
                    <Card className='shadow mb-4 border-left-primary' >
                        <Card.Header className='py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'>
                                신규 추천 동물 등록 
                            </h6>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group mb-4'>
                                    <label className='font-weight-bold text-gray-800'>
                                        등록 출처 선택
                                    </label>
                                    <div className="d-flex gap-3 mt-2">
                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                                type='radio'
                                                id="sourceDirect"
                                                name="sourceType"
                                                className='custom-control-input'
                                                checked={sourceType === 'DIRECT'}
                                                onChange={() => dispatch(setSourceType('DIRECT'))}
                                            />
                                            <label className='custom-control-label' htmlFor='sourceDirect'>
                                                자체 직접 등록    
                                            </label>
                                        </div>

                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                                type='radio'
                                                id="sourceFacebook"
                                                name="sourceType"
                                                className='custom-control-input'
                                                checked={sourceType === 'FACEBOOK'}
                                                onChange={() => dispatch(setSourceType('FACEBOOK'))}
                                            />
                                            <label className='custom-control-label' htmlFor='sourceFacebook'>
                                                페이스북 링크    
                                            </label>
                                        </div>

                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                                type='radio'
                                                id="sourceInstagram"
                                                name="sourceType"
                                                className='custom-control-input'
                                                checked={sourceType === 'INSTAGRAM'}
                                                onChange={() => dispatch(setSourceType('INSTAGRAM'))}
                                            />
                                            <label className='custom-control-label' htmlFor='sourceInstagram'>
                                                인스타그램 링크    
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <hr/>

                                {sourceType !== 'DIRECT' && (
                                    <div className="form-group mb-3">
                                        <label className='font-weight-bold text-primary'>SNS 포스팅 URL 주소</label> 
                                        <div className="input-group">
                                            <Form.Control
                                                type="url"
                                                name="sourceUrl"
                                                placeholder={`${sourceType === 'FACEBOOK' ? '페이스북' : '인스타그램'} 주소를 입력하세요`}
                                                value={formData.sourceUrl}
                                                onChange={handleChange}
                                                required
                                            />    
                                            <div className="input-group-append">
                                                <Button
                                                    variant="outline-secondary"
                                                    type="button"
                                                    onClick={handleParseUrl}
                                                    disabled={isParsing}
                                                >
                                                    {isParsing ? '분석 중...' : '데이터 자동 불러오기 ⚡'}    
                                                </Button>    
                                            </div>   
                                        </div>
                                        <small className='form-text text-muted'>
                                            주소를 입력하고 불러오기 버튼을 누르면 아래 정보가 자동으로 채워집니다.
                                        </small>
                                    </div>
                                )}

                                {/* 동물 정보 입력 */}
                                <Row>
                                    <Col md={6} className='form-group mb-3'>
                                        <label>지역 (예: 강릉시)</label>
                                        <Form.Control
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            required
                                        />    
                                    </Col>
                                    <Col md={6} className='form-group mb-3'>
                                        <label>공고번호 / 이름</label>
                                        <Form.Control
                                            name="noticeNo"
                                            value={formData.noticeNo}
                                            onChange={handleChange}
                                            required
                                        />    
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} className='form-group mb-3'>
                                        <label>출생년도 (예: 2023)</label>
                                        <Form.Control
                                            name="birthYear"
                                            value={formData.birthYear}
                                            onChange={handleChange}
                                            required
                                        />  
                                    </Col>

                                    <Col md={4} className='form-group mb-3'>
                                        <label>성별</label>
                                        <Form.Select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className='form-control'
                                        >  
                                            <option value="M">수컷 (M)</option>
                                            <option value="F">암컷 (F)</option>                                   
                                        </Form.Select>
                                    </Col>

                                    <Col md={4} className='form-group mb-3'>
                                        <label>체중 (kg)</label>
                                        <Form.Control
                                            type="number"
                                            step="0.1"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            required
                                        />  
                                    </Col>
                                </Row>

                                <div className="form-group mb-4">
                                    <label>동물 사진 URL</label>
                                    <Form.Control
                                        type="url"
                                        name="imageUrl"
                                        placeholder="https://..."
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {formData.imageUrl && (
                                    <div className="mb-4 text-center">
                                        <img src={formData.imageUrl} alt="미리보기" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary btn-block w-100 font-weight-bold p-3 mt-4" disabled={isLoading}>
                                    {isLoading ? '등록 중...' : '최종 등록하기'}
                                </button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className='shadow mb-4'>
                        <Card.Header className='py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'>
                                등록안내
                            </h6>
                        </Card.Header>
                        <Card.Body className='text-gray-800'>
                            <p><strong>직접등록: </strong>
                                센터에서 보호중인 동물을 직접 등록합니다.
                            </p>
                            <p><strong>페이스북 / 인스타: </strong>
                                외부 SNS에서 화제가 된 입양 홍보글을 연동할 때 사용합니다. 
                                추후 사용자 화면에서 해당 동물을 클릭하면 입력하신 SNS 주소로 이동하도록 개발할 수 있습니다.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </A.GridRow>
        </Layout>
    );
}