// src/main.tsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// 1. 상태 관리를 위한 Context 임포트
import { AppProvider, useApp } from './context/AppContext';

// 2. 각 화면(페이지) 역할을 하는 컴포넌트들을 직접 임포트
import { ShopMain } from './components/ShopMain';
import { ShopAdmin } from './components/ShopAdmin';
import { RecruitApp } from './components/RecruitApp';

// 3. 상태(currentView)에 따라 컴포넌트만 교체하는 SPA 라우터 역할
const MainRouter = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans text-gray-900 selection:bg-blue-200">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col overflow-x-hidden shadow-xl">
        
        {/* URL 이동이나 새로고침 없이 컴포넌트만 갈아끼우는 완벽한 SPA 방식 */}
        {currentView === 'SHOP_MAIN' && <ShopMain />}
        {currentView === 'SHOP_ADMIN' && <ShopAdmin />}
        {currentView === 'RECRUIT_APP' && <RecruitApp />}
        
      </div>
    </div>
  );
};

// 4. 앱의 최종 진입점 (렌더링)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <MainRouter />
    </AppProvider>
  </StrictMode>
);