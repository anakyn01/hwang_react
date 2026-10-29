'use client';

import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setSourceType, updateRecommendedField, parseAnimalUrl, submitRecommendedAnimal } from '../../redux/recommendedAdminSlice';

import { Layout } from '../../components/layout/Layout';
// 💡 앞서 정의한 쿨그레이 믹스인 및 레이아웃 요소 임포트
import { coolGray, adminInput, adminPrimaryBtn, adminOutlineBtn } from '@/assets/css/admin/Admin.styles';
import { PageHeading, AdminDataCard } from '../../../assets/css/admin/layout.styled';

// ==========================================
// 💡 폼(Form) 전용 스타일드 컴포넌트 정의
// ==========================================
const GridWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* 좌측 폼 2, 우측 안내 1 비율 */
  gap: 24px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr; /* 모바일/태블릿에선 1열 세로 배치 */
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 700;
  color: ${coolGray[700]};
  margin-bottom: 8px;
  font-size: 14px;
`;

const FormInput = styled.input`
  ${adminInput}
`;

const FormSelect = styled.select`
  ${adminInput}
  cursor: pointer;
`;

// 가로 분할을 위한 내부 그리드
const InnerGridRow2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const InnerGridRow3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

// 인풋창과 버튼이 붙어있는 구조 (URL 입력부)
const InputGroup = styled.div`
  display: flex;
  width: 100%;

  ${FormInput} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none; /* 겹치는 테두리 제거 */
  }
`;

const FetchButton = styled.button`
  ${adminOutlineBtn}
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  white-space: nowrap;
  background-color: ${coolGray[50]};
`;

const SubmitButton = styled.button`
  ${adminPrimaryBtn}
  width: 100%;
  padding: 14px;
  font-size: 16px;
  margin-top: 16px;
`;

// 라디오 버튼 그룹 스타일
const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${coolGray[700]};
  font-weight: 500;

  input[type="radio"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${coolGray[400]};
    border-radius: 50%;
    margin: 0;
    display: grid;
    place-content: center;

    &::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      background-color: ${coolGray[800]}; /* 체크 시 쿨그레이 색상 */
    }

    &:checked {
      border-color: ${coolGray[800]};
    }
    
    &:checked::before {
      transform: scale(1);
    }
  }
`;

const HelpText = styled.small`
  display: block;
  margin-top: 6px;
  color: ${coolGray[500]};
  font-size: 13px;
`;

const InfoText = styled.p`
  color: ${coolGray[600]};
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;

  strong {
    color: ${coolGray[800]};
    font-weight: 700;
  }
`;

