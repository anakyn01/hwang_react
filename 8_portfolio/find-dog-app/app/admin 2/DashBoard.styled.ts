import styled from 'styled-components';

export const PageHeader = styled.div`
display:flex; align-items:center;
justify-content:space-between;
margin-bottom:1.5rem;
h1{
font-size:1.75rem;
font-weight:400;
color:#5a5c69;
margin:0;
}
`;

export const GridRow = styled.div`
display:flex; flex-wrap:wrap;
margin-right:-0.75rem; margin-left:-0.75rem;
`;

export const CardColumn = styled.div`
flex: 0 0 25%;
/*
flex-grow: 0; 여유 공간이 있어도 커지지 않음
flex-shrink: 0; 공간이 부족해도 줄어들지 않음
flex-basis: 25%; 기본 너비는 부모의  25%
*/
max-width:25%;
padding-right:0.75rem;
padding-left:0.75rem;
margin-bottom:1.5rem;

@media (max-width: 1200px) {flex:0 0 50%; max-width:50%;}
@media (max-width: 768px) {flex:0 0 100%; max-width:100%;}
`;

export const StatCard = styled.div<{$borderColor?:string}>`
position:relative;
display:flex;
flex-direction:column;
min-width:0;
word-wrap:break-word;
background-color:#fff;
background-clip:border-box;
border:1px solid #e3e6f0;
border-radius:0.35rem;
border-left:
0.25rem solid ${(props) => props.$borderColor || '#e3e6f0'};
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
height:100%;
padding:0.5rem 0;
`;

export const CardBody = styled.div`
flex: 1 1 auto;
padding:1.25rem;
display:flex;
align-items:center;
justify-content:space-between;
`;

//join
export const Background = styled.div`
background-color:#4e73df;
background-image:linear-gradient(180deg, #4e73df 10%, #224abe 100%);
background-size:cover;
min-height:100vh;
display:flex;
align-items:center;
justifi-content:center;
`;

//다음 우편번호 모달 배경(어둡게 처리)
export const ModalBackground = styled.div`
position:fixed; top:0; left:0;
width:100%; height:100%; 
background:rgba(0, 0, 0, 0.5);
display:flex;
align-items:center;
justify-content:center;
z-index:999;
`;

//다음 우편번호 컴포넌트를 감싸는 박스
export const PostcodeWrapper = styled.div`
width:400px; max-width:90%; background:white;
padding:20px; border-radius:8px; 
box-shadow:0 4px 12px rgba(0,0,0, .2);

/*닫기 버튼을 감싸는 영역*/
.close-btn-wrap{
text-align:right;
margin-bottom:10px;
}
`;

//회원리스트
export const PageWrapper = styled.div`
padding:1.5rem;
`;

export const PageTitle = styled.h1`
font-size:1.75rem; color:#5a5c69;
margin-bottom:1.5rem;
`;

export const Card = styled.div`
background-color:#fff;
background-clip:border-box;
border:1px solid #e3e6f0;
border-radius:0.35rem;
box-shadow:0 0.15rem 1.75rem 0 rgba(58, 69, 69, 0.15);
margin-bottom:1.5rem;
`;

export const CardHeader = styled.div`
padding:0.75rem 1.25rem;
margin-bottom:0; 
background-color:#f8f9fc;
border-bottom:1px solid #e3e6f0;
h6{
margin:0; font-weight:bold;
color:#4e73df;
}
`;

export const StyledTable = styled.table`
width:100%; margin-bottom:1rem;
color:#858796; border-collapse:collapse;

th, td {
padding:0.75rem; vertical-align:top;
border:1px solid #e3e6f0;
}

th{
background-color:#f8f9fc; text-align:left;
}

tbody tr:hover {
background-color:#f1f3f6;
}
`;