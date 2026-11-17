import styled from "styled-components";

import Link from "next/link";
import { FlexCenter, W100, FlexColumn, FlexColumnStart, H100 } from "../common/Common.style";

export const Container = styled.div`
width:100vw;
${FlexCenter};
min-height:100vh;
padding:2rem;
background-color: ${(props: any) => props.theme?.colors?.background || "#536692"};
`;
export const Card = styled.div`
display:flex;
width:100%;
max-width:1200px;
background:#fff;
border-radius:0.35rem;
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
overflow:hidden;
`;
export const ImageColumn = styled.div`
width:41.66667%;
background:url("");
@media(max-width:992px){
display:none;
}
`;
export const FormColumn = styled.div`
width:58.33333%;
padding:3rem;
@media(max-width: 992px){
width:100%;
}
`;
export const Title = styled.h1`
text-align:center;
font-size:1.5rem;
color:#3a3b45;
margin-bottom:1.5rem;
font-weight:400;
`;
export const Form = styled.form`
display:flex; flex-direction:column;
gap:1rem;
`;
export const Row = styled.div`
display:flex;
gap:1rem;
@media(max-width: 768px){
flex-direction:column;
}
`;
export const Col = styled.div`
flex:1;
`;

export const AddressWrapper = styled.div`
display:flex;
gap:0.5rem;
`;


export const Divider = styled.hr`
margin:1.5rem 0;
border:0;
border-top:1px solid rgba(0,0,0,0.1);
`;
export const StyledLink = styled(Link)`
display:block;
text-align:center;
font-size:0.875rem;
color:#4e73df;
text-decoration:none;
margin-bottom:0.5rem;
&:hover{
text-decoration:underline;
color:#224abe;
}
`;

export const CheckboxWrapper = styled.div`
display:flex;
align-items:center;
gap:0.5rem;
padding-left:0.5rem;
margin-bottom:0.5rem;
`;

export const Description = styled.p`
text-align: center;
font-size: 0.875rem;
color: #6e707e;
margin-bottom: 1.5rem;
line-height: 1.5;
`;

export const AsideContainer = styled.div`
  ${W100};  
  ${H100};
  padding: 24px 0;
  ${FlexColumnStart};
  background-color: #ffffff;
`;

export const MenuSection = styled.div`
${W100};
margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  padding: 0 24px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
`;

export const LineCard = styled.div<{ $isWarning?:boolean; $isPass?: boolean;}>`
width:230px;
max-width:230px;
padding:.9rem;
border:1px solid #ddd;
border-radius: .5rem;

background: ${(props) => {

  // 1. 경고(WARNING) 상태일 때: 붉은빛 그라데이션 + 미세한 사선 패턴/효과 조합
        if (props.$isWarning) {
            return `
                linear-gradient(135deg, rgba(255, 245, 245, 0.9) 0%, rgba(255, 227, 227, 0.95) 100%),
                radial-gradient(circle at top right, rgba(255, 0, 0, 0.05) 0%, transparent 60%)
            `;
        }
        
        // 2. 통과(PASS) 상태일 때: 초록빛 그라데이션 + 은은한 광채 효과 조합
        if (props.$isPass) {
            return `
                linear-gradient(135deg, rgba(240, 255, 244, 0.9) 0%, rgba(209, 250, 229, 0.95) 100%),
                radial-gradient(circle at top right, rgba(0, 200, 0, 0.05) 0%, transparent 60%)
            `;
        }

return `#f9f9f9`;
}}`;

//단색일때
/* 💡 그라데이션 없이 깔끔한 단색 상태로 조건별 배경 적용 
    background: ${(props) => {
        if (props.$isWarning) return "#fff5f5"; // SCM 경고 상태 (연한 빨간색)
        if (props.$isPass) return "#f0fff4";    // 품질 검사 PASS 상태 (연한 초록색)
        return "#f9f9f9";                      // 평상시 기본 상태
    }};*/

//상태 텍스트
export const StatusBadge = 
styled.span<{ $isRunning?: boolean; $isWarning?:boolean; }>`
color: ${(props) => {
  if (props.$isWarning === true) return "red";
  if (props.$isRunning !== undefined ){
    return props.$isRunning ? "#617a9c" : "red";
  };
  //3. 기본값 (SCM NORMAL 등): 차분한 블루톤
  return "#617a9c";
}};
  
font-weight:bold;
`;

export const Badge = styled.span<{$status:"대기"|"진행"|"완료"}>`
padding:4px 8px;
border-radius:12px;
font-size:0.75rem;
font-weight:bold;
color:white;
background-color:${({ $status}) =>
$status === "완료" ? "#10b981" :
$status === "진행" ? "#3B82f6" : "#f59e0b"};
`;

