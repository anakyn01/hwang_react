"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
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
    const [selfies, setSelfies] = useState<SelfieData[]>([]);
    const [newSelfie, setNewSelfie] = useState({ likes: 0, views: 0 });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);

    // 💡 화면 첫 렌더링 시 DB 데이터 로드
    useEffect(() => {
        fetchSelfies();
    }, []);

    const fetchSelfies = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin/selfies");
            if (response.data.success) {
                const formatted = response.data.data.map((s: any) => ({
                    id: s.SELFIE_IDX,
                    imageUrl: `http://localhost:4000/images/${s.FILE_NAME}`,
                    likes: s.LIKES,
                    views: s.VIEWS,
                    isActive: s.IS_ACTIVE === 'Y'
                }));
                setSelfies(formatted);
            }
        } catch (error) {
            console.error("셀피 목록 로드 실패:", error);
        }
    };

    // 이미지 첨부 및 미리보기
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    // 💡 새 셀피 서버로 등록
    const handleAddSelfie = async () => {
        if (!selectedFile) {
            alert("셀피 이미지를 등록해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("selfieImg", selectedFile);
        formData.append("likes", String(newSelfie.likes));
        formData.append("views", String(newSelfie.views));

        try {
            const response = await axios.post("http://localhost:4000/api/admin/selfies", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data.success) {
                setNewSelfie({ likes: 0, views: 0 });
                setSelectedFile(null);
                setFileName("");
                setPreviewUrl("");
                fetchSelfies(); // 등록 후 목록 새로고침
            }
        } catch (error) {
            alert("셀피 등록에 실패했습니다.");
        }
    };

    // 💡 셀피 삭제 (DB에서 영구 삭제)
    const handleDelete = async (id: number) => {
        if (confirm("해당 셀피 게시물을 삭제하시겠습니까?")) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/admin/selfies/${id}`);
                if (response.data.success) {
                    fetchSelfies();
                }
            } catch (error) {
                alert("삭제 실패");
            }
        }
    };

    // 노출 상태 변경 (화면에서만 임시 변경)
    const toggleStatus = (id: number) => {
        setSelfies(selfies.map(s => 
            s.id === id ? { ...s, isActive: !s.isActive } : s
        ));
    };

    // 💡 상태(노출/숨김) 변경 내역을 DB에 최종 저장
    const handleSave = async () => {
        const statuses = selfies.map(s => ({ id: s.id, isActive: s.isActive }));
        
        try {
            const response = await axios.put("http://localhost:4000/api/admin/selfies/status", { statuses });
            if (response.data.success) {
                setIsSavePopupOpen(true);
            }
        } catch (error) {
            alert("상태 저장 실패");
        }
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
                                            <S.SelfPreviewRect style={{ marginTop: '1rem', width: '120px', height: '160px', borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src={previewUrl} alt="미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                                        <S.SelfThumbnail style={{ width: '60px', height: '80px', borderRadius: '4px', overflow: 'hidden', margin: '0 auto' }}>
                                                            {selfie.imageUrl ? <img src={selfie.imageUrl} alt="셀피" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>No Img</span>}
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
                                                            style={{ cursor: 'pointer' }}
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