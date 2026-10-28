import React, { useState } from 'react';
import { ChevronLeft, Search, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ShopSell = () => {
  const { setCurrentView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const brands = [
    { ko: '고야드', en: 'Goyard' },
    { ko: '구찌', en: 'Gucci' },
    { ko: '그라프', en: 'Graff' },
    { ko: '까르띠에', en: 'Cartier' },
    { ko: '끌로에', en: 'Chloe' },
    { ko: '다미아니', en: 'Damiani' },
    { ko: '더 로우', en: 'The Row' },
    { ko: '델보', en: 'Delvaux' },
    { ko: '드래곤 디퓨전', en: 'Dragon Diffusion' },
    { ko: '디젤', en: 'Diesel' },
    { ko: '로로피아나', en: 'Loro Piana' },
    { ko: '로에베', en: 'Loewe' },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 1. 상단 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <button onClick={() => setCurrentView('SHOP_MAIN')} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-[15px] font-bold text-gray-900 flex-1 text-center pr-6">브랜드 선택</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* 2. 타이틀 */}
        <h2 className="text-[20px] font-bold text-gray-900 leading-snug mt-4 mb-5 px-5">
          판매할 상품의<br/>브랜드명을 검색해주세요
        </h2>

        {/* 3. 검색창 */}
        <div className="px-5 mb-4">
          <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:border-black transition-colors">
            <input 
              type="text" 
              placeholder="브랜드명을 검색해주세요." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-[15px] placeholder-gray-400 outline-none"
            />
            <Search size={20} className="text-gray-600" />
          </div>
        </div>

        {/* 4. 직접 등록 링크 */}
        <div className="flex justify-center mb-6">
          <button className="text-[13px] text-gray-700 font-semibold flex items-center gap-1 hover:text-black">
            원하는 브랜드가 없다면 직접 등록해보세요 <ChevronRight size={14} className="text-gray-700" />
          </button>
        </div>

        {/* 5. 브랜드 리스트 */}
        <div className="flex flex-col border-t border-gray-50 pt-2">
          {brands.filter(b => b.ko.includes(searchQuery) || b.en.toLowerCase().includes(searchQuery.toLowerCase())).map((brand, idx) => (
            <div key={idx} className="flex justify-between items-center py-4 px-5 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[15px] text-gray-900">{brand.ko}</span>
                <span className="text-gray-200 font-light text-[14px]">|</span>
                <span className="text-gray-400 text-[15px] font-medium">{brand.en}</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};