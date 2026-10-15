import styled from 'styled-components';

export const Wrapper = styled.div`
display:flex; width:100%;
height:100vh; overflow:hidden;
`;

export const ContentWrapper = styled.div`
display:flex; flex-direction:column;
width:100%; overflow-x:hidden;
background-color:#f8f9fc;
`;

export const MainContent = styled.div`
flex: 1 0 auto;
/*내용물의 크기를 기본으로 잡되(auto), 
화면이 좁아져도 원래 크기보다 줄어들지는 말고(0), 
만약 화면에 빈 공간이 남는다면 남는 여백을 네가 전부 채워라(1)."
1 (flex-grow): 늘어나는 비율
부모 컨테이너에 남는 여백이 있을 때, 
이 요소가 남는 공간을 꽉 채우도록 늘어나라는 뜻입니다. (기본값은 0)
0 (flex-shrink): 줄어드는 비율
부모 컨테이너의 공간이 부족해질 때, 
이 요소의 크기를 절대 줄이지 말라는 뜻입니다. (기본값은 1)
auto (flex-basis): 기본 크기
요소의 기본 시작 크기를 내부 콘텐츠의 크기나 
설정된 width/height 값에 맞추겠다는 뜻입니다.
*/
`;

export const ContainerFluid = styled.div`
width:100%;
padding-right:1.5rem; padding-left:1.5rem;
margin-right:auto; margin-left:auto;
`;