import styled, {keyframes} from 'styled-components';

//무한 롤링 애니메이션 (0%에서 시작해서 -100%까지 이동)
const rolling = keyframes`
0%{
transform: translateX(0);
}
100%{
transform: translateX(-100%);
}
`;

export const BannerWrapper = styled.div`
width:100%;
overflow:hidden;
background:linear-gradient(90deg, #ffe5f1 0%, #ebd4ff 100%);
padding:14px 0;
display:flex;
`;

export const Track = styled.div`
display:flex;
white-space:nowrap;
`;

//똑같은 텍스트 그룹2개를 교대로 보여주기 위해 애니메이션 적용
export const TextGroup = styled.div`
display:flex;
animation:${rolling} 23s linear infinite;
`;

export const TextItem = styled.span`
font-size:20px;
font-weight:800;
color:#fff;
text-shadow:2px 2px 10px gray;
letter-spacing:1px;
margin-right:30px;
`;