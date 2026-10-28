import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// 1. 단일 AppContext 및 AppProvider 임포트
import { AppProvider, useApp } from './context/AppContext';

// 2. 컴포넌트 임포트
import { ShopMain } from './components/ShopMain';
import { ShopCategory } from './components/ShopCategory';
import { ShopSell } from './components/ShopSell';
import { ShopAdmin } from './components/ShopAdmin';
import { RecruitApp } from './components/RecruitApp';
import { ShopSearch } from './components/ShopSearch';
import { ShopLike } from './components/ShopLike';

// 3. 메인 라우터 (관리자 화면은 전체 화면 반응형, 쇼핑몰은 모바일 앱 비율 뷰 적용)
const MainRouter = () => {
  const { currentView } = useApp();

  // 관리자 화면일 때는 PC, 태블릿, 모바일 해상도에 맞춰 화면 전체(100%)를 유연하게 활용
  if (currentView === 'SHOP_ADMIN') {
    return (
      <div className="min-h-screen bg-gray-100 w-full flex flex-col">
        <ShopAdmin />
      </div>
    );
  }

  // 쇼핑몰 메인 및 기타 화면일 때는 모바일 앱 뷰(max-w-md) 유지 + 슬라이딩 오버레이 지원
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans text-gray-900">
      <div className="w-full max-w-md h-screen sm:h-[90vh] bg-white relative flex flex-col overflow-hidden shadow-2xl sm:rounded-2xl">
        
        {currentView === 'SHOP_MAIN' && <ShopMain />}
        {currentView === 'SHOP_CATEGORY' && <ShopCategory />}
        {currentView === 'SHOP_SELL' && <ShopSell />}
        {currentView === 'RECRUIT_APP' && <RecruitApp />}
        
        {/* 슬라이딩 오버레이 */}
        <ShopSearch />
        <ShopLike />
        
      </div>
    </div>
  );
};

createRoot(getElementByIdRoot()).render(
  <StrictMode>
    <AppProvider>
      <MainRouter />
    </AppProvider>
  </StrictMode>
);

function getElementByIdRoot() {
  return document.getElementById('root')!;
}