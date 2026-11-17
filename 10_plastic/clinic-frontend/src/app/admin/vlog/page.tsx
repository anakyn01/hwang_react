"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp, FiArrowDown, FiVideo } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

interface VlogData {
    id: number;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
}

export default function Vlog() {
    const [vlogList, setVlogList] = useState<VlogData[]>([]);
    
    // 🎯 상태 관리: 새 VLOG 등록 폼
    const [newVlog, setNewVlog] = useState({ title: "", videoUrl: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // 💡 서버 전송용
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
    const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

    // 💡 화면 첫 렌더링 시 DB에서 데이터 불러오기
    useEffect(() => {
        fetchVlogs();
    }, []);

    const fetchVlogs = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin/vlogs");
            if (response.data.success) {
                const formatted = response.data.data.map((item: any) => ({
                    id: item.VLOG_IDX,
                    title: item.TITLE,
                    videoUrl: item.VIDEO_URL,
                    thumbnailUrl: `http://localhost:4000/images/${item.FILE_NAME}`
                }));
                setVlogList(formatted);
            }
        } catch (error) {
            console.error("VLOG 데이터 로드 실패:", error);
        }
    };

    // 0. 이미지 첨부 및 썸네일 미리보기
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file); // 실제 전송할 파일
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    // 1. VLOG 추가 기능 (서버로 전송)
    const handleAddVlog = async () => {
        if (!newVlog.title || !newVlog.videoUrl || !selectedFile) {
            setIsAlertPopupOpen(true); 
            return;
        }

        const formData = new FormData();
        formData.append("vlogImg", selectedFile);
        formData.append("title", newVlog.title);
        formData.append("videoUrl", newVlog.videoUrl);

        try {
            const response = await axios.post("http://localhost:4000/api/admin/vlogs", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data.success) {
                setNewVlog({ title: "", videoUrl: "" }); 
                setSelectedFile(null);
                setFileName(""); 
                setPreviewUrl(""); 
                fetchVlogs(); // 등록 후 목록 새로고침
            }
        } catch (error) {
            alert("VLOG 등록에 실패했습니다.");
        }
    };

    // 2. VLOG 삭제 기능
    const handleDeleteClick = (id: number) => { 
        setSelectedDeleteId(id); 
        setIsDeletePopupOpen(true); 
    };

    const confirmDelete = async () => {
        if (selectedDeleteId !== null) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/admin/vlogs/${selectedDeleteId}`);
                if (response.data.success) {
                    fetchVlogs();
                }
            } catch (error) {
                alert("삭제 중 문제가 발생했습니다.");
            }
        }
        setIsDeletePopupOpen(false); 
        setSelectedDeleteId(null); 
    };

    // 3. VLOG 노출 순서 변경
    const moveVlog = (index: number, direction: 'UP' | 'DOWN') => {
        const newVlogList = [...vlogList]; 
        if (direction === 'UP' && index > 0) {
            [newVlogList[index - 1], newVlogList[index]] = [newVlogList[index], newVlogList[index - 1]];
        } else if (direction === 'DOWN' && index < newVlogList.length - 1) {
            [newVlogList[index + 1], newVlogList[index]] = [newVlogList[index], newVlogList[index + 1]];
        }
        setVlogList(newVlogList); 
    };

    // 4. 최종 순서 저장
    const handleSave = async () => {
        const orderedIds = vlogList.map(v => v.id);
        try {
            const response = await axios.put("http://localhost:4000/api/admin/vlogs/order", { orderedIds });
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
                <S.VlogContainer>
                    <S.AdminVlogPageHeader>
                        <S.AdminVlogPageTitle>VLOG 영상 관리</S.AdminVlogPageTitle>
                        <S.AdminVlogSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.AdminVlogSaveButton>
                    </S.AdminVlogPageHeader>

                    <S.AdminVlogGrid>
                        {/* ⚙️ 1. 새 VLOG 등록 폼 (좌측) */}
                        <S.AdminVlogLeftColumn>
                            <S.AdminVlogCard>
                                <S.AdminVlogCardHeader>
                                    <S.AdminVlogCardTitle>새 영상 등록</S.AdminVlogCardTitle>
                                </S.AdminVlogCardHeader>
                                <S.AdminVlogCardBody>
                                    <S.AdminVlogFormGroup>
                                        <S.AdminVlogLabel>영상 썸네일 이미지 (권장 비율 16:9)</S.AdminVlogLabel>
                                        <S.AdminVlogFileInputWrapper>
                                            <S.AdminVlogFileInput 
                                                type="file" 
                                                id="vlog-img" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <S.AdminVlogFileLabel htmlFor="vlog-img"><FiImage /> 이미지 선택</S.AdminVlogFileLabel>
                                            <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                        </S.AdminVlogFileInputWrapper>
                                        
                                        {previewUrl && (
                                            <S.AdminVlogPreviewRect style={{ marginTop: '1rem', width: '200px', height: '112px', borderRadius: '8px', overflow: 'hidden' }}>
                                                <img src={previewUrl} alt="썸네일 미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </S.AdminVlogPreviewRect>
                                        )}
                                    </S.AdminVlogFormGroup>

                                    <S.AdminVlogFormGroup>
                                        <S.AdminVlogLabel>영상 제목 (노출될 텍스트)</S.AdminVlogLabel>
                                        <S.AdminVlogInput 
                                            type="text" 
                                            placeholder="예: 광대·사각턱·이중턱 싹 지우고 온 후기"
                                            value={newVlog.title}
                                            onChange={(e) => setNewVlog({...newVlog, title: e.target.value})}
                                        />
                                    </S.AdminVlogFormGroup>

                                    <S.AdminVlogFormGroup>
                                        <S.AdminVlogLabel>영상 링크 (유튜브 URL 등)</S.AdminVlogLabel>
                                        <S.AdminVlogInput 
                                            type="text" 
                                            placeholder="예: https://youtube.com/watch?v=..."
                                            value={newVlog.videoUrl}
                                            onChange={(e) => setNewVlog({...newVlog, videoUrl: e.target.value})}
                                        />
                                    </S.AdminVlogFormGroup>

                                    <S.AdminVlogAddButton onClick={handleAddVlog}>
                                        <FiPlus size={18} /> 리스트에 추가
                                    </S.AdminVlogAddButton>
                                </S.AdminVlogCardBody>
                            </S.AdminVlogCard>
                        </S.AdminVlogLeftColumn>

                        {/* 📋 2. 등록된 VLOG 리스트 (우측) */}
                        <S.AdminVlogRightColumn>
                            <S.AdminVlogCard style={{ height: '100%' }}>
                                <S.AdminVlogCardHeader>
                                    <S.AdminVlogCardTitle>현재 노출 순서 (총 {vlogList.length}개)</S.AdminVlogCardTitle>
                                </S.AdminVlogCardHeader>
                                <S.AdminVlogTableWrapper>
                                    <S.AdminVlogTable>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '15%' }}>순위/이동</th>
                                                <th style={{ width: '25%' }}>썸네일</th>
                                                <th style={{ width: '45%' }}>제목 및 링크</th>
                                                <th style={{ width: '15%' }}>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vlogList.map((vlog, index) => (
                                                <tr key={vlog.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                                            <S.AdminVlogRankBadge>{index + 1}</S.AdminVlogRankBadge>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                                <S.AdminVlogActionBtn onClick={() => moveVlog(index, 'UP')} disabled={index === 0}>
                                                                    <FiArrowUp size={14} />
                                                                </S.AdminVlogActionBtn>
                                                                <S.AdminVlogActionBtn onClick={() => moveVlog(index, 'DOWN')} disabled={index === vlogList.length - 1}>
                                                                    <FiArrowDown size={14} />
                                                                </S.AdminVlogActionBtn>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.AdminVlogThumbnail style={{ width: '120px', height: '67.5px', borderRadius: '6px', overflow: 'hidden', margin: '0 auto' }}>
                                                            {vlog.thumbnailUrl ? <img src={vlog.thumbnailUrl} alt={vlog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>No Img</span>}
                                                        </S.AdminVlogThumbnail>
                                                    </td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        <strong style={{ fontSize: '0.95rem' }}>{vlog.title}</strong>
                                                        <div style={{ fontSize: '0.8rem', color: '#4e73df', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <FiVideo /> <a href={vlog.videoUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{vlog.videoUrl || "링크 없음"}</a>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.AdminVlogDeleteBtn onClick={() => handleDeleteClick(vlog.id)}>
                                                            <FiTrash2 size={16} />
                                                        </S.AdminVlogDeleteBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                            {vlogList.length === 0 && (
                                                <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 영상이 없습니다.</td></tr>
                                            )}
                                        </tbody>
                                    </S.AdminVlogTable>
                                </S.AdminVlogTableWrapper>
                            </S.AdminVlogCard>
                        </S.AdminVlogRightColumn>
                    </S.AdminVlogGrid>
                </S.VlogContainer>
            </Layout>

            <Popup 
                isOpen={isSavePopupOpen} 
                title="저장 완료" 
                onClose={() => setIsSavePopupOpen(false)}
                onConfirm={() => setIsSavePopupOpen(false)}
            >
                VLOG 설정이 성공적으로 저장되었습니다.
            </Popup>
            <Popup 
                isOpen={isAlertPopupOpen} 
                title="입력 오류" 
                onClose={() => setIsAlertPopupOpen(false)}
                onConfirm={() => setIsAlertPopupOpen(false)}
            >
                썸네일 이미지, 제목, 영상 링크를 모두 입력해주세요.
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
                해당 영상을 노출 리스트에서 삭제하시겠습니까?
            </Popup>
        </>
    );
}