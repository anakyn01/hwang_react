"use client";
import React, { useState } from "react";
import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp, FiArrowDown, FiVideo } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

// VLOG 데이터 인터페이스 (데이터의 생김새 정의)
interface VlogData {
    id: number;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
}

export default function Vlog() {
    // 🎯 상태 관리: 등록된 VLOG 목록
    const [vlogList, setVlogList] = useState<VlogData[]>([
        { id: 1, title: "답답했던 눈매·복코·얼굴살 완벽...", videoUrl: "https://youtube.com/...", thumbnailUrl: "" },
        { id: 2, title: "광대·사각턱·이중턱 싹 지우고...", videoUrl: "https://youtube.com/...", thumbnailUrl: "" }
    ]);

    // 🎯 상태 관리: 새 VLOG 등록 폼
    const [newVlog, setNewVlog] = useState({ title: "", videoUrl: "" });
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // 🎯 팝업 상태 관리 (저장, 경고, 삭제)
    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
    const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

    // ----------------------------------------------------
    // 0. 이미지 첨부 및 썸네일(16:9) 미리보기 기능
    // ----------------------------------------------------
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    // ----------------------------------------------------
    // 1. VLOG 추가 기능
    // ----------------------------------------------------
    const handleAddVlog = () => {
        // [검증] 빈칸이 하나라도 있으면 경고 팝업 띄우기
        if (!newVlog.title || !newVlog.videoUrl || !previewUrl) {
            setIsAlertPopupOpen(true); 
            return;
        }

        // [추가] 기존 목록 끝에 새로운 VLOG 데이터 추가하기
        setVlogList([
            ...vlogList, 
            { 
                id: Date.now(), 
                title: newVlog.title, 
                videoUrl: newVlog.videoUrl, 
                thumbnailUrl: previewUrl 
            } 
        ]);

        // [초기화] 입력 폼 비우기
        setNewVlog({ title: "", videoUrl: "" }); 
        setFileName(""); 
        setPreviewUrl(""); 
    };

    // ----------------------------------------------------
    // 2. VLOG 삭제 기능 (팝업 띄우기 및 실제 삭제)
    // ----------------------------------------------------
    // 삭제 버튼(휴지통) 클릭 시 호출
    const handleDeleteClick = (id: number) => { 
        setSelectedDeleteId(id); // 삭제할 ID 기억
        setIsDeletePopupOpen(true); // 삭제 확인 팝업 열기
    };

    // 팝업에서 '확인'을 눌렀을 때 실제 삭제 처리
    const confirmDelete = () => {
        if (selectedDeleteId !== null) {
            // 선택된 ID를 제외한 나머지들만 남겨서 갱신
            setVlogList(vlogList.filter(v => v.id !== selectedDeleteId)); 
        }
        setIsDeletePopupOpen(false); // 팝업 닫기
        setSelectedDeleteId(null); // 기억해둔 ID 초기화
    };

    // ----------------------------------------------------
    // 3. VLOG 노출 순서 변경 기능 (화살표 클릭)
    // ----------------------------------------------------
    const moveVlog = (index: number, direction: 'UP' | 'DOWN') => {
        const newVlogList = [...vlogList]; // 원본 복사
        
        // 위로 이동
        if (direction === 'UP' && index > 0) {
            [newVlogList[index - 1], newVlogList[index]] = [newVlogList[index], newVlogList[index - 1]];
        } 
        // 아래로 이동
        else if (direction === 'DOWN' && index < newVlogList.length - 1) {
            [newVlogList[index + 1], newVlogList[index]] = [newVlogList[index], newVlogList[index + 1]];
        }
        
        setVlogList(newVlogList); // 순서가 바뀐 새 배열로 갱신
    };

    // ----------------------------------------------------
    // 4. 최종 저장 기능
    // ----------------------------------------------------
    const handleSave = () => {
        console.log("DB에 저장될 VLOG 데이터:", vlogList);
        setIsSavePopupOpen(true); // 저장 완료 팝업 띄우기
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
                                        
                                        {/* 16:9 비율의 미리보기 영역 */}
                                        {previewUrl && (
                                            <S.AdminVlogPreviewRect>
                                                <img src={previewUrl} alt="썸네일 미리보기" />
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
                                                <th>순위/이동</th>
                                                <th>썸네일</th>
                                                <th>제목 및 링크</th>
                                                <th>관리</th>
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
                                                        <S.AdminVlogThumbnail>
                                                            {vlog.thumbnailUrl ? <img src={vlog.thumbnailUrl} alt={vlog.title} /> : <span>No Img</span>}
                                                        </S.AdminVlogThumbnail>
                                                    </td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        <strong>{vlog.title}</strong>
                                                        <div style={{ fontSize: '0.8rem', color: '#4e73df', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                            <FiVideo /> {vlog.videoUrl || "링크 없음"}
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

            {/* ✅ 1. 저장 완료 팝업 */}
            <Popup 
                isOpen={isSavePopupOpen} 
                title="저장 완료" 
                onClose={() => setIsSavePopupOpen(false)}
                onConfirm={() => setIsSavePopupOpen(false)}
            >
                VLOG 설정이 성공적으로 저장되었습니다.
            </Popup>

            {/* ✅ 2. 입력 오류 팝업 */}
            <Popup 
                isOpen={isAlertPopupOpen} 
                title="입력 오류" 
                onClose={() => setIsAlertPopupOpen(false)}
                onConfirm={() => setIsAlertPopupOpen(false)}
            >
                썸네일 이미지, 제목, 영상 링크를 모두 입력해주세요.
            </Popup>

            {/* ✅ 3. 삭제 확인 팝업 */}
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