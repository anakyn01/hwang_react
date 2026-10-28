import React from 'react';
import { Search, ShoppingCart, Settings, List, Home, Heart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ShoppingBagIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

export const ShopMain = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="flex flex-col h-full bg-gray-50 relative pb-16">
      {/* Header */}
      <div className="sticky top-0 bg-white z-50 px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-xl font-extrabold tracking-tighter cursor-pointer" onClick={() => setCurrentView('SHOP_MAIN')}>
          LUXURYRENTAL
        </h1>
        <div className="flex items-center gap-4 text-gray-800">
          <Search size={24} />
          <ShoppingCart size={24} />
          <button onClick={() => setCurrentView('SHOP_ADMIN')} className="text-indigo-600 bg-indigo-50 p-1.5 rounded-full hover:bg-indigo-100 transition">
            <Settings size={22} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 bg-white">
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-4">
          어서오세요, <span className="text-orange-500">로그인</span> 후<br/>서비스를 이용해보세요
        </h2>
        <button className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-lg mb-6">
          간편 로그인하기
        </button>

        <div className="relative mb-6">
          <span className="absolute -top-3 left-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">첫 렌트 70% 할인</span>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col justify-between aspect-[4/3]">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-2"><span className="text-xl">👗</span></div>
              <div><h3 className="font-bold text-gray-900">렌트하기</h3><p className="text-xs text-gray-500 mt-1 leading-tight">특별한 날,<br/>마음껏 렌트하기</p></div>
            </div>
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col justify-between aspect-[4/3]">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2"><span className="text-xl">👜</span></div>
              <div><h3 className="font-bold text-gray-900">구매하기</h3><p className="text-xs text-gray-500 mt-1 leading-tight">내 마음에 쏙,<br/>지금 바로 구매하기</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">💰</div>
          <div><h3 className="font-bold text-gray-900">판매하기</h3><p className="text-xs text-gray-500 mt-1">내 명품, 쉽고 빠르게 판매하기</p></div>
        </div>
      </div>

      <div className="px-5 mb-8 mt-2">
        <div className="bg-black text-white p-6 rounded-2xl flex justify-between items-center relative overflow-hidden h-32">
          <div className="z-10 relative">
            <h3 className="text-2xl font-bold mb-1">렌트 VIP</h3>
            <p className="text-xs text-gray-300">다양한 혜택으로 누리는 명품 렌트</p>
          </div>
          <div className="text-6xl absolute -right-2 top-2 opacity-90">🛍️</div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-between px-6 py-3 text-gray-400 text-xs">
        <div className="flex flex-col items-center gap-1 cursor-pointer"><List size={20} /><span>카테고리</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer"><ShoppingBagIcon size={20} /><span>내 상품 판매</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer text-black font-semibold"><Home size={20} /><span>홈</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer"><Heart size={20} /><span>좋아요</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer"><User size={20} /><span>마이페이지</span></div>
      </div>
    </div>
  );
};