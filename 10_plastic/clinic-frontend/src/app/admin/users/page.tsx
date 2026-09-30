"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
import { FiTrash2, FiSearch, FiCheck, FiUserX } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

// 임시 회원 데이터 인터페이스
interface UserData {
    idx: number;
    name: string;
    userId: string;
    phone: string;
    joinDate: string;
    status: "정상" | "정지";
}

export default function Users() {
    // 🎯 상태 관리: 회원 목록
    const [userList, setUserList] = useState<UserData[]>([]);

    // 🎯 상태 관리: 삭제 팝업
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedDeleteIdx, setSelectedDeleteIdx] = useState<number | null>(null);

    //화면 로드시 데이터 조회
    useEffect(() => {
fetchUsers();
    },[]);

const fetchUsers = async () => {
    try{
const response = await axios.get("http://localhost:4000/api/admin/users");
if(response.data.success) {
const formattedUsers = response.data.data.map((user: any) => ({
idx: user.USER_IDX,
name:user.USER_NAME,
userId:user.USER_ID,
phone:user.PHONE,
status:user.STATUS || "정상",
joinDate:user.REG_DATE
? new Date(user.REG_DATE).toISOString().split('T')[0]
: "2026-09-01"
}));   
setUserList(formattedUsers); 
}
    }catch(error){
console.error("회원 목록 불러오기 실패:", error);
    }
}    
    // ----------------------------------------------------
    // 1. 회원 상태 변경 토글 (정상 <-> 정지)
    // ----------------------------------------------------
const toggleStatus = async (idx: number) => {
try{
const response = await axios.put(`http://localhost:4000/api/admin/users/${idx}/status`);    
if(response.data.success){
setUserList(userList.map(item =>
item.idx === idx
    ? { ...item, status: item.status === "정상" ? "정지" : "정상" }
    : item
));
}
}catch(error) {
console.error("상태 변경 실패:", error);
alert("상태 변경에 실패 했습니다")
}
    };

    // ----------------------------------------------------
    // 2. 회원 삭제 기능 (팝업 열기 & 실제 삭제)
    // ----------------------------------------------------
    const handleDeleteClick = (idx: number) => {
        setSelectedDeleteIdx(idx);
        setIsDeletePopupOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedDeleteIdx !== null) {
            try{
            const response = 
            await axios.delete(`http://localhost:4000/api/admin/users/${selectedDeleteIdx}`);
                if(response.data.success){
                    setUserList(userList.filter(item => item.idx !== selectedDeleteIdx));
                }
            }catch(error){
                console.error("회원 삭제 실패:", error);
                alert("회원 삭제에 실패했습니다")
            }            
        }
        setIsDeletePopupOpen(false);
        setSelectedDeleteIdx(null);
    };

    return (
        <>
            <Layout>
                <S.UserContainer>
                    <S.UserPageHeader>
                        <S.UserPageTitle>회원 관리</S.UserPageTitle>
                    </S.UserPageHeader>

                    {/* 🎯 검색 및 필터 영역 */}
                    <S.UserFilterCard>
                        <S.UserInputGroup>
                            <S.UserInput type="text" placeholder="이름, 아이디 또는 연락처 검색" />
                            <S.UserSearchButton>
                                <FiSearch size={16} /> 검색
                            </S.UserSearchButton>
                        </S.UserInputGroup>
                    </S.UserFilterCard>

                    {/* 🎯 회원 내역 데이터 테이블 */}
                    <S.UserTableCard>
                        <S.UserCardHeader>
                            <S.UserCardTitle>가입 회원 목록 (총 {userList.length}명)</S.UserCardTitle>
                        </S.UserCardHeader>
                        
                        <S.UserTableWrapper>
                            <S.UserTable>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>이름</th>
                                        <th>아이디(이메일)</th>
                                        <th>연락처</th>
                                        <th>가입일자</th>
                                        <th>상태</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((item, index) => (
                                        <tr key={item.idx}>
                                            <td>{userList.length - index}</td>
                                            <td><strong>{item.name}</strong></td>
                                            <td>{item.userId}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.joinDate}</td>
                                            <td>
                                                <S.UserStatusBadge 
                                                    $status={item.status} 
                                                    onClick={() => toggleStatus(item.idx)}
                                                >
{item.status === "정상" ? <FiCheck size={12} /> : <FiUserX size={12} />}
                                                    {item.status}
                                                </S.UserStatusBadge>
                                            </td>
                                            <td>
<S.UserDeleteActionBtn onClick={() => handleDeleteClick(item.idx)}>
    <FiTrash2 size={16} />
</S.UserDeleteActionBtn>
                                            </td>
                                        </tr>
))}
{userList.length === 0 && (
    <tr>
        <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
            가입된 회원 내역이 없습니다.
        </td>
    </tr>
)}
                                </tbody>
                            </S.UserTable>
                        </S.UserTableWrapper>
                    </S.UserTableCard>
                </S.UserContainer>
            </Layout>

            {/* ✅ 커스텀 삭제 팝업 */}
            <Popup 
                isOpen={isDeletePopupOpen} 
                title="회원 삭제 확인" 
                onClose={() => {
                    setIsDeletePopupOpen(false);
                    setSelectedDeleteIdx(null);
                }}
                onConfirm={confirmDelete}
            >
                해당 회원 정보를 정말 삭제하시겠습니까? <br/> (이 작업은 되돌릴 수 없습니다.)
            </Popup>
        </>
    );
}