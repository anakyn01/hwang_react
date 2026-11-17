"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

interface SafetyData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export default function Safety() {
    const [safetyList, setSafetyList] = useState<SafetyData[]>([]);
    const [newSafety, setNewSafety] = useState({ title: "", description: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
    const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

    // 💡 화면 렌더링 시 DB에서 데이터 불러오기
    useEffect(() => {
        fetchSafetyItems();
    }, []);

    const fetchSafetyItems = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin/safety");
            if (response.data.success) {
                const formatted = response.data.data.map((item: any) => ({
                    id: item.SAFETY_IDX,
                    title: item.TITLE,
                    description: item.DESCRIPTION,
                    imageUrl: `http://localhost:4000/images/${item.FILE_NAME}`
                }));
                setSafetyList(formatted);
            }
        } catch (error) {
            console.error("안전 시스템 데이터 로드 실패", error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    // 💡 새 아이템 서버로 등록
    const handleAddSafety = async () => {
        if (!newSafety.title || !newSafety.description || !selectedFile) {
            setIsAlertPopupOpen(true); 
            return;
        }

        const formData = new FormData();
        formData.append("safetyImg", selectedFile);
        formData.append("title", newSafety.title);
        formData.append("description", newSafety.description);

        try {
            const response = await axios.post("http://localhost:4000/api/admin/safety", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.success) {
                setNewSafety({ title: "", description: "" }); 
                setSelectedFile(null);
                setFileName(""); 
                setPreviewUrl(""); 
                fetchSafetyItems();
            }
        } catch (error) {
            alert("등록에 실패했습니다.");
        }
    };

    // 💡 아이템 삭제 처리
    const handleDeleteClick = (id: number) => { 
        setSelectedDeleteId(id); 
        setIsDeletePopupOpen(true); 
    };

    const confirmDelete = async () => {
        if (selectedDeleteId !== null) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/admin/safety/${selectedDeleteId}`);
                if (response.data.success) {
                    fetchSafetyItems();
                }
            } catch (error) {
                alert("삭제 중 문제가 발생했습니다.");
            }
        }
        setIsDeletePopupOpen(false); 
        setSelectedDeleteId(null); 
    };

    // 화면 상에서 순서 변경
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

    // 💡 바뀐 순서를 DB에 저장
    const handleSave = async () => {
        const orderedIds = safetyList.map(item => item.id);
        
        try {
            const response = await axios.put("http://localhost:4000/api/admin/safety/order", { orderedIds });
            if (response.data.success) {
                setIsSavePopupOpen(true); 
            }
        } catch (error) {
            alert("순서 저장 중 문제가 발생했습니다.");
        }
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
                                            <S.AdminSafetyPreviewRect style={{ marginTop: '1rem', width: '150px', height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src={previewUrl} alt="미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                                        <S.AdminSafetyThumbnail style={{ width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', margin: '0 auto' }}>
                                                            {item.imageUrl ? <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>No Img</span>}
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