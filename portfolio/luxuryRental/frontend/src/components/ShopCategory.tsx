import React, { useState } from 'react';
import { ChevronLeft, MessageCircle, ShoppingCart, ChevronRight, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ShopCategory = () => {
  const { setCurrentView } = useApp();
  const [mainTab, setMainTab] = useState<'CATEGORY' | 'BRAND'>('CATEGORY');
  const [subTab, setSubTab] = useState('여성');
  const [leftActive, setLeftActive] = useState('가방/핸드백');
  const [activeBrand, setActiveBrand] = useState('루이비통');

  const leftCategories = ['가방/핸드백', '의류', '슈즈', '지갑', '패션잡화', '시계/액세서리', '골프', '화장품/향수'];
  const rightSubCategories = ['전체', '토트백', '숄더백/호보백', '크로스/메신저백', '버킷백', '클러치/파우치', '백팩', '벨트백/힙색', '서류가방', '여행가방'];

  const brands = [
    { name: '루이비통', icon: '👜' }, { name: '스톤 아일랜드', icon: '👕' },
    { name: '구찌', icon: '🎒' }, { name: '샤넬', icon: '👛' },
    { name: 'CP 컴퍼니', icon: '🧥' }, { name: '셀린느', icon: '🛍️' }
  ];

  const brandProducts = [
    { tag: 'N', isExcellent: false, title: '핑크 LV 에센셜 머플러', price: '15,800원', discount: '', unit: '/1일' },
    { tag: '', isExcellent: true, title: '프라다 레더 체인 숄더백 1BD...', price: '817,800원', discount: '6%', unit: '' },
    { tag: '', isExcellent: true, title: '루이비통 M41526 모노그램 ...', price: '902,100원', discount: '7%', unit: '' },
    { tag: '', isExcellent: false, title: '블랙 앙프렝뜨 이지 파우치 온 ...', price: '17,800원', discount: '', unit: '/1일' },
    { tag: '', isExcellent: true, title: '루이비통 블랙 에삐 레더 미라...', price: '1,220,000원', discount: '', unit: '' },
    { tag: '', isExcellent: true, title: '루이비통 모노그램 NN14 이...', price: '1,480,000원', discount: '', unit: '' },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 1. 상단 헤더 */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
        <button onClick={() => setCurrentView('SHOP_MAIN')}><ChevronLeft size={24} className="text-gray-800" /></button>
        <h1 className="text-base font-bold text-gray-900">카테고리</h1>
        <div className="flex gap-4">
          <MessageCircle size={22} className="text-gray-800" />
          <ShoppingCart size={22} className="text-gray-800" />
        </div>
      </div>

      {/* 2. 메인 탭 (카테고리 / 브랜드) */}
      <div className="flex border-b border-gray-200 px-4">
        <button 
          onClick={() => setMainTab('CATEGORY')}
          className={`flex-1 py-3 text-[15px] font-bold text-center border-b-2 transition ${mainTab === 'CATEGORY' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
        >
          카테고리
        </button>
        <button 
          onClick={() => setMainTab('BRAND')}
          className={`flex-1 py-3 text-[15px] font-bold text-center border-b-2 transition ${mainTab === 'BRAND' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
        >
          브랜드
        </button>
      </div>

      {/* 3-A. 카테고리 뷰 */}
      {mainTab === 'CATEGORY' && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex px-4 border-b border-gray-100">
            {['여성', '남성', '아동'].map(tab => (
              <button 
                key={tab} onClick={() => setSubTab(tab)}
                className={`py-3 mr-6 text-sm font-bold border-b-2 transition ${subTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex flex-1 overflow-hidden">
            {/* 좌측 LNB */}
            <div className="w-[100px] bg-gray-100 overflow-y-auto scrollbar-hide py-2">
              {leftCategories.map(cat => (
                <button
                  key={cat} onClick={() => setLeftActive(cat)}
                  className={`w-full text-left px-4 py-4 text-[13px] ${leftActive === cat ? 'bg-white font-bold text-black' : 'text-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* 우측 콘텐츠 */}
            <div className="flex-1 bg-white overflow-y-auto scrollbar-hide p-5">
              <div className="flex justify-between gap-2 mb-6">
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <div className="bg-gray-50 rounded-xl aspect-square w-full flex items-center justify-center text-4xl">👞</div>
                  <span className="text-[10px] text-center font-semibold text-gray-800 break-keep">여성 오늘의 스니커즈</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <div className="bg-gray-50 rounded-xl aspect-square w-full flex items-center justify-center text-4xl">💍</div>
                  <span className="text-[10px] text-center font-semibold text-gray-800 break-keep">여성 요즘 이게 잘 나갑니다</span>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <div className="bg-gray-50 rounded-xl aspect-square w-full flex items-center justify-center text-4xl">🧥</div>
                  <span className="text-[10px] text-center font-semibold text-gray-800 break-keep">여성 옷장 업데이트</span>
                </div>
              </div>
              <div className="border-t border-gray-100">
                {rightSubCategories.map((sub, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50 cursor-pointer">
                    <span className="text-[13px] text-gray-800 font-semibold">{sub}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3-B. 브랜드 뷰 */}
      {mainTab === 'BRAND' && (
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <h2 className="font-extrabold text-lg mb-4">인기 브랜드 10</h2>
          
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 mb-6">
            {brands.map((brand, i) => (
              <div key={i} onClick={() => setActiveBrand(brand.name)} className="flex flex-col items-center gap-2 cursor-pointer min-w-[60px]">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${activeBrand === brand.name ? 'border-2 border-blue-600 bg-blue-50' : 'bg-gray-100'}`}>
                  {brand.icon}
                </div>
                <span className={`text-[11px] font-bold ${activeBrand === brand.name ? 'text-blue-600' : 'text-gray-600'}`}>{brand.name}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-6 mb-6">
            {brandProducts.map((item, i) => (
              <div key={i} className="flex flex-col">
                <div className="relative aspect-square bg-gray-100 rounded-xl mb-2 flex items-center justify-center">
                  <div className="text-4xl text-gray-300">👜</div>
                  <button className="absolute top-2 right-2 text-gray-400"><Heart size={18}/></button>
                  {item.tag === 'N' && <div className="absolute bottom-2 left-2 bg-black text-white text-[9px] font-bold w-4 h-4 flex justify-center items-center rounded-sm">N</div>}
                  {item.isExcellent && <div className="absolute top-2 left-2 bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded-sm">EXCELLENT</div>}
                </div>
                <span className="font-extrabold text-xs text-gray-900">{activeBrand}</span>
                <span className="text-[11px] text-gray-600 truncate">{item.title}</span>
                <div className="mt-1 flex items-baseline gap-1">
                  {item.discount && <span className="text-teal-600 font-bold text-sm">{item.discount}</span>}
                  <span className="font-extrabold text-sm text-gray-900">{item.price}</span>
                  {item.unit && <span className="text-[10px] text-gray-400">{item.unit}</span>}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full border border-gray-300 py-3 rounded-xl text-sm font-bold text-gray-800 flex justify-center items-center gap-1 mb-8">
            {activeBrand} 상품 더보기 <ChevronRight size={16}/>
          </button>
        </div>
      )}
    </div>
  );
};