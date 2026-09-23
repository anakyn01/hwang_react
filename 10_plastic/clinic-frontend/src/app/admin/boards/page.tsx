"use client";
import React, { useState } from "react";
import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
import { FiSave, FiPlus, FiTrash2, FiSettings, FiList } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

// 게시판 데이터 인터페이스
interface BoardData {
    id: number;
    name: string;
    type: string;
    readAuth: string;
    writeAuth: string;
    regDate: string;
}

export default function Board() {
    // 🎯 상태 관리: 등록된 게시판 목록
    const [boardList, setBoardList] = useState<BoardData[]>([
        { id: 1, name: "공지사항", type: "일반게시판", readAuth: "전체", writeAuth: "관리자", regDate: "2026-09-01" },
        { id: 2, name: "전후사진 갤러리", type: "갤러리형", readAuth: "전체", writeAuth: "관리자", regDate: "2026-09-05" },
        { id: 3, name: "고객 리얼후기", type: "일반게시판", readAuth: "회원", writeAuth: "회원", regDate: "2026-09-10" },
        { id: 4, name: "자주 묻는 질문", type: "FAQ형", readAuth: "전체", writeAuth: "관리자", regDate: "2026-09-15" }
    ]);

    // 🎯 상태 관리: 새 게시판 생성 폼
    const [newBoard, setNewBoard] = useState({
        name: "",
        type: "일반게시판",
        readAuth: "전체",
        writeAuth: "관리자"
    });

    // 🎯 상태 관리: 팝업창
    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
    const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
    
    // 삭제 팝업 상태 및 선택된 ID
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

    // ----------------------------------------------------
    // 1. 새 게시판 추가 기능
    // ----------------------------------------------------
    const handleAddBoard = () => {
        if (!newBoard.name) {
            setIsAlertPopupOpen(true); // 게시판 이름이 비어있으면 경고 팝업
            return;
        }

        const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 구하기 (YYYY-MM-DD)

        setBoardList([
            ...boardList,
            {
                id: Date.now(),
                name: newBoard.name,
                type: newBoard.type,
                readAuth: newBoard.readAuth,
                writeAuth: newBoard.writeAuth,
                regDate: today
            }
        ]);

        // 입력 폼 초기화
        setNewBoard({ name: "", type: "일반게시판", readAuth: "전체", writeAuth: "관리자" });
    };

    // ----------------------------------------------------
    // 2. 게시판 삭제 기능 (팝업 열기 & 확인 후 삭제)
    // ----------------------------------------------------
    const handleDeleteClick = (id: number) => {
        setSelectedDeleteId(id);
        setIsDeletePopupOpen(true);
    };

    const confirmDelete = () => {
        if (selectedDeleteId !== null) {
            setBoardList(boardList.filter(b => b.id !== selectedDeleteId));
        }
        setIsDeletePopupOpen(false);
        setSelectedDeleteId(null);
    };

    // ----------------------------------------------------
    // 3. 최종 저장 기능
    // ----------------------------------------------------
    const handleSave = () => {
        console.log("DB에 저장될 게시판 목록:", boardList);
        setIsSavePopupOpen(true);
    };

    return (
        <>
            <Layout>
                <S.BoardContainer>
                    <S.BoardPageHeader>
                        <S.BoardPageTitle>게시판 관리</S.BoardPageTitle>
                        <S.BoardSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.BoardSaveButton>
                    </S.BoardPageHeader>

                    <S.BoardGrid>
                        {/* ⚙️ 1. 새 게시판 생성 폼 (좌측) */}
                        <S.BoardLeftColumn>
                            <S.BoardCard>
                                <S.BoardCardHeader>
                                    <S.BoardCardTitle>새 게시판 생성</S.BoardCardTitle>
                                </S.BoardCardHeader>
                                <S.BoardCardBody>
                                    <S.BoardFormGroup>
                                        <S.BoardLabel>게시판 이름</S.BoardLabel>
                                        <S.BoardInput 
                                            type="text" 
                                            placeholder="예: 공지사항, 리얼후기"
                                            value={newBoard.name}
                                            onChange={(e) => setNewBoard({...newBoard, name: e.target.value})}
                                        />
                                    </S.BoardFormGroup>

                                    <S.BoardFormGroup>
                                        <S.BoardLabel>게시판 스킨 (타입)</S.BoardLabel>
                                        <S.BoardSelect 
                                            value={newBoard.type}
                                            onChange={(e) => setNewBoard({...newBoard, type: e.target.value})}
                                        >
                                            <option value="일반게시판">일반 게시판 (리스트형)</option>
                                            <option value="갤러리형">갤러리형 (썸네일 위주)</option>
                                            <option value="FAQ형">FAQ형 (아코디언)</option>
                                        </S.BoardSelect>
                                    </S.BoardFormGroup>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <S.BoardFormGroup style={{ flex: 1 }}>
                                            <S.BoardLabel>읽기 권한</S.BoardLabel>
                                            <S.BoardSelect 
                                                value={newBoard.readAuth}
                                                onChange={(e) => setNewBoard({...newBoard, readAuth: e.target.value})}
                                            >
                                                <option value="전체">전체 (비회원 포함)</option>
                                                <option value="회원">회원 전용</option>
                                                <option value="관리자">관리자 전용</option>
                                            </S.BoardSelect>
                                        </S.BoardFormGroup>

                                        <S.BoardFormGroup style={{ flex: 1 }}>
                                            <S.BoardLabel>쓰기 권한</S.BoardLabel>
                                            <S.BoardSelect 
                                                value={newBoard.writeAuth}
                                                onChange={(e) => setNewBoard({...newBoard, writeAuth: e.target.value})}
                                            >
                                                <option value="전체">전체 (비회원 포함)</option>
                                                <option value="회원">회원 전용</option>
                                                <option value="관리자">관리자 전용</option>
                                            </S.BoardSelect>
                                        </S.BoardFormGroup>
                                    </div>

                                    <S.BoardAddButton onClick={handleAddBoard}>
                                        <FiPlus size={18} /> 게시판 생성하기
                                    </S.BoardAddButton>
                                </S.BoardCardBody>
                            </S.BoardCard>
                        </S.BoardLeftColumn>

                        {/* 📋 2. 등록된 게시판 목록 (우측) */}
                        <S.BoardRightColumn>
                            <S.BoardCard style={{ height: '100%' }}>
                                <S.BoardCardHeader>
                                    <S.BoardCardTitle>운영 중인 게시판 목록 (총 {boardList.length}개)</S.BoardCardTitle>
                                </S.BoardCardHeader>
                                <S.BoardTableWrapper>
                                    <S.BoardTable>
                                        <thead>
                                            <tr>
                                                <th>게시판명</th>
                                                <th>스킨/타입</th>
                                                <th>권한 (읽기/쓰기)</th>
                                                <th>생성일</th>
                                                <th>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {boardList.map((board) => (
                                                <tr key={board.id}>
                                                    <td style={{ textAlign: 'left' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <FiList color="#b7b9cc" />
                                                            <strong>{board.name}</strong>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.BoardTypeBadge $type={board.type}>
                                                            {board.type}
                                                        </S.BoardTypeBadge>
                                                    </td>
                                                    <td>
                                                        <div style={{ fontSize: '0.85rem', color: '#5a5c69' }}>
                                                            읽기: <strong>{board.readAuth}</strong> <br/>
                                                            쓰기: <strong>{board.writeAuth}</strong>
                                                        </div>
                                                    </td>
                                                    <td style={{ fontSize: '0.85rem', color: '#858796' }}>
                                                        {board.regDate}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                                            <S.BoardActionBtn title="게시판 설정">
                                                                <FiSettings size={15} />
                                                            </S.BoardActionBtn>
                                                            <S.BoardDeleteBtn title="삭제" onClick={() => handleDeleteClick(board.id)}>
                                                                <FiTrash2 size={15} />
                                                            </S.BoardDeleteBtn>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {boardList.length === 0 && (
                                                <tr><td colSpan={5} style={{ padding: '3rem 0' }}>등록된 게시판이 없습니다.</td></tr>
                                            )}
                                        </tbody>
                                    </S.BoardTable>
                                </S.BoardTableWrapper>
                            </S.BoardCard>
                        </S.BoardRightColumn>
                    </S.BoardGrid>
                </S.BoardContainer>
            </Layout>

            {/* ✅ 커스텀 팝업 모음 */}
            <Popup 
                isOpen={isSavePopupOpen} 
                title="저장 완료" 
                onClose={() => setIsSavePopupOpen(false)}
                onConfirm={() => setIsSavePopupOpen(false)}
            >
                게시판 설정이 성공적으로 저장되었습니다.
            </Popup>

            <Popup 
                isOpen={isAlertPopupOpen} 
                title="입력 오류" 
                onClose={() => setIsAlertPopupOpen(false)}
                onConfirm={() => setIsAlertPopupOpen(false)}
            >
                게시판 이름을 입력해주세요.
            </Popup>

            <Popup 
                isOpen={isDeletePopupOpen} 
                title="게시판 삭제 경고" 
                onClose={() => {
                    setIsDeletePopupOpen(false);
                    setSelectedDeleteId(null);
                }}
                onConfirm={confirmDelete}
            >
                이 게시판을 정말 삭제하시겠습니까? <br/>
                <span style={{ color: '#e74a3b', fontSize: '0.9rem' }}>게시판 내의 모든 게시물도 함께 삭제됩니다.</span>
            </Popup>
        </>
    );
}