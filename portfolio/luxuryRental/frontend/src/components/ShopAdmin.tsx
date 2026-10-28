import React, { useState } from 'react';
import { ShieldCheck, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecruitApp } from './RecruitApp';

export const ShopAdmin = () => {
  const { setCurrentView, products, setProducts } = useApp();
  const [tab, setTab] = useState<'SHOP' | 'RECRUIT'>('SHOP');
  
  const handleAddProduct = () => {
    setProducts([...products, { id: Date.now(), title: '새로운 렌탈 상품', type: 'RENT', price: 50000 }]);
    alert('상품이 임시 등록되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h2 className="font-bold flex items-center gap-2"><ShieldCheck /> 통합 관리자 센터</h2>
        <button onClick={() => setCurrentView('SHOP_MAIN')} className="text-sm bg-gray-700 px-3 py-1 rounded">앱으로 돌아가기</button>
      </div>
      
      <div className="flex bg-white border-b">
        <button onClick={() => setTab('SHOP')} className={`flex-1 py-3 text-sm font-bold ${tab === 'SHOP' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>쇼핑몰 관리</button>
        <button onClick={() => setTab('RECRUIT')} className={`flex-1 py-3 text-sm font-bold ${tab === 'RECRUIT' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>구인/채용 관리</button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {tab === 'SHOP' ? (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">상품 등록 관리</h3>
                <button onClick={handleAddProduct} className="flex items-center gap-1 text-xs bg-indigo-600 text-white px-2 py-1.5 rounded"><PlusCircle size={14}/> 신규 등록</button>
              </div>
              {products.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">등록된 상품이 없습니다.</p>
              ) : (
                <ul className="space-y-2">
                  {products.map(p => (
                    <li key={p.id} className="text-sm bg-gray-50 p-2 rounded flex justify-between">
                      <span>[{p.type}] {p.title}</span> <span className="font-bold">{p.price.toLocaleString()}원</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-140px)]">
             <RecruitApp embeddedAdmin={true} />
          </div>
        )}
      </div>
    </div>
  );
};