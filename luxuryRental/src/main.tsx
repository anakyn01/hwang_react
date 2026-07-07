import { createRoot } from 'react-dom/client';
import * as S from './css/AppLayout.styles';
import { BrowserRouter, Routes, Route, useNavigate,Link } from 'react-router-dom';
import {RentalStore} from './sub/RentalStore';
import {RepairPage} from './sub/RepairPage';
import {MyPage} from './sub/MyPage';
import { Home } from './Home';


const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.AppContainer>
      <S.Header><Link to="/">럭셔리 플랫폼 MVP</Link></S.Header>
      
      <S.MainContent>
        {/* URL에 따라 바뀌는 콘텐츠 영역 */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/rental" element={<RentalStore />} />
          <Route path="/repair" element={<RepairPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </S.MainContent>
      
      <S.BottomNav>
        <button onClick={() => navigate('/rental')}>렌탈/스토어</button>
        <button onClick={() => navigate('/repair')}>수선/복원</button>
        <button onClick={() => navigate('/mypage')}>마이페이지</button>
      </S.BottomNav>
    </S.AppContainer>
  );
};

// BrowserRouter는 반드시 Routes를 사용하는 컴포넌트 상위에서 감싸야 합니다.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);