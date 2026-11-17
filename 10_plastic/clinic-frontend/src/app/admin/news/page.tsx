"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Layout } from "../Layout";
import * as S from "@/assets/css/admin/Admin.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { Popup } from "@/component/modal/Popup";

interface CategoryData {
    id: number;
    title: string;
    imageUrl: string; // 실제로는 업로드된 파일의 경로 또는 미리보기 URL
    link: string;
}

export default function News() {
    // 🎯 상태 관리: 등록된 카테고리 아이콘 목록
    const [categories, setCategories] = useState<CategoryData[]>([]);

    // 🎯 상태 관리: 새 카테고리 등록 폼
    const [newCategory, setNewCategory] = useState({ title: "", link: "" });
//add
const [selectedFile, setSelectedFile] = useState<File | null>(null);


    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);

//생명주기
useEffect(() => {
    fetchCategories();
},[]);

const fetchCategories = async () => {
    try{
const response =
await axios.get("http://localhost:4000/api/admin/categories");        
if(response.data.success){
const formatted = response.data.data.map((c: any) => ({
id:c.CATEGORY_IDX,
title:c.TITLE,
imageUrl:`http://localhost:4000/images/${c.FILE_NAME}`,
link:c.LINK    
}));
setCategories(formatted);
}
}catch(error) {
console.error("카테고리 로드 실패", error);
}
}


// 이미지 첨부 및 썸네일 미리보기 처리
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setSelectedFile(file);
        setFileName(file.name);
        setPreviewUrl(URL.createObjectURL(file)); // 로컬 썸네일 미리보기 생성
    }
};

// 카테고리 추가
const handleAddCategory = async () => {
if (!newCategory.title || !selectedFile) {
alert("카테고리 이름과 이미지를 모두 등록해주세요.");
return;
}

const formData = new FormData();
formData.append("categoryImg",selectedFile);
formData.append("title",newCategory.title);
formData.append("link",newCategory.link);

try{
const response =
await axios.post("http://localhost:4000/api/admin/categories", formData,{
    headers:{"Content-Type":"multipart/form-data"}
});
if(response.data.success) {
setNewCategory({title: "", link: "" });
setSelectedFile(null);
setFileName("");
setPreviewUrl("");
fetchCategories();
}
}catch(error){
alert("카테고리 등록에 실패 했습니다")
}
};

// 카테고리 삭제
const handleDelete = async (id: number) => {
    if (confirm("해당 카테고리 아이콘을 삭제하시겠습니까?")) {
        try{
await axios.delete(`http://localhost:4000/api/admin/categories/${id}`);
fetchCategories();
}catch(error){
    alert("삭제 실패");
}
    }
};

