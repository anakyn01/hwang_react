"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Layout } from "../Layout"; // 경로에 맞게 수정해주세요
import * as S from "@/assets/css/admin/Admin.style";
import { Popup } from "@/component/modal/Popup";
import { FiSave, FiPlus, FiTrash2, FiImage } from "react-icons/fi";

interface SlideItem {
    id: number;
    fileName: string;
    title: string;
    link: string;
    tempFile?: File | null; // DB에 저장하기 전 임시로 들고 있을 실제 파일 데이터
}

export default function Visual() {
    const [slides, setSlides] = useState<SlideItem[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 1. 화면 로드 시 기존 데이터 불러오기
    useEffect(() => {
        const fetchVisualSettings = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/visual");
                if (response.data.success) {
                    const dbData = response.data.data;
                    if (dbData.SLIDES && dbData.SLIDES !== "[]") {
                        setSlides(JSON.parse(dbData.SLIDES));
                    }
                }
            } catch (error) {
                console.error("비주얼 설정 로드 실패:", error);
            }
        };
        fetchVisualSettings();
    }, []);

    // 2. 슬라이드 추가 / 삭제 / 변경 핸들러
    const handleAddSlide = () => {
        const nextId = slides.length > 0 ? Math.max(...slides.map(s => s.id)) + 1 : 1;
        setSlides([...slides, { id: nextId, fileName: "", title: "", link: "", tempFile: null }]);
    };

    const handleRemoveSlide = (id: number) => {
        setSlides(slides.filter(slide => slide.id !== id));
    };

    const handleChange = (id: number, field: keyof SlideItem, value: any) => {
        setSlides(slides.map(slide => slide.id === id ? { ...slide, [field]: value } : slide));
    };

    // 3. 이미지 파일 선택 핸들러
    const handleFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSlides(slides.map(slide => 
                slide.id === id ? { ...slide, tempFile: file, fileName: file.name } : slide
            ));
        }
    };

    // 4. 저장 버튼 클릭 시 (각 파일 업로드 후 DB 저장)
    const handleSave = async () => {
        try {
            // [STEP 1] 새로 추가된 이미지가 있다면 백엔드로 하나씩 전송해서 진짜 파일명을 받아옴
            const updatedSlides = await Promise.all(slides.map(async (slide) => {
                if (slide.tempFile) {
                    const formData = new FormData();
                    // 💡 기존에 만들어둔 로고 업로드 API 필드명을 그대로 씁니다.
                    formData.append('logoImage', slide.tempFile); 
                    
                    const uploadRes = await axios.post("http://localhost:4000/api/admin/upload", formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    
                    if (uploadRes.data.success) {
                        // 업로드 성공 시 새 파일명을 적용하고, tempFile은 제거
                        return { ...slide, fileName: uploadRes.data.fileName, tempFile: null };
                    }
                }
                return slide;
            }));

            // [STEP 2] DB로 보낼 때는 tempFile 속성을 제외하고 깔끔하게 텍스트만 보냅니다.
            const payloadSlides = updatedSlides.map(({ tempFile, ...rest }) => rest);

            await axios.put("http://localhost:4000/api/admin/visual", { slides: payloadSlides });
            
            setSlides(updatedSlides); // 화면 상태도 최신으로 업데이트
            setIsPopupOpen(true);
            
        } catch (error) {
            console.error("캐러셀 저장 에러:", error);
            alert("저장에 실패했습니다.");
        }
    };

    return (
        <>
            <Layout>
                <S.SetNavContainer>
                    <S.SetNavPageHeader>
                        <S.SetNavPageTitle>메인 비주얼(캐러셀) 관리</S.SetNavPageTitle>
                        <S.SetNavSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.SetNavSaveButton>
                    </S.SetNavPageHeader>

                    <S.SetNavContentGrid>
                        <S.SetNavCard style={{ gridColumn: '1 / -1' }}> {/* 가로로 꽉 차게 */}
                            <S.SetNavCardHeader>
                                <S.SetNavCardTitle>슬라이드 이미지 목록</S.SetNavCardTitle>
                            </S.SetNavCardHeader>
                            <S.SetNavCardBody>
                                <p>홈페이지 메인 화면에 롤링될 이미지들을 등록하세요.</p>
                                
                                <S.SetNavMenuList>
                                    {slides.map((slide, index) => (
                                        <S.SetNavMenuItem key={slide.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px' }}>
                                            
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <strong>슬라이드 {index + 1}</strong>
                                                <S.SetNavDeleteButton onClick={() => handleRemoveSlide(slide.id)}>
                                                    <FiTrash2 size={18} /> 삭제
                                                </S.SetNavDeleteButton>
                                            </div>

                                            {/* 이미지 업로드 영역 */}
                                            <S.SetNavFileInputWrapper>
                                                <S.SetNavFileInput
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(slide.id, e)}
                                                    id={`slide-upload-${slide.id}`}
                                                />
                                                <S.SetNavFileLabel htmlFor={`slide-upload-${slide.id}`}>
                                                    <FiImage /> 이미지 찾기
                                                </S.SetNavFileLabel>
                                                <span className="file-name">{slide.fileName || "선택된 이미지가 없습니다"}</span>
                                            </S.SetNavFileInputWrapper>
                                            
                                            {/* 미리보기 (파일이 등록되어 있으면 표시) */}
                                            {slide.fileName && !slide.tempFile && (
                                                <img 
                                                    src={`http://localhost:4000/images/${slide.fileName}`} 
                                                    alt="미리보기" 
                                                    style={{ height: '80px', objectFit: 'cover', borderRadius: '4px', alignSelf: 'flex-start' }}
                                                />
                                            )}

                                            {/* 텍스트/링크 입력 영역 */}
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                                <S.SetNavInput
                                                    type="text"
                                                    placeholder="메인 문구 (예: 자연스러운 아름다움)"
                                                    value={slide.title || ""}
                                                    onChange={(e) => handleChange(slide.id, 'title', e.target.value)}
                                                />
                                                <S.SetNavInput
                                                    type="text"
                                                    placeholder="클릭 시 이동할 URL (예: /event)"
                                                    value={slide.link || ""}
                                                    onChange={(e) => handleChange(slide.id, 'link', e.target.value)}
                                                />
                                            </div>

                                        </S.SetNavMenuItem>
                                    ))}
                                </S.SetNavMenuList>

                                <S.SetNavAddButton onClick={handleAddSlide} style={{ marginTop: '20px' }}>
                                    <FiPlus size={18} /> 새 슬라이드 추가
                                </S.SetNavAddButton>
                            </S.SetNavCardBody>
                        </S.SetNavCard>
                    </S.SetNavContentGrid>
                </S.SetNavContainer>
            </Layout>

            <Popup
                isOpen={isPopupOpen}
                title="저장완료"
                onClose={() => setIsPopupOpen(false)}
                onConfirm={() => setIsPopupOpen(false)}
            >
                메인 비주얼 설정이 성공적으로 저장되었습니다.
            </Popup>
        </>
    );
}