"use client";
import React, { useState } from "react";
import { Layout } from "../Layout";
import * as S from "@/assets/css/Style.style";
import { Popup } from "@/component/modal/Popup";
import { FiSave, FiPlus, FiTrash2, FiImage, FiType } from "react-icons/fi";

interface MenuItem {
    id: number;
    name: string;
    url: string;
}

export default function Nav() {
    const [logoType, setLogoType] = useState<"TEXT" | "IMAGE">("TEXT");
    const [logoText, setLogoText] = useState<string>("성형외과 로고");
    const [logoFileName, setLogoFileName] = useState<string>("");

    // 💡 1. 수정: 초기 데이터는 겹치지 않도록 안전한 고정 숫자로 부여합니다.
    const [menus, setMenus] = useState<MenuItem[]>([
        { id: 1, name: "병원소개", url: "/" },
        { id: 2, name: "눈성형", url: "/" },
        { id: 3, name: "코성형", url: "/" },
        { id: 4, name: "동안성형", url: "/" },
        { id: 5, name: "쁘띠시술", url: "/" },
        { id: 6, name: "커뮤니티", url: "/" }
    ]);

    // 상태관리 팝업
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 로고 이미지 파일 선택핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setLogoFileName(e.target.files[0].name);
        }
    };

    // 추가 삭제 변경 핸들러
    const handleAddMenu = () => {
        // 기존 목록이 있으면 가장 큰 id 번호 + 1, 없으면 1로 시작
        const nextId = menus.length > 0 ? Math.max(...menus.map(m => m.id)) + 1 : 1;
        setMenus([...menus, { id: nextId, name: "", url: "" }]);
    };

    const handleRemoveMenu = (id: number) => {
        setMenus(menus.filter(menu => menu.id !== id));
    };

    const handleMenuChange = (id: number, field: keyof MenuItem, value: string) => {
        setMenus(menus.map(menu =>
            menu.id === id ? { ...menu, [field]: value } : menu
        ));
    };

    const handleSave = () => {
        const payload = {
            logo: {
                type: logoType,
                text: logoType === "TEXT" ? logoText : null,
                fileName: logoType === "IMAGE" ? logoFileName : null,
            },
            menus: menus
        };
        console.log("DB에 저장될 데이터", payload);
        setIsPopupOpen(true);
    };

    return (
        <>
            <Layout>
                <S.SetNavContainer>
                    {/* 💡 2. 수정: 불필요하게 겹쳐 있던 <S.SetNavPageHeader> 태그 제거 */}
                    <S.SetNavPageHeader>
                        <S.SetNavPageTitle>내비게이션 관리</S.SetNavPageTitle>
                        <S.SetNavSaveButton onClick={handleSave}>
                            <FiSave size={18} /> 설정 저장하기
                        </S.SetNavSaveButton>
                    </S.SetNavPageHeader>

                    <S.SetNavContentGrid>
                        <S.SetNavCard>
                            <S.SetNavCardHeader>
                                <S.SetNavCardTitle>상단 로고 설정</S.SetNavCardTitle>
                            </S.SetNavCardHeader>
                            <S.SetNavCardBody>
                                <p>웹사이트 최상단에 표시될 로고의 형태를 선택하세요.</p>
                                <S.SetNavRadioGroup>
                                    <S.SetNavRadioLabel
                                        $isActive={logoType === "TEXT"}
                                        onClick={() => setLogoType("TEXT")}
                                    >
                                        <FiType size={18} /> 텍스트 로고
                                    </S.SetNavRadioLabel>

                                    <S.SetNavRadioLabel
                                        $isActive={logoType === "IMAGE"}
                                        onClick={() => setLogoType("IMAGE")}
                                    >
                                        {/* 💡 3. 수정: 이미지 로고 버튼에 알맞은 FiImage 아이콘 적용 */}
                                        <FiImage size={18} /> 이미지 로고
                                    </S.SetNavRadioLabel>
                                </S.SetNavRadioGroup>

                                <S.SetNavFileInputWrapper>
                                    {logoType === "TEXT" ? (
                                        <>
                                            <S.SetNavLabel>텍스트 입력</S.SetNavLabel>
                                            <S.SetNavInput
                                                type="text"
                                                value={logoText}
                                                onChange={(e) => setLogoText(e.target.value)}
                                                placeholder="예:안호범성형외과"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <S.SetNavLabel>이미지 파일 등록</S.SetNavLabel>
                                            <S.SetNavFileInputWrapper>
                                                <S.SetNavFileInput
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    id="logo-upload"
                                                />
                                                <S.SetNavFileLabel htmlFor="logo-upload">
                                                    파일선택
                                                </S.SetNavFileLabel>
                                                <span className="file-name">{logoFileName || "선택된 파일이 없습니다"}</span>
                                            </S.SetNavFileInputWrapper>
                                        </>
                                    )}
                                </S.SetNavFileInputWrapper>
                            </S.SetNavCardBody>
                        </S.SetNavCard>

                        <S.SetNavCard>
                            <S.SetNavCardHeader>
                                <S.SetNavCardTitle>카테고리 및 URL 설정</S.SetNavCardTitle>
                            </S.SetNavCardHeader>
                            <S.SetNavCardBody>
                                <p>사용자가 클릭할 내비게이션 메뉴 이름과 이동할 주소를 입력하세요.</p>
                                <S.SetNavMenuList>
                                    {menus.map((menu, index) => (
                                        <S.SetNavMenuItem key={menu.id}>
                                            <div className="menu-number">{index + 1}</div>

                                            <S.SetNavInput
                                                type="text"
                                                placeholder="메뉴명(예:시술안내)"
                                                value={menu.name}
                                                onChange={(e) => handleMenuChange(menu.id, 'name', e.target.value)}
                                            />

                                            <S.SetNavInput
                                                type="text"
                                                placeholder="url(/treatment)"
                                                value={menu.url}
                                                onChange={(e) => handleMenuChange(menu.id, 'url', e.target.value)}
                                            />

                                            <S.SetNavDeleteButton onClick={() => handleRemoveMenu(menu.id)}>
                                                <FiTrash2 size={18} />
                                            </S.SetNavDeleteButton>
                                        </S.SetNavMenuItem>
                                    ))}
                                </S.SetNavMenuList>

                                <S.SetNavAddButton onClick={handleAddMenu}>
                                    <FiPlus size={18} /> 새 카테고리 추가
                                </S.SetNavAddButton>
                            </S.SetNavCardBody>
                        </S.SetNavCard>
                    </S.SetNavContentGrid>
                </S.SetNavContainer>
            </Layout>

            <Popup
                isOpen={isPopupOpen}
                title="저장완료"
                onClose={() => setIsPopupOpen(false)}
                onConfirm={() => setIsPopupOpen(false)}
            >
                내비게이션 설정이 성공적으로 저장되었습니다.
            </Popup>
        </>
    );
}