// 순서 변경 (위/아래)
const moveCategory = (index: number, direction: 'UP' | 'DOWN') => {
    const newCategories = [...categories];
    if (direction === 'UP' && index > 0) {
        [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
    } else if (direction === 'DOWN' && index < newCategories.length - 1) {
        [newCategories[index + 1], newCategories[index]] = [newCategories[index], newCategories[index + 1]];
    }
    setCategories(newCategories);
};

//4.변경된 순서를 db에 최종저장
const handleSave = async () => {
    const orderedIds = categories.map(c => c.id);
    try{
const response =
await axios.put("http://localhost:4000/api/admin/categories/order",{orderedIds});
if(response.data.success){
   setIsSavePopupOpen(true); 
}    
}catch(error){
alert("순서 저장 실패")
    }
};

return (
        <>
            <Layout>
                <S.NewsContainer>
                    <S.NewsPageHeader>
                        <S.NewsPageTitle>원형 카테고리 아이콘 관리</S.NewsPageTitle>
                        <S.NewsSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.NewsSaveButton>
                    </S.NewsPageHeader>

                    <S.NewsGrid>
                        <S.NewsLeftColumn>
                            <S.NewsCard>
                                <S.NewsCardHeader>
                                    <S.NewsCardTitle>새 카테고리 아이콘 등록</S.NewsCardTitle>
                                </S.NewsCardHeader>
                                <S.NewsCardBody>
                                    <S.NewsFormGroup>
                                        <S.NewsLabel>카테고리명 (예: 눈, 코, 가슴)</S.NewsLabel>
                                        <S.NewsInput 
                                            type="text" placeholder="아이콘 아래에 표시될 텍스트" 
                                            value={newCategory.title}
                                            onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                                        />
                                    </S.NewsFormGroup>

                                    <S.NewsFormGroup>
                                        <S.NewsLabel>원형 썸네일 이미지</S.NewsLabel>
                                        <S.NewsFileInputWrapper>
                                            <S.NewsFileInput 
                                                type="file" id="category-img" accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <S.NewsFileLabel htmlFor="category-img"><FiImage /> 이미지 선택</S.NewsFileLabel>
                                            <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                        </S.NewsFileInputWrapper>
                                        {previewUrl && (
                                            <S.NewsPreviewCircle>
                                                <img src={previewUrl} alt="미리보기" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginTop: '1rem' }} />
                                            </S.NewsPreviewCircle>
                                        )}
                                    </S.NewsFormGroup>

                                    <S.NewsFormGroup>
                                        <S.NewsLabel>클릭 시 이동할 링크 URL (선택)</S.NewsLabel>
                                        <S.NewsInput 
                                            type="text" placeholder="예: /category/eye"
                                            value={newCategory.link}
                                            onChange={(e) => setNewCategory({...newCategory, link: e.target.value})}
                                        />
                                    </S.NewsFormGroup>

                                    <S.NewsAddButton onClick={handleAddCategory}>
                                        <FiPlus size={18} /> 리스트에 추가하기
                                    </S.NewsAddButton>
                                </S.NewsCardBody>
                            </S.NewsCard>
                        </S.NewsLeftColumn>

                        <S.NewsRightColumn>
                            <S.NewsCard style={{ height: '100%' }}>
                                <S.NewsCardHeader>
                                    <S.NewsCardTitle>현재 노출중인 아이콘 (총 {categories.length}개)</S.NewsCardTitle>
                                </S.NewsCardHeader>
                                <S.NewsTableWrapper>
                                    <S.NewsTable>
                                        <thead>
                                            <tr>
                                                <th>순서 변경</th>
                                                <th>미리보기</th>
                                                <th>카테고리명 / 링크</th>
                                                <th>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((cat, index) => (
                                                <tr key={cat.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                                            <S.NewsActionBtn onClick={() => moveCategory(index, 'UP')} disabled={index === 0}>
                                                                <FiArrowUp size={16} />
                                                            </S.NewsActionBtn>
                                                            <S.NewsActionBtn onClick={() => moveCategory(index, 'DOWN')} disabled={index === categories.length - 1}>
                                                                <FiArrowDown size={16} />
                                                            </S.NewsActionBtn>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <S.NewsThumbnail>
                                                            {cat.imageUrl ? <img src={cat.imageUrl} alt={cat.title} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} /> : <span>No Img</span>}
                                                        </S.NewsThumbnail>
                                                    </td>
                                                    <td style={{ textAlign: 'left' }}>
                                                        <strong>{cat.title}</strong>
                                                        <div style={{ fontSize: '0.8rem', color: '#858796' }}>{cat.link || '링크 없음'}</div>
                                                    </td>
                                                    <td>
                                                        <S.NewsDeleteBtn onClick={() => handleDelete(cat.id)}>
                                                            <FiTrash2 size={16} />
                                                        </S.NewsDeleteBtn>
                                                    </td>
                                                </tr>
                                            ))}
                                            {categories.length === 0 && (
                                                <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 카테고리가 없습니다.</td></tr>
                                            )}
                                        </tbody>
                                    </S.NewsTable>
                                </S.NewsTableWrapper>
                            </S.NewsCard>
                        </S.NewsRightColumn>
                    </S.NewsGrid>
                </S.NewsContainer>
            </Layout>

            <Popup 
                isOpen={isSavePopupOpen} 
                title="저장 완료" 
                onClose={() => setIsSavePopupOpen(false)}
                onConfirm={() => setIsSavePopupOpen(false)}
            >
                카테고리 순서가 성공적으로 저장되었습니다.
            </Popup>
        </>
    );
}