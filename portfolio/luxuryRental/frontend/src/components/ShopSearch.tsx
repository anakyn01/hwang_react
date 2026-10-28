import React, { useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ShopSearch = () => {
  const { activeOverlay, setActiveOverlay } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 'SEARCH' 상태일 때만 true가 되어 화면에 나타남
  const isOpen = activeOverlay === 'SEARCH';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const recommended = ['Supreme', 'Matin', 'Chrome', '불가리', 'Essentials', '목걸이', '까르띠에', '시계', '르메르', 'BAPE', 'The'];
  const trendingLeft = [
    { rank: 1, name: '샤넬', status: null }, 
    { rank: 2, name: '셀린느', status: null },
    { rank: 3, name: '발렌시아가', status: { type: 'new', text: 'new' } },
    { rank: 4, name: '디올', status: { type: 'up', text: '▲ 1' } },
    { rank: 5, name: '프라다', status: { type: 'down', text: '▼ 1' } },
  ];
  const trendingRight = [
    { rank: 6, name: '루이비통', status: { type: 'down', text: '▼ 3' } },
    { rank: 7, name: '에르메스', status: { type: 'up', text: '▲ 1' } },
    { rank: 8, name: '더로우', status: { type: 'new', text: 'new' } },
    { rank: 9, name: '고야드', status: { type: 'new', text: 'new' } },
    { rank: 10, name: '구찌', status: { type: 'new', text: 'new' } },
  ];

  return (
    // 🚨 isOpen 값에 따라 translate-x-0(열림)과 translate-x-full(숨김/오른쪽으로 밀려남)이 정확히 작동하도록 설정
    <div className={`absolute inset-0 bg-white z-[110] transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      
      {/* 상단 검색바 헤더 */}
      <div className="flex items-center px-4 py-3 gap-3 bg-white border-b border-gray-100">
        <button onClick={() => setActiveOverlay(null)} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <div className="flex-1 border border-gray-900 rounded-md px-3 py-2 flex items-center">
          <input 
            ref={inputRef} 
            type="text" 
            placeholder="검색어를 입력해주세요" 
            className="w-full text-[15px] outline-none placeholder-gray-300 font-medium" 
          />
        </div>
      </div>

      {/* 검색 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-20">
        <h3 className="font-extrabold text-[17px] mb-4 text-gray-900">추천 검색어</h3>
        <div className="flex flex-wrap gap-2.5 mb-10">
          {recommended.map(word => (
            <button key={word} className="bg-gray-50 text-gray-800 text-[13px] px-4 py-2 rounded-full font-medium">
              {word}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-end mb-5">
          <h3 className="font-extrabold text-[17px] text-gray-900">실시간 급상승</h3>
          <span className="text-[12px] text-gray-400">10.28 10:27 기준</span>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-5">
            {trendingLeft.map(item => (
              <div key={item.rank} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-black text-base w-4 text-gray-900">{item.rank}</span>
                  <span className="text-[14px] font-medium text-gray-800">{item.name}</span>
                </div>
                {item.status && <span className="text-[12px] font-bold text-blue-500">{item.status.text}</span>}
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-5">
            {trendingRight.map(item => (
              <div key={item.rank} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-black text-base w-4 text-gray-900">{item.rank}</span>
                  <span className="text-[14px] font-medium text-gray-800">{item.name}</span>
                </div>
                {item.status && <span className="text-[12px] font-bold text-blue-500">{item.status.text}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};