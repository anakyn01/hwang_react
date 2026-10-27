'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { updateCampaignField, setMediaType, submitCampaign } from '../../redux/campaignAdminSlice';

import { Layout} from "../../components/layout/Layout";
import * as A from "../DashBoard.styled";
import {Row, Col, Card, Form, Button} from "react-bootstrap";

export default function AdoptionCampaignAdmin(){
    const dispatch = useDispatch<AppDispatch>();

    // Redux Store 상태 조회
    const { formData, isLoading } = useSelector((state: RootState) => state.campaignAdmin);

    // 일반 입력값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        dispatch(updateCampaignField({ name, value }));
    };

    // 미디어 타입(라디오버튼) 변경 핸들러
    const handleMediaTypeChange = (type: string) => {
        dispatch(setMediaType(type));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(submitCampaign(formData));

        if (submitCampaign.fulfilled.match(resultAction)) {
            alert(resultAction.payload || '입양 캠페인이 성공적으로 등록되었습니다!');
        } else {
            alert(resultAction.payload || '서버 오류가 발생했습니다. 잠시후 다시 시도해 주세요');
        }
    };

    const HASHTAG_LIST = [
        "#제주입양","#임시보호","#치료지원","#입양홍보", "#구조스토리"
    ];

    return(
        <Layout>
            <A.PageHeader>
                <h1 className='h3 mb-0 text-gray-800'>
                    입양 캠페인 관리
                </h1>
            </A.PageHeader>

            <A.GridRow>
                <Col lg={8}>
                    <Card className='shadow mb-4 border-left-primary'>
                        <Card.Header className='py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'>
                                신규 캠페인 등록    
                            </h6>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-4">
                                    <label className='font-wieght-bold text-gray-800'>
                                        미디어 타입 설정
                                    </label>

                                    <div className='d-flex gap-3 mt-2'>
                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                                type="radio" id="mediaImage" name="mediaType"
                                                className='custom-control-input'
                                                checked={formData.mediaType === 'IMAGE'}
                                                onChange={() => handleMediaTypeChange("IMAGE")}            
                                            />
                                            <label className='custom-control-label' htmlFor='mediaImage'>이미지형</label>
                                        </div>
                                        <div className='custom-control custom-radio mr-3'>
                                            <Form.Check
                                                type='radio'
                                                id="mediaYoutube"
                                                name="mediaType"
                                                className='custom-control-input'
                                                checked={formData.mediaType === 'YOUTUBE'}
                                                onChange={() => handleMediaTypeChange('YOUTUBE')}
                                            />
                                            <label className='custom-control-label' htmlFor='mediaYoutube'>유튜브 링크형</label>
                                        </div>

                                        <div className='custom-control custom-radio mr-3'>
                                            <Form.Check
                                                type='radio'
                                                id="mediaDirect"
                                                name="mediaType"
                                                className='custom-control-input'
                                                checked={formData.mediaType === 'DIRECT_VIDEO'}
                                                onChange={() => handleMediaTypeChange('DIRECT_VIDEO')}
                                            />
                                            <label className='custom-control-label' htmlFor='mediaDirect'>서버 직접 업로드형</label>
                                        </div>
                                    </div>
                                </div>

                                <hr/>
                                {/*해시태그 및 제목 입력 구역 */}
                                <Row>
                                    <Col md={4} className='form-group mb-3'>
                                        <p><label className='font-weight-bold'>
                                            해시태그 (말머리)
                                        </label></p>
                                        <Form.Select
                                            name="hashtag"
                                            value={formData.hashtag}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">-- 필수 선택 --</option>
                                            {HASHTAG_LIST.map((tag, index) => (
                                                <option key={index} value={tag}>
                                                    {tag}
                                                </option>
                                            ))}
                                        </Form.Select>    
                                    </Col>

                                    <Col md={8} className='form-group mb-3'>
                                        <label className='font-weight-bold'>
                                            캠페인 제목
                                        </label>
                                        <Form.Control
                                            name="title" placeholder='목록에 노출될 제목을 적어주세요'
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>

                                {/*상세 내용구역 */}
                                <div className="form-group mb-3">
                                    <label className='font-weight-bold'>
                                        상세 내용
                                    </label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name="content"
                                        placeholder='캠페인의 자세한 사연이나 설명을 적어주세요'
                                        value={formData.content}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/*동영상 링크 / 경로 */}
                                {formData.mediaType !== 'IMAGE' &&(
                                    <div className="form-group mb-3 p-3 bg-light rounded">
                                        <label className='font-weight-bold text-primary'>
                                            {formData.mediaType === 'YOUTUBE' ? '유튜브 링크(URL)':'서버동영상 파일경로'}            
                                        </label>
                                        <Form.Control
                                            type="text" name="mediaUrl"
                                            placeholder={formData.mediaType === 'YOUTUBE' ? 'https://youtube.com/..' : '/uploads/videos/campaign_'}
                                            value={formData.mediaUrl}
                                            onChange={handleChange}
                                            required={formData.mediaType !== 'IMAGE'}        
                                        />
                                    </div>
                                )}

                                {/*썸네일 구역 */}
                                <div className="form-group mb-4">
                                    <label className='font-weight-bold'>
                                        썸네일 이미지 URL(최대 2MB)
                                    </label>
                                    <Form.Control
                                        type="url"
                                        name="thumbnailUrl"
                                        placeholder='목록에 보여질 썸네일 주소를 입력하세요'
                                        value={formData.thumbnailUrl}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/*썸네일 미리보기*/}
                                {formData.thumbnailUrl && (
                                    <div className="mb-4 text-center">
                                        <img src={formData.thumbnailUrl} alt="썸네일 미리보기" style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                )}
                                <Button type="submit" variant='primary' className='btn-block' disabled={isLoading}>
                                    {isLoading ? '등록 중...' : '캠페인 최종 등록하기'}
                                </Button>
                            </form>
                        </Card.Body>       
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className='shadow mb-4'>
                        <Card.Header className='py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'> 
                                등록 안내 가이드
                            </h6>
                        </Card.Header>
                        <Card.Body className='text-gray-800'>
                            <p><strong>1. 해시태그(말머리) 필수:</strong><br/>
                                말머리를 정확히 선택해야 사용자 페이지에서 해당 카테고리로 묶여서 노출됩니다.            
                            </p>
                            <hr/>
                            <p><strong>2. 유튜브 링크 활용:</strong><br/>
                                서버 트래픽 절감 및 원활한 스트리밍을 위해 
                                가급적 유튜브 링크 연동을 권장합니다. 
                                상세 페이지에서 Iframe으로 노출됩니다.
                            </p>
                            <hr/>
                            <p><strong>
                                3. 직접 동영상 업로드 시 주의:
                            </strong><br/>
                                외부 통제가 불가능한 상황을 대비한 기능입니다
                                트래픽 폭주를 막기위해 최대 2MB 용량, 
                                30초 이내의 ogg 또는 mp4 파일로 변환하여 업로드
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </A.GridRow>
        </Layout>
    );
}