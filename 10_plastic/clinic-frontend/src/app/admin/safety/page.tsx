"use client";
import React, { useState } from "react";
import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

// 안전마취 데이터 인터페이스
interface SafetyData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export default function Safety() {
    // 🎯 상태 관리: 등록된 안전마취 장비/시스템 목록
    const [safetyList, setSafetyList] = useState<SafetyData[]>([
        { 
            id: 1, 
            title: "EtCO2 모니터링", 
            description: "마취통증의학과 전문의가 수술 전부터 수술 후 의식을 회복할 때까지 환자의 호흡과 맥박 등 상태 체크", 
            imageUrl: "" 
        },
        { 
            id: 2, 
            title: "악성 고열증 대비 특수치료제", 
            description: "단트롤렌 보유로 마취통증의학과 전문의의 신속한 치료가 가능하게 합니다.", 
            imageUrl: "" 
        }
    ]);

    // 🎯 상태 관리: 새 아이템 등록 폼
    const [newSafety, setNewSafety] = useState({ title: "", description: "" });
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // 🎯 팝업 상태 관리 (저장, 경고, 삭제)
    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
    const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

    // ----------------------------------------------------
    // 0. 이미지 첨부 및 썸네일 미리보기 기능
    // ----------------------------------------------------
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    // ----------------------------------------------------
    // 1. 안전마취 항목 추가 기능
    // ----------------------------------------------------
    const handleAddSafety = () => {
        // [검증] 빈칸이 하나라도 있으면 경고 팝업 띄우기
        if (!newSafety.title || !newSafety.description || !previewUrl) {
            setIsAlertPopupOpen(true); 
            return;
        }

        // [추가] 기존 목록 끝에 새로운 데이터 추가하기
        setSafetyList([
            ...safetyList, 
            { 
                id: Date.now(), 
                title: newSafety.title, 
                description: newSafety.description, 
                imageUrl: previewUrl 
            } 
        ]);

        // [초기화] 입력 폼 비우기
        setNewSafety({ title: "", description: "" }); 
        setFileName(""); 
        setPreviewUrl(""); 
    };

    // ----------------------------------------------------
    // 2. 항목 삭제 기능 (팝업 띄우기 및 실제 삭제)
    // ----------------------------------------------------
    const handleDeleteClick = (id: number) => { 
        setSelectedDeleteId(id); 
        setIsDeletePopupOpen(true); 
    };

    const confirmDelete = () => {
        if (selectedDeleteId !== null) {
            setSafetyList(safetyList.filter(item => item.id !== selectedDeleteId)); 
        }
        setIsDeletePopupOpen(false); 
        setSelectedDeleteId(null); 
    };

