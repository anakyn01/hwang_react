"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import * as S from '@/assets/css/Style.style';

// DB에서 받아올 카테고리 데이터 타입
interface CategoryData {
    id: number;
    name: string;
    img: string;
    link: string;
}

export default function CategoryNav() {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);

    // 💡 백엔드에서 카테고리 데이터 불러오기 (SORT_ORDER 순으로 정렬되어 옴)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/categories");
                if (response.data.success) {
                    const formatted = response.data.data.map((c: any) => ({
                        id: c.CATEGORY_IDX,
                        name: c.TITLE,
                        img: `http://localhost:4000/images/${c.FILE_NAME}`, // 실제 이미지 경로
                        link: c.LINK || "#"
                    }));
                    setCategories(formatted);
                    
                    // 처음 화면이 켜졌을 때 첫 번째 항목을 자동으로 활성화 (선택)
                    if (formatted.length > 0) {
                        setActiveId(formatted[0].id);
                    }
                }
            } catch (error) {
                console.error("카테고리 로드 실패:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <S.NavContainer>
            {categories.map((category) => {
                const isActive = activeId === category.id;
                
                return (
                    // 💡 관리자가 설정한 링크로 이동하도록 Link 태그 적용
                    <Link 
                        href={category.link} 
                        key={category.id} 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <S.CategoryItem
                            $active={isActive}
                            onClick={() => setActiveId(category.id)}
                        >
                            <S.ImageBox $active={isActive}>
                                <img 
                                    src={category.img} 
                                    alt={category.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                                />
                                {isActive && (
                                    <S.ActiveOverlay>
                                        <svg 
                                            width="32" 
                                            height="32" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="#FFD700" /* 노란색 체크 */
                                            strokeWidth="4" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>        
                                    </S.ActiveOverlay>
                                )}
                            </S.ImageBox>

                            <S.CategoryText $active={isActive}>
                                {category.name}
                            </S.CategoryText>
                        </S.CategoryItem>
                    </Link>
                )
            })}
        </S.NavContainer>
    )
}