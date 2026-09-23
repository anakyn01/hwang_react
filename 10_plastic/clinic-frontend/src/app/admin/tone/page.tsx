"use client";
import React, {useState} from "react";
import *as S from "@/assets/css/admin/Admin.style"
import { FiMoon, FiSun, FiCheck, FiSave} from "react-icons/fi";

import { Layout } from "../Layout";


export default function Tone(){

    const [selectedTone, setSelectedTone] = 
    useState<"BLUE" | "PINK">("BLUE");
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    //
const handleSave = async () => {
    const payload = {
primaryTone:selectedTone, isDarkMode:isDarkMode ? 'Y' : 'N'        
    };
    console.log("DB에 저장될 데이터:", payload);

    alert("톤앤매너 설정이 성공적으로 저장되었습니다.");
    //이건 기본 모달로 바꾸기..
}


    return(
        <>
        <Layout>
<S.ToneContainer>
<S.TonePageHeader>
    <S.TonePageTitle>톤앤매너관리</S.TonePageTitle>
    <S.ToneSaveButton
    onClick={handleSave}
    ><FiSave size={18}/>
    설정 저장하기
    </S.ToneSaveButton>
</S.TonePageHeader>
<S.ToneCardGrid>
    <S.ToneSettingsCard>
        <S.ToneCardHeader>
            <S.ToneCardTitle>
                브랜드 메인 컬러(TONE)
            </S.ToneCardTitle>
        </S.ToneCardHeader>
        <S.ToneCardBody>
            <p>웹사이트 전체에 적용될 주요 색상을 선택하세요</p>
            <S.ToneColorOptionWrapper>
                <S.ToneColorBox
                $color="#4e73df"
                $isActive={selectedTone === "BLUE"}
                onClick={() => setSelectedTone("BLUE")}
                >
{selectedTone==="BLUE" && <FiCheck size={30} color="#fff"/>}
                </S.ToneColorBox>

                <S.ToneColorBox
                $color="#e83e8c"
                $isActive={selectedTone === "PINK"}
                onClick={() => setSelectedTone("PINK")}
                >
{selectedTone==="PINK" && <FiCheck size={30} color="#fff"/>}
                </S.ToneColorBox>

            </S.ToneColorOptionWrapper>
            <S.ToneSelectedText>
 현재 선택된 톤 : <strong>
    {selectedTone === "BLUE" ? "트러스트 블루(Blue)" : "러블리 핑크(Pink)"}
    </strong>               
            </S.ToneSelectedText>
        </S.ToneCardBody>
    </S.ToneSettingsCard>

    {/*다크모드 설정 카드 */}
    <S.ToneSettingsCard>
        <S.ToneCardHeader>
            <S.ToneCardTitle>다크모드(Dark Mode)</S.ToneCardTitle>
        </S.ToneCardHeader>
        <S.ToneCardBody>
            <p>사용자 화면의 다크 모드 기본 상태를 설정합니다</p>
            <S.ToneToggleWrapper>
                <S.ToneModeButton
                $isActive={!isDarkMode}
                onClick={() => setIsDarkMode(false)}
                >
                <FiSun size={20}/>라이트 모드
                </S.ToneModeButton>


             <S.ToneModeButton
                $isActive={isDarkMode}
                $isDark={true}
                onClick={() => setIsDarkMode(true)}
                >
                <FiMoon size={20}/>다크 모드
                </S.ToneModeButton>
            </S.ToneToggleWrapper>
            <S.ToneSelectedText>
                현재상태:<strong>
                    {isDarkMode ? "다크모드 활성화됨" :"라이트모드(기본값)"}
                </strong>
            </S.ToneSelectedText>
        </S.ToneCardBody>
    </S.ToneSettingsCard>

</S.ToneCardGrid>
</S.ToneContainer>           
        </Layout>
        </>
    )
}