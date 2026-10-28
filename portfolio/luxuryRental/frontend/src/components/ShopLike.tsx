import React from 'react';
import { ChevronLeft, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ShopLike = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* 1. 상단 뒤로가기 헤더 */}
      <div className="px-4 py-3">
        <button onClick={() => setCurrentView('SHOP_MAIN')} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-black" />
        </button>
      </div>

      {/* 2. 본문 영역 */}
      <div className="flex-1 flex flex-col items-center pt-20 px-5">
        <p className="text-gray-500 text-[13px] font-semibold mb-2">명품을 경험하는 가장 쉬운 방법</p>
        <h1 className="text-4xl font-black tracking-tighter mb-16">LUXURYRENTAL</h1>

        {/* 3. 할인 툴팁 (말풍선 꼬리 포함) */}
        <div className="relative mb-3 flex flex-col items-center">
          <div className="bg-[#4C51F7] text-white text-xs font-bold px-3 py-2 rounded-md relative z-10 shadow-sm">
            지금 가입하면 첫 렌트 70% 할인!
          </div>
          {/* 말풍선 아래쪽 뾰족한 꼬리 */}
          <div className="absolute -bottom-1 w-2.5 h-2.5 bg-[#4C51F7] rotate-45 z-0"></div>
        </div>

        {/* 4. 카카오 로그인 버튼 */}
        <button className="w-full bg-[#FEE500] text-black text-[15px] font-extrabold py-3.5 rounded-md flex items-center justify-center gap-2 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-5.52 0-10 3.48-10 7.78 0 2.74 1.7 5.16 4.3 6.46-.3.97-1 3.2-1.04 3.44-.06.26.1.26.23.17.1-.06 3.12-2.13 4.36-2.97.7.1 1.42.15 2.15.15 5.52 0 10-3.48 10-7.78C22 6.48 17.52 3 12 3z"/>
          </svg>
          카카오로 3초만에 계속하기
        </button>

        {/* 5. 애플 로그인 버튼 */}
        <button className="w-full bg-white border border-gray-900 text-black text-[15px] font-extrabold py-3.5 rounded-md flex items-center justify-center gap-2 mb-10">
          <svg width="16" height="18" viewBox="0 0 384 512" fill="black">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
          APPLE로 계속하기
        </button>

        {/* 6. 서브 로그인 아이콘 (네이버, 페이코, 이메일) */}
        <div className="flex gap-5 mb-16">
          <button className="w-12 h-12 bg-[#03C75A] rounded-full flex items-center justify-center text-white font-black text-xl shadow-sm">
            N
          </button>
          <button className="w-12 h-12 bg-[#EA3323] rounded-full flex items-center justify-center text-white font-black text-xl shadow-sm">
            P
          </button>
          <button className="w-12 h-12 bg-[#4C51F7] rounded-full flex items-center justify-center text-white shadow-sm">
            <Mail size={22} />
          </button>
        </div>

        {/* 7. 계정 찾기 */}
        <p className="text-[13px] text-gray-500">
          계정이 기억나지 않나요? <button className="font-bold underline text-gray-800 ml-1">계정 찾기</button>
        </p>
      </div>
    </div>
  );
};