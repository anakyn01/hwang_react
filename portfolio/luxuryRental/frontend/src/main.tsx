import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { AppProvider, useApp } from './context/AppContext';
import { ShopMain } from './components/ShopMain';
import { ShopAdmin } from './components/ShopAdmin';
import { RecruitApp } from './components/RecruitApp';
import { ShopCategory } from './components/ShopCategory';
import { ShopSell } from './components/ShopSell';
// 🚨 새로 만든 '좋아요(로그인)' 컴포넌트 임포트
import { ShopLike } from './components/ShopLike';

const MainRouter = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans text-gray-900 selection:bg-blue-200">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col overflow-x-hidden shadow-xl">
        
        {currentView === 'SHOP_MAIN' && <ShopMain />}
        {currentView === 'SHOP_ADMIN' && <ShopAdmin />}
        {currentView === 'RECRUIT_APP' && <RecruitApp />}
        {currentView === 'SHOP_CATEGORY' && <ShopCategory />}
        {currentView === 'SHOP_SELL' && <ShopSell />}
        
        {/* 🚨 좋아요(로그인) 라우터 추가 */}
        {currentView === 'SHOP_LIKE' && <ShopLike />}
        
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <MainRouter />
    </AppProvider>
  </StrictMode>
);