// ==========================================
// 💡 메인 컴포넌트
// ==========================================
export default function RecommendedAnimalAdmin() {
    const dispatch = useDispatch<AppDispatch>();

    const { sourceType, formData, isParsing, isLoading } = useSelector((state: RootState) => state.recommendedAdmin);

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

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        dispatch(updateRecommendedField({ name, value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(submitRecommendedAnimal({ sourceType, formData }));

        if (submitRecommendedAnimal.fulfilled.match(resultAction)) {
            alert('추천 동물이 성공적으로 등록되었습니다!');
        } else {
            alert(resultAction.payload || '등록에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <Layout>
            <PageHeading>추천 입양 동물 관리</PageHeading>

            <GridWrap>
                {/* 좌측 폼 영역 */}
                <div>
                    <AdminDataCard>
                        <div className='card-header'>
                            신규 추천 동물 등록
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                {/* 라디오 버튼 그룹 */}
                                <FormGroup>
                                    <FormLabel>등록 출처 선택</FormLabel>
                                    <RadioGroup>
                                        <RadioLabel>
                                            <input
                                                type='radio'
                                                name="sourceType"
                                                checked={sourceType === 'DIRECT'}
                                                onChange={() => dispatch(setSourceType('DIRECT'))}
                                            />
                                            자체 직접 등록    
                                        </RadioLabel>
                                        <RadioLabel>
                                            <input
                                                type='radio'
                                                name="sourceType"
                                                checked={sourceType === 'FACEBOOK'}
                                                onChange={() => dispatch(setSourceType('FACEBOOK'))}
                                            />
                                            페이스북 링크    
                                        </RadioLabel>
                                        <RadioLabel>
                                            <input
                                                type='radio'
                                                name="sourceType"
                                                checked={sourceType === 'INSTAGRAM'}
                                                onChange={() => dispatch(setSourceType('INSTAGRAM'))}
                                            />
                                            인스타그램 링크    
                                        </RadioLabel>
                                    </RadioGroup>
                                </FormGroup>

                                <hr style={{ borderColor: coolGray[200], margin: '24px 0' }} />

                                {/* SNS 파싱 인풋 */}
                                {sourceType !== 'DIRECT' && (
                                    <FormGroup>
                                        <FormLabel style={{ color: coolGray[800] }}>SNS 포스팅 URL 주소</FormLabel> 
                                        <InputGroup>
                                            <FormInput
                                                type="url"
                                                name="sourceUrl"
                                                placeholder={`${sourceType === 'FACEBOOK' ? '페이스북' : '인스타그램'} 주소를 입력하세요`}
                                                value={formData.sourceUrl}
                                                onChange={handleChange}
                                                required
                                            />    
                                            <FetchButton
                                                type="button"
                                                onClick={handleParseUrl}
                                                disabled={isParsing}
                                            >
                                                {isParsing ? '분석 중...' : '데이터 자동 불러오기 ⚡'}    
                                            </FetchButton>    
                                        </InputGroup>
                                        <HelpText>주소를 입력하고 불러오기 버튼을 누르면 아래 정보가 자동으로 채워집니다.</HelpText>
                                    </FormGroup>
                                )}

                                {/* 동물 정보 입력 */}
                                <InnerGridRow2>
                                    <FormGroup>
                                        <FormLabel>지역 (예: 강릉시)</FormLabel>
                                        <FormInput
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            required
                                        />    
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>공고번호 / 이름</FormLabel>
                                        <FormInput
                                            name="noticeNo"
                                            value={formData.noticeNo}
                                            onChange={handleChange}
                                            required
                                        />    
                                    </FormGroup>
                                </InnerGridRow2>

                                <InnerGridRow3>
                                    <FormGroup>
                                        <FormLabel>출생년도 (예: 2023)</FormLabel>
                                        <FormInput
                                            name="birthYear"
                                            value={formData.birthYear}
                                            onChange={handleChange}
                                            required
                                        />  
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>성별</FormLabel>
                                        <FormSelect
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >  
                                            <option value="M">수컷 (M)</option>
                                            <option value="F">암컷 (F)</option>                                   
                                        </FormSelect>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>체중 (kg)</FormLabel>
                                        <FormInput
                                            type="number"
                                            step="0.1"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            required
                                        />  
                                    </FormGroup>
                                </InnerGridRow3>

                                <FormGroup>
                                    <FormLabel>동물 사진 URL</FormLabel>
                                    <FormInput
                                        type="url"
                                        name="imageUrl"
                                        placeholder="https://..."
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>

                                {formData.imageUrl && (
                                    <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                                        <img 
                                            src={formData.imageUrl} 
                                            alt="미리보기" 
                                            style={{ maxHeight: '200px', borderRadius: '8px', border: `1px solid ${coolGray[200]}` }} 
                                        />
                                    </div>
                                )}

                                <SubmitButton type="submit" disabled={isLoading}>
                                    {isLoading ? '등록 중...' : '최종 등록하기'}
                                </SubmitButton>
                            </form>
                        </div>
                    </AdminDataCard>
                </div>

                {/* 우측 안내 영역 */}
                <div>
                    <AdminDataCard>
                        <div className='card-header'>
                            등록 안내
                        </div>
                        <div className='card-body'>
                            <InfoText>
                                <strong>직접등록:</strong><br />
                                센터에서 보호중인 동물을 직접 등록합니다.
                            </InfoText>
                            <InfoText>
                                <strong>페이스북 / 인스타:</strong><br />
                                외부 SNS에서 화제가 된 입양 홍보글을 연동할 때 사용합니다. 추후 사용자 화면에서 해당 동물을 클릭하면 입력하신 SNS 주소로 이동하도록 개발할 수 있습니다.
                            </InfoText>
                        </div>
                    </AdminDataCard>
                </div>
            </GridWrap>
        </Layout>
    );
}