"use client";
import React, { useState } from "react";
import { Layout } from "../Layout";
import * as S from "@/assets/css/Style.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiHeart, FiEye } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

interface SelfieData {
    id: number;
    imageUrl: string;
    likes: number;
    views: number;
    isActive: boolean;
}

export default function Self() {
    // 🎯 상태 관리: 등록된 셀피 목록
    const [selfies, setSelfies] = useState<SelfieData[]>([
        { id: 1, imageUrl: "", likes: 892, views: 7921, isActive: true },
        { id: 2, imageUrl: "", likes: 530, views: 4200, isActive: true }
    ]);

    // 🎯 상태 관리: 새 셀피 등록 폼
    const [newSelfie, setNewSelfie] = useState({ likes: 0, views: 0 });
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);

    // 이미지 첨부 및 썸네일 미리보기 처리
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    // 셀피 추가
    const handleAddSelfie = () => {
        if (!previewUrl) {
            alert("셀피 이미지를 등록해주세요.");
            return;
        }
        setSelfies([...selfies, { 
            id: Date.now(), 
            imageUrl: previewUrl, 
            likes: newSelfie.likes,
            views: newSelfie.views,
            isActive: true 
        }]);
        setNewSelfie({ likes: 0, views: 0 });
        setFileName("");
        setPreviewUrl("");
    };

    // 셀피 삭제
    const handleDelete = (id: number) => {
        if (confirm("해당 셀피 게시물을 삭제하시겠습니까?")) {
            setSelfies(selfies.filter(s => s.id !== id));
        }
    };

    // 노출 상태 변경 토글
    const toggleStatus = (id: number) => {
        setSelfies(selfies.map(s => 
            s.id === id ? { ...s, isActive: !s.isActive } : s
        ));
    };

    // 최종 저장
    const handleSave = () => {
        console.log("DB에 저장될 데이터:", selfies);
        setIsSavePopupOpen(true);
    };

    return (
        <>
            <Layout>
                <S.SelfContainer>
                    <S.SelfPageHeader>
                        <S.SelfPageTitle>셀피(Selfies) 관리</S.SelfPageTitle>
                        <S.SelfSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.SelfSaveButton>
                    </S.SelfPageHeader>

                    <S.SelfGrid>
                        {/* ⚙️ 1. 새 셀피 등록 폼 */}
                        <S.SelfLeftColumn>
                            <S.SelfCard>
                                <S.SelfCardHeader>
                                    <S.SelfCardTitle>새 셀피 이미지 등록</S.SelfCardTitle>
                                </S.SelfCardHeader>
                                <S.SelfCardBody>
                                    <S.SelfFormGroup>
                                        <S.SelfLabel>세로형 이미지 (권장 비율 3:4)</S.SelfLabel>
                                        <S.SelfFileInputWrapper>
                                            <S.SelfFileInput 
                                                type="file" 
                                                id="selfie-img" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <S.SelfFileLabel htmlFor="selfie-img"><FiImage /> 이미지 선택</S.SelfFileLabel>
                                            <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                        </S.SelfFileInputWrapper>
                                        
                                        {previewUrl && (
                                            <S.SelfPreviewRect>
                                                <img src={previewUrl} alt="미리보기" />
                                            </S.SelfPreviewRect>
                                        )}
                                    </S.SelfFormGroup>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <S.SelfFormGroup style={{ flex: 1 }}>
                                            <S.SelfLabel><FiHeart color="#e74a3b" /> 초기 좋아요 수 (선택)</S.SelfLabel>
                                            <S.SelfInput 
                                                type="number" 
                                                min={0}
                                                value={newSelfie.likes}
                                                onChange={(e) => setNewSelfie({...newSelfie, likes: Number(e.target.value)})}
                                            />
                                        </S.SelfFormGroup>

                                        <S.SelfFormGroup style={{ flex: 1 }}>
                                            <S.SelfLabel><FiEye color="#4e73df" /> 초기 조회수 (선택)</S.SelfLabel>
                                            <S.SelfInput 
                                                type="number" 
                                                min={0}
                                                value={newSelfie.views}
                                                onChange={(e) => setNewSelfie({...newSelfie, views: Number(e.target.value)})}
                                            />
                                        </S.SelfFormGroup>
                                    </div>

                                    <S.SelfAddButton onClick={handleAddSelfie}>
                                        <FiPlus size={18} /> 리스트에 추가하기
                                    </S.SelfAddButton>
                                </S.SelfCardBody>
                            </S.SelfCard>
                        </S.SelfLeftColumn>

                        {/* 📋 2. 등록된 셀피 리스트 */}
                        <S.SelfRightColumn>
                            <S.SelfCard style={{ height: '100%' }}>
                                <S.SelfCardHeader>
                                    <S.SelfCardTitle>등록된 셀피 목록 (총 {selfies.length}개)</S.SelfCardTitle>
                                </S.SelfCardHeader>
                                <S.SelfTableWrapper>
                                    <S.SelfTable>
                                        <thead>
                                            <tr>
                                                <th>미리보기</th>
                                                <th>반응 지표</th>
                                                <th>상태</th>
                                                <th>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selfies.map((selfie) => (
                                                <tr key={selfie.id}>
                                                    <td>
                                                        <S.SelfThumbnail>
                                                            {selfie.imageUrl ? <img src={selfie.imageUrl} alt="셀피" /> : <span>No Img</span>}
                                                        </S.SelfThumbnail>
                                                    </td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                                                            <FiHeart color="#e74a3b" /> <strong>{selfie.likes.toLocaleString()}</strong>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#858796', fontSize: '0.85rem' }}>
                                                            <FiEye /> {selfie.views.toLocaleString()}명이 보고 있어요
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.SelfStatusBadge 
                                                            $isActive={selfie.isActive}
                                                            onClick={() => toggleStatus(selfie.id)}
                                                        >
                                                            {selfie.isActive ? "노출중" : "숨김"}
                                                        </S.SelfStatusBadge>
                                                    </td>
                                                    <td>
                                                        <S.SelfDeleteBtn onClick={() => handleDelete(selfie.id)}>
                                                            <FiTrash2 size={16} />
                                                        </S.SelfDeleteBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                            {selfies.length === 0 && (
                                                <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 셀피가 없습니다.</td></tr>
                                            )}
                                        </tbody>
                                    </S.SelfTable>
                                </S.SelfTableWrapper>
                            </S.SelfCard>
                        </S.SelfRightColumn>
                    </S.SelfGrid>
                </S.SelfContainer>
            </Layout>

            <Popup 
                isOpen={isSavePopupOpen} 
                title="저장 완료" 
                onClose={() => setIsSavePopupOpen(false)}
                onConfirm={() => setIsSavePopupOpen(false)}
            >
                셀피 설정이 성공적으로 저장되었습니다.
            </Popup>
        </>
    );
}