    // ----------------------------------------------------
    // 3. 노출 순서 변경 기능 (화살표 클릭)
    // ----------------------------------------------------
    const moveSafety = (index: number, direction: 'UP' | 'DOWN') => {
        const newList = [...safetyList]; 
        
        if (direction === 'UP' && index > 0) {
            [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
        } 
        else if (direction === 'DOWN' && index < newList.length - 1) {
            [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
        }
        
        setSafetyList(newList); 
    };

    // ----------------------------------------------------
    // 4. 최종 저장 기능
    // ----------------------------------------------------
    const handleSave = () => {
        console.log("DB에 저장될 안전마취 데이터:", safetyList);
        setIsSavePopupOpen(true); 
    };

    return (
        <>
            <Layout>
                <S.AdminSafetyContainer>
                    <S.AdminSafetyPageHeader>
                        <S.AdminSafetyPageTitle>안전 시스템 관리</S.AdminSafetyPageTitle>
                        <S.AdminSafetySaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.AdminSafetySaveButton>
                    </S.AdminSafetyPageHeader>

                    <S.AdminSafetyGrid>
                        {/* ⚙️ 1. 새 안전시스템 등록 폼 (좌측) */}
                        <S.AdminSafetyLeftColumn>
                            <S.AdminSafetyCard>
                                <S.AdminSafetyCardHeader>
                                    <S.AdminSafetyCardTitle>새 장비/시스템 등록</S.AdminSafetyCardTitle>
                                </S.AdminSafetyCardHeader>
                                <S.AdminSafetyCardBody>
                                    <S.AdminSafetyFormGroup>
                                        <S.AdminSafetyLabel>배경 이미지 (정방형 비율 권장)</S.AdminSafetyLabel>
                                        <S.AdminSafetyFileInputWrapper>
                                            <S.AdminSafetyFileInput 
                                                type="file" 
                                                id="safety-img" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <S.AdminSafetyFileLabel htmlFor="safety-img"><FiImage /> 이미지 선택</S.AdminSafetyFileLabel>
                                            <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                        </S.AdminSafetyFileInputWrapper>
                                        
                                        {previewUrl && (
                                            <S.AdminSafetyPreviewRect>
                                                <img src={previewUrl} alt="미리보기" />
                                            </S.AdminSafetyPreviewRect>
                                        )}
                                    </S.AdminSafetyFormGroup>

                                    <S.AdminSafetyFormGroup>
                                        <S.AdminSafetyLabel>타이틀 (예: EtCO2 모니터링)</S.AdminSafetyLabel>
                                        <S.AdminSafetyInput 
                                            type="text" 
                                            placeholder="장비 및 시스템 명칭 입력"
                                            value={newSafety.title}
                                            onChange={(e) => setNewSafety({...newSafety, title: e.target.value})}
                                        />
                                    </S.AdminSafetyFormGroup>

                                    <S.AdminSafetyFormGroup>
                                        <S.AdminSafetyLabel>상세 설명 (카드 하단 노출)</S.AdminSafetyLabel>
                                        <S.AdminSafetyTextarea 
                                            placeholder="해당 시스템에 대한 상세 설명을 입력해주세요."
                                            value={newSafety.description}
                                            onChange={(e) => setNewSafety({...newSafety, description: e.target.value})}
                                            rows={3}
                                        />
                                    </S.AdminSafetyFormGroup>

                                    <S.AdminSafetyAddButton onClick={handleAddSafety}>
                                        <FiPlus size={18} /> 리스트에 추가
                                    </S.AdminSafetyAddButton>
                                </S.AdminSafetyCardBody>
                            </S.AdminSafetyCard>
                        </S.AdminSafetyLeftColumn>

                        {/* 📋 2. 등록된 시스템 리스트 (우측) */}
                        <S.AdminSafetyRightColumn>
                            <S.AdminSafetyCard style={{ height: '100%' }}>
                                <S.AdminSafetyCardHeader>
                                    <S.AdminSafetyCardTitle>현재 노출 순서 (총 {safetyList.length}개)</S.AdminSafetyCardTitle>
                                </S.AdminSafetyCardHeader>
                                <S.AdminSafetyTableWrapper>
                                    <S.AdminSafetyTable>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '15%' }}>순위/이동</th>
                                                <th style={{ width: '20%' }}>이미지</th>
                                                <th style={{ width: '50%' }}>타이틀 및 설명</th>
                                                <th style={{ width: '15%' }}>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {safetyList.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                                            <S.AdminSafetyRankBadge>{index + 1}</S.AdminSafetyRankBadge>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                                <S.AdminSafetyActionBtn onClick={() => moveSafety(index, 'UP')} disabled={index === 0}>
                                                                    <FiArrowUp size={14} />
                                                                </S.AdminSafetyActionBtn>
                                                                <S.AdminSafetyActionBtn onClick={() => moveSafety(index, 'DOWN')} disabled={index === safetyList.length - 1}>
                                                                    <FiArrowDown size={14} />
                                                                </S.AdminSafetyActionBtn>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.AdminSafetyThumbnail>
                                                            {item.imageUrl ? <img src={item.imageUrl} alt={item.title} /> : <span>No Img</span>}
                                                        </S.AdminSafetyThumbnail>
                                                    </td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '1.05rem' }}>{item.title}</strong>
                                                        <div style={{ fontSize: '0.85rem', color: '#858796', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                            {item.description}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.AdminSafetyDeleteBtn onClick={() => handleDeleteClick(item.id)}>
                                                            <FiTrash2 size={16} />
                                                        </S.AdminSafetyDeleteBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                            {safetyList.length === 0 && (
                                                <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 안전 시스템이 없습니다.</td></tr>
                                            )}
                                        </tbody>
                                    </S.AdminSafetyTable>
                                </S.AdminSafetyTableWrapper>
                            </S.AdminSafetyCard>
                        </S.AdminSafetyRightColumn>
                    </S.AdminSafetyGrid>
                </S.AdminSafetyContainer>
            </Layout>

            {/* ✅ 팝업 모음 */}
            <Popup 
                isOpen={isSavePopupOpen} 
                title="저장 완료" 
                onClose={() => setIsSavePopupOpen(false)}
                onConfirm={() => setIsSavePopupOpen(false)}
            >
                안전 시스템 설정이 성공적으로 저장되었습니다.
            </Popup>

            <Popup 
                isOpen={isAlertPopupOpen} 
                title="입력 오류" 
                onClose={() => setIsAlertPopupOpen(false)}
                onConfirm={() => setIsAlertPopupOpen(false)}
            >
                이미지, 타이틀, 상세 설명을 모두 입력해주세요.
            </Popup>

            <Popup 
                isOpen={isDeletePopupOpen} 
                title="삭제 확인" 
                onClose={() => {
                    setIsDeletePopupOpen(false);
                    setSelectedDeleteId(null);
                }}
                onConfirm={confirmDelete}
            >
                해당 시스템을 리스트에서 삭제하시겠습니까?
            </Popup>
        </>
    );
}