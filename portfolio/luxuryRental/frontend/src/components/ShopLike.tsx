import React from 'react';
import { ChevronLeft, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ShopLike = () => {
  const { activeOverlay, setActiveOverlay } = useApp();
  
  // 'LOGIN' 상태일 때만 화면에 노출 및 슬라이드
  const isOpen = activeOverlay === 'LOGIN';

  return (
    <div className={`absolute inset-0 bg-white z-[100] transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <button onClick={() => setActiveOverlay(null)} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-black" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col items-center pt-16 px-5 pb-10">
        <p className="text-gray-500 text-[13px] font-semibold mb-2">명품을 경험하는 가장 쉬운 방법</p>
        <h1 className="text-4xl font-black tracking-tighter mb-12">LUXURYRENTAL</h1>

        <div className="relative mb-3 flex flex-col items-center">
          <div className="bg-[#4C51F7] text-white text-xs font-bold px-3 py-2 rounded-md relative z-10 shadow-sm">
            지금 가입하면 첫 렌트 70% 할인!
          </div>
          <div className="absolute -bottom-1 w-2.5 h-2.5 bg-[#4C51F7] rotate-45 z-0"></div>
        </div>

        <button className="w-full bg-[#FEE500] text-black text-[15px] font-extrabold py-3.5 rounded-md flex items-center justify-center gap-2 mb-3">
          카카오로 3초만에 계속하기
        </button>
        <button className="w-full bg-white border border-gray-900 text-black text-[15px] font-extrabold py-3.5 rounded-md flex items-center justify-center gap-2 mb-8">
          APPLE로 계속하기
        </button>

        <div className="flex gap-5 mb-12">
          <button className="w-12 h-12 bg-[#03C75A] rounded-full flex items-center justify-center text-white font-black text-xl">N</button>
          <button className="w-12 h-12 bg-[#EA3323] rounded-full flex items-center justify-center text-white font-black text-xl">P</button>
          <button className="w-12 h-12 bg-[#4C51F7] rounded-full flex items-center justify-center text-white"><Mail size={22} /></button>
        </div>

        <p className="text-[13px] text-gray-500">
          계정이 기억나지 않나요? <button className="font-bold underline text-gray-800 ml-1">계정 찾기</button>
        </p>
      </div>
    </div>
  );
};