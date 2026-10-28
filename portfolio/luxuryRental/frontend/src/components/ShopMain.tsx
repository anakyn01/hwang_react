import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Settings, Heart, User, Home, List, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// ==========================================
// 커스텀 SVG 아이콘 (lucide-react 에러 대체용)
// ==========================================
const ShoppingBagIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

export const ShopMain = () => {
  const { setCurrentView, setActiveOverlay } = useApp();
  const [activeTab, setActiveTab] = useState('20대 여성');

  return (
    <div className="flex flex-col h-full bg-gray-50 relative pb-24 overflow-y-auto scrollbar-hide w-full">
      
      {/* 🌟 PC 화면 좌측에 고정되는 앱 다운로드 & QR 배너 (모바일에서는 hidden으로 숨김) */}
      <div className="hidden lg:flex flex-col fixed left-90 top-1/2 -translate-y-1/2 bg-white border border-gray-200 p-5 rounded-2xl shadow-xl w-64 z-40">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xs">LR</div>
          <div>
            <h5 className="font-extrabold text-xs text-gray-900">명품 구매, 렌트, 판매까지</h5>
            <p className="font-black text-sm text-gray-900">럭셔리 (LUXURYRENTAL)</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-4 rounded-xl mb-4 text-center">
          <p className="text-[11px] text-gray-600 font-bold mb-1">럭셔리앱 다운로드하면</p>
          <p className="text-sm font-black text-indigo-600">최대 10만원 더블 할인!</p>
          <div className="my-3 bg-white p-2 rounded-lg shadow-inner inline-block">
            <div className="w-24 h-24 bg-gray-900 text-white rounded flex items-center justify-center text-[11px] font-bold">
              QR CODE
            </div>
          </div>
        </div>
        <div className="flex justify-around text-[11px] font-bold text-gray-700">
          <span className="flex items-center gap-1 cursor-pointer"><i className="fa-brands fa-google-play"></i> Google Play</span>
          <span className="flex items-center gap-1 cursor-pointer"><i className="fa-brands fa-app-store"></i> App Store</span>
        </div>
      </div>

      {/* 1. Header */}
      <div className="sticky top-0 bg-white z-50 px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-xl font-extrabold tracking-tighter cursor-pointer" onClick={() => setCurrentView('SHOP_MAIN')}>
          LUXURYRENTAL
        </h1>
        <div className="flex items-center gap-4 text-gray-800">
          
          <button onClick={() => setActiveOverlay('SEARCH')}>
            <Search size={24} />
          </button>

          <button onClick={() => setActiveOverlay('LOGIN')}>
            <ShoppingCart size={24} />
          </button>

          <button onClick={() => setCurrentView('SHOP_ADMIN')} className="text-indigo-600 bg-indigo-50 p-1.5 rounded-full hover:bg-indigo-100 transition">
            <Settings size={22} />
          </button>
        </div>
      </div>

      {/* 2. 상단 로그인 인사말 & 간편 로그인 */}
      <div className="p-5 bg-white mb-2">
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-4">
          어서오세요, <span className="text-orange-500">로그인</span> 후<br/>리본즈를 이용해보세요
        </h2>
        <button onClick={() => setActiveOverlay('LOGIN')} className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-lg mb-6 shadow-sm">
          간편 로그인하기
        </button>

        {/* 렌트하기 / 구매하기 / 판매하기 카드 */}
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-pink-50/60 border border-pink-100/60 p-4 rounded-2xl flex flex-col justify-between cursor-pointer" onClick={() => setActiveOverlay('LOGIN')}>
              <div>
                <span className="text-xs bg-pink-500 text-white font-bold px-2 py-0.5 rounded-md inline-block mb-2">첫 렌트 70% 할인</span>
                <h4 className="font-extrabold text-gray-900 text-base">렌트하기</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">특별한 날,<br/>마음껏 렌트하기</p>
              </div>
              <div className="text-right text-2xl mt-3">👗</div>
            </div>

            <div className="bg-blue-50/60 border border-blue-100/60 p-4 rounded-2xl flex flex-col justify-between cursor-pointer" onClick={() => setActiveOverlay('LOGIN')}>
              <div>
                <span className="text-xs bg-blue-500 text-white font-bold px-2 py-0.5 rounded-md inline-block mb-2">정품 보증</span>
                <h4 className="font-extrabold text-gray-900 text-base">구매하기</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">내 마 음에 쏙,<br/>지금 바로 구매하기</p>
              </div>
              <div className="text-right text-2xl mt-3">👜</div>
            </div>
          </div>

          <div className="bg-green-50/60 border border-green-100/60 p-4 rounded-2xl flex justify-between items-center cursor-pointer" onClick={() => setCurrentView('SHOP_SELL')}>
            <div>
              <span className="text-xs bg-green-600 text-white font-bold px-2 py-0.5 rounded-md inline-block mb-1.5">간편 위탁</span>
              <h4 className="font-extrabold text-gray-900 text-base">판매하기</h4>
              <p className="text-[11px] text-gray-500">내 명품, 쉽고 빠르게 판매하기</p>
            </div>
            <div className="text-3xl">🤝</div>
          </div>
        </div>

        {/* 회원가입 이벤트 배너 카드 */}
        <div className="bg-gradient-to-r from-gray-900 to-indigo-950 text-white p-5 rounded-2xl flex justify-between items-center shadow-md mb-6">
          <div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">EVENT</span>
            <h4 className="font-extrabold text-lg mt-1">회원가입 이벤트</h4>
            <p className="text-xs text-gray-300 mt-0.5">간단하게 가입하고 가볍게 쇼핑!</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-sm">
            🎁
          </div>
        </div>

        {/* 리본즈만의 서비스 */}
        <h3 className="font-bold text-lg mb-3 text-gray-900">리본즈만의 서비스</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
            <h4 className="font-bold text-gray-900 text-sm">명품 구독하기</h4>
            <p className="text-[10px] text-gray-500 mt-1">1달 구독료로 무제한 사용</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
            <h4 className="font-bold text-gray-900 text-sm">중고명품 구매</h4>
            <p className="text-[10px] text-gray-500 mt-1">합리적인 명품 소비의 시작</p>
          </div>
        </div>

        {/* 8-Grid 아이콘 메뉴 */}
        <div className="grid grid-cols-4 gap-y-6 gap-x-2 text-center bg-white rounded-2xl shadow-sm border border-gray-50 p-4">
          {[
            { icon: '👗', title: '렌트 소개' }, { icon: '🏷️', title: '70% 할인' },
            { icon: '⏰', title: '오늘신규입고' }, { icon: '👆', title: '베이직멤버십' },
            { icon: '🤲', title: '렌트잇 케어' }, { icon: '👑', title: 'VIP' },
            { icon: '💼', title: '바이백' }, { icon: '💌', title: '친구 초대' }
          ].map((menu, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl">{menu.icon}</div>
              <span className="text-[11px] font-bold text-gray-800">{menu.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 가이드 한눈에 */}
      <div className="p-5 bg-white mb-2">
        <h3 className="font-bold text-lg mb-3 text-gray-900">가이드 한눈에</h3>
        <div className="flex gap-3">
          <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <h4 className="font-bold text-sm text-gray-900">렌트 이용 가이드</h4>
              <p className="text-[10px] text-gray-500 mt-1">예약부터 반납까지<br/>30초 만에 알아보기</p>
            </div>
            <ChevronRight size={16} className="text-gray-400"/>
          </div>
          <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <h4 className="font-bold text-sm text-gray-900">구독 가이드</h4>
              <p className="text-[10px] text-gray-500 mt-1">명품 무제한 교환<br/>30초 만에 알아보기</p>
            </div>
            <ChevronRight size={16} className="text-gray-400"/>
          </div>
        </div>
      </div>

      {/* 4. 맞춤 추천 상품 */}
      <div className="p-5 bg-white mb-2">
        <h3 className="font-bold text-lg mb-3 text-gray-900">회원님이 좋아하실 것 같은 상품</h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
          {['20대 여성', '20대 남성', '30대 여성', '30대 남성', '40대 여성'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border transition ${activeTab === tab ? 'bg-gray-700 text-white border-gray-700' : 'bg-white text-gray-600 border-gray-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { brand: '생로랑', title: '블랙 페이던트 Le 5 A 7 호보...', price: '10,230원', original: '44,400원', discount: '77%', tag: '예약 마감' },
            { brand: '발렌시아가', title: '블랙 르 시티 모토 스몰 숄더백', price: '18,510원', original: '80,400원', discount: '77%', tag: '예약 마감' },
            { brand: '샤넬', title: '블랙 캐비어 호보 미니 토트백', price: '101,600원', original: '170,400원', discount: '41%', tag: '앱전용' },
            { brand: '샤넬', title: '블랙 클래식 플랩 흑장 체인 숄...', price: '24,500원', original: '', discount: '72%', tag: '예약 마감' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="relative aspect-square bg-gray-100 rounded-xl mb-2 flex items-center justify-center overflow-hidden">
                <div className="text-4xl text-gray-300">👜</div>
                <button onClick={() => setActiveOverlay('LOGIN')} className="absolute top-2 right-2 p-1.5 rounded-full bg-white/50 backdrop-blur text-gray-400"><Heart size={16}/></button>
                {item.tag === '예약 마감' && <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-[10px] py-1 font-bold">예약 마감</div>}
              </div>
              <span className="font-bold text-xs">{item.brand}</span>
              <span className="text-[11px] text-gray-600 truncate">{item.title}</span>
              <div className="mt-1 flex items-baseline gap-1">
                {item.discount && <span className="text-red-500 font-bold text-sm">{item.discount}</span>}
                <span className="font-bold text-sm">{item.price}</span>
                <span className="text-[10px] text-gray-400">/3일</span>
              </div>
              {item.original && <span className="text-[10px] text-gray-400 line-through">{item.original}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 5. RENT NEW ARRIVALS */}
      <div className="p-5 bg-white mb-2">
        <h3 className="font-bold text-lg text-gray-900 uppercase">Rent New Arrivals</h3>
        <p className="text-xs text-gray-500 mb-4">매주 수요일 오전 11시 업데이트</p>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          <div className="min-w-[140px] bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col items-center">
            <span className="font-bold text-xs w-full text-left mb-2">발렌시아가</span>
            <div className="text-5xl my-4">🧳</div>
            <span className="text-pink-500 font-bold text-sm">일 40,600원부터</span>
          </div>
          <div className="min-w-[140px] bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col items-center">
            <span className="font-bold text-xs w-full text-left mb-2">크리스찬 디올</span>
            <div className="text-5xl my-4">💍</div>
            <span className="text-pink-500 font-bold text-sm">일 11,100원부터</span>
          </div>
        </div>
      </div>

      {/* 6. 전체보기 버튼 & 푸터 */}
      <div className="bg-white p-5 pt-8">
        <button className="w-full border border-gray-300 py-3 rounded-xl text-sm font-bold text-gray-800 flex justify-center items-center gap-1 mb-10">
          전체보기 <ChevronRight size={16}/>
        </button>

        <footer className="text-xs text-gray-500 border-t border-gray-100 pt-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 font-semibold">
            <span>고객센터</span>
            <span>정책안내</span>
            <span>이용약관</span>
            <span className="font-extrabold text-gray-800">개인정보처리방침</span>
            <span>입점신청</span>
            <span>제휴문의</span>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <button className="flex items-center gap-1 font-bold border px-2 py-1 rounded">
              (주)럭셔리 렌탈 <ChevronRight size={14} className="rotate-90"/>
            </button>
            <div className="flex gap-2">
              <div className="w-8 h-8 border rounded flex justify-center items-center"><InstagramIcon size={16}/></div>
              <div className="w-8 h-8 border rounded flex justify-center items-center"><YoutubeIcon size={16}/></div>
              <div className="w-8 h-8 border rounded flex justify-center items-center font-bold text-[10px]">APP</div>
            </div>
          </div>

          <div className="space-y-1 mb-4 text-[10px]">
            <p className="font-bold text-gray-700">토스페이먼츠 매매보호(에스크로)서비스</p>
            <p>럭셔리렌탈은 고객님이 현금 결제한 금액에 대해 토스페이먼츠와 매매보호 계약을 체결하여 안전거래를 보장하고 있습니다.</p>
            <p className="flex items-center gap-1 text-gray-600 mt-1 cursor-pointer">서비스 가입 확인 <ChevronRight size={10}/></p>
          </div>
          
          <p className="text-[10px] text-gray-400">© 2011-2026 Luxury CO.,LTD ALL RIGHTS RESERVED.</p>
        </footer>
      </div>

      {/* 7. 플로팅 바텀 네비게이션 (Pill Style) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/95 backdrop-blur-md border border-gray-100 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center px-4 py-2 z-50">
        
        <div onClick={() => setCurrentView('SHOP_CATEGORY')} className="flex flex-col items-center gap-1 cursor-pointer w-16">
          <List size={22} className="text-gray-800"/>
          <span className="text-[10px] text-gray-800 font-semibold">카테고리</span>
        </div>
        
        <div onClick={() => setCurrentView('SHOP_SELL')} className="flex flex-col items-center gap-1 cursor-pointer w-16">
          <ShoppingBagIcon size={22} />
          <span className="text-[10px] text-gray-800 font-semibold">내 상품 판매</span>
        </div>
        
        <div className="flex flex-col items-center justify-center cursor-pointer bg-gray-100 rounded-full w-20 h-14">
          <Home size={22} className="text-black mb-0.5"/>
          <span className="text-[10px] text-black font-extrabold">홈</span>
        </div>

        <div onClick={() => setActiveOverlay('LOGIN')} className="flex flex-col items-center gap-1 cursor-pointer w-16">
          <Heart size={22} className="text-gray-800"/>
          <span className="text-[10px] text-gray-800 font-semibold">좋아요</span>
        </div>

        <div onClick={() => setActiveOverlay('LOGIN')} className="flex flex-col items-center gap-1 cursor-pointer w-16">
          <User size={22} className="text-gray-800"/>
          <span className="text-[10px] text-gray-800 font-semibold">마이럭셔리렌탈</span>
        </div>
      </div>
    </div>
  );
};