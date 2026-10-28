import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ShopAdmin = () => {
  const { setCurrentView, products, setProducts } = useApp();
  const [mainTab, setMainTab] = useState<'SHOP' | 'RECRUIT'>('RECRUIT');
  
  const [role, setRole] = useState<'STORE' | 'ADMIN'>('STORE');
  const [recruitTab, setRecruitTab] = useState<'dashboard' | 'request' | 'workers' | 'chat'>('dashboard');

  // 글래스모피즘 커스텀 팝업 상태 관리
  const [modal, setModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm?: () => void }>({
    isOpen: false,
    title: '',
    message: ''
  });

  const showAlert = (title: string, message: string, onConfirm?: () => void) => {
    setModal({ isOpen: true, title, message, onConfirm });
  };

  const closeModal = () => {
    if (modal.onConfirm) modal.onConfirm();
    setModal({ isOpen: false, title: '', message: '' });
  };

  const [requests, setRequests] = useState([
    { id: 1, storeName: '강남본점', date: '2026-10-31', section: '홀 서빙', time: '10:00 - 15:00', breakTime: '30분', required: 2, hired: 1, status: '채용중', partner: '' },
    { id: 2, storeName: '홍대점', date: '2026-11-01', section: '카운터', time: '12:00 - 20:00', breakTime: '60분', required: 1, hired: 0, status: '채용중', partner: '김지인' }
  ]);

  const [workers, setWorkers] = useState([
    { id: 1, name: '김철수', phone: '010-1234-5678', exp: '홀 서빙 1년' },
    { id: 2, name: '이영희', phone: '010-8765-4321', exp: '카운터 2년' }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: '강남본점', text: '오늘 저녁 타임 구인 급합니다!', time: '10:30 AM', isMine: false }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [newReq, setNewReq] = useState({ storeName: '강남본점', date: '', section: '홀 서빙', time: '10:00 - 15:00', breakTime: '30분', required: 1, partner: '' });

  const handleAddProduct = () => {
    setProducts([...products, { id: Date.now(), title: '프리미엄 렌탈 상품', type: 'RENT', price: 50000 }]);
    showAlert('상품 등록 완료', '새로운 렌탈 상품이 성공적으로 등록되었습니다.');
  };

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequests([...requests, { id: Date.now(), ...newReq, hired: 0, status: '채용중' }]);
    showAlert('구인 요청 접수', '구인 요청이 담당자 화면에 즉시 접수되었습니다.', () => setRecruitTab('dashboard'));
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: role === 'ADMIN' ? '담당자' : '매장', text: inputMsg, time: '방금', isMine: true }]);
    setInputMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-gray-100 flex flex-col w-full font-sans relative">
      
      {/* 🌟 글래스모피즘 커스텀 팝업 모달 */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="backdrop-blur-2xl bg-zinc-900/80 border border-white/20 w-full max-w-md p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-white shadow-inner">
              <i className="fa-solid fa-circle-check text-xl"></i>
            </div>
            <h3 className="text-lg font-black text-white mb-2">{modal.title}</h3>
            <p className="text-xs text-gray-300 mb-6 leading-relaxed">{modal.message}</p>
            <button 
              onClick={closeModal} 
              className="w-full bg-white text-black hover:bg-gray-200 font-black py-3.5 rounded-xl shadow-xl transition text-sm"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 1. 최상단 글래스모피즘 헤더 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10 shadow-xl w-full">
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 shadow-inner text-white">
              <i className="fa-solid fa-shield-halved text-base"></i>
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight text-white">LUXURY RENTAL</h1>
              <p className="text-[11px] text-gray-400 font-medium">통합 관리자 센터</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-sm">
              <button 
                onClick={() => setMainTab('SHOP')} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mainTab === 'SHOP' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-store mr-1.5"></i> 쇼핑몰 관리
              </button>
              <button 
                onClick={() => setMainTab('RECRUIT')} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${mainTab === 'RECRUIT' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-user-tie mr-1.5"></i> 구인/채용 관리
              </button>
            </div>

            <button 
              onClick={() => setCurrentView('SHOP_MAIN')} 
              className="text-xs bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2.5 rounded-xl font-bold transition shadow flex items-center gap-2"
            >
              <i className="fa-solid fa-mobile-screen"></i> 앱으로 돌아가기
            </button>
          </div>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 (최대 폭 1800px 적용) */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto p-6 lg:p-12 flex flex-col">
        
        {/* [A] 쇼핑몰 관리 탭 */}
        {mainTab === 'SHOP' && (
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-black text-white">상품 등록 및 배너 관리</h2>
                  <p className="text-xs text-gray-400 mt-1">스토어에 노출되는 렌탈 및 판매 상품을 관리합니다.</p>
                </div>
                <button onClick={handleAddProduct} className="flex items-center gap-2 text-xs bg-white text-black hover:bg-gray-200 px-5 py-3 rounded-xl font-extrabold shadow-lg transition">
                  <i className="fa-solid fa-plus"></i> 신규 상품 등록
                </button>
              </div>
              {products.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                  <p className="text-sm text-gray-400">등록된 상품이 없습니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center backdrop-blur-md">
                      <div>
                        <span className="text-[10px] bg-white/10 text-gray-200 font-bold px-2.5 py-1 rounded-md mr-2">[{p.type}]</span>
                        <span className="font-bold text-white text-sm">{p.title}</span>
                      </div>
                      <span className="font-black text-white text-base">{p.price.toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* [B] 구인/채용 관리 시스템 */}
        {mainTab === 'RECRUIT' && (
          <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl flex flex-col flex-1 overflow-hidden">
            
            {/* 서브 헤더 및 모드 전환 */}
            <div className="border-b border-white/10 px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-white">
                  <i className="fa-solid fa-chart-pie"></i>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg tracking-tight">스마트 구인·채용 관리 시스템</h3>
                  <p className="text-xs text-gray-400">메신저 없이 실시간으로 지점 구인과 충원 현황을 조율합니다.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs bg-white/10 text-gray-300 font-semibold px-3.5 py-1.5 rounded-full border border-white/10">
                  {role === 'STORE' ? '매장 화면 (35개 지점 연동)' : '본사 담당자 관리 화면'}
                </span>
                <button 
                  onClick={() => setRole(role === 'STORE' ? 'ADMIN' : 'STORE')} 
                  className="text-xs bg-white text-black hover:bg-gray-200 px-4 py-2.5 rounded-xl font-black shadow transition"
                >
                  {role === 'STORE' ? '담당자 화면으로 전환' : '매장 화면으로 전환'}
                </button>
              </div>
            </div>

            {/* 네비게이션 탭 */}
            <div className="flex border-b border-white/10 px-8 gap-4 bg-white/[0.01]">
              <button 
                onClick={() => setRecruitTab('dashboard')} 
                className={`py-4 text-sm font-bold border-b-2 transition-all px-2 flex items-center gap-2 ${recruitTab === 'dashboard' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-table-columns"></i> 채용 현황 및 접수 리스트
              </button>
              {role === 'STORE' && (
                <button 
                  onClick={() => setRecruitTab('request')} 
                  className={`py-4 text-sm font-bold border-b-2 transition-all px-2 flex items-center gap-2 ${recruitTab === 'request' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                  <i className="fa-solid fa-file-pen"></i> 신규 구인 요청 작성
                </button>
              )}
              <button 
                onClick={() => setRecruitTab('workers')} 
                className={`py-4 text-sm font-bold border-b-2 transition-all px-2 flex items-center gap-2 ${recruitTab === 'workers' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-users-gear"></i> 근무자 DB & 단체 문자
              </button>
              <button 
                onClick={() => setRecruitTab('chat')} 
                className={`py-4 text-sm font-bold border-b-2 transition-all px-2 flex items-center gap-2 ${recruitTab === 'chat' ? 'border-white text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <i className="fa-solid fa-comments"></i> 실시간 소통 및 채팅
              </button>
            </div>

            {/* 본문 컨텐츠 (모든 탭에서 동일하게 1800px 와이드 그리드로 꽉 차게 정렬) */}
            <div className="p-8 lg:p-12 flex-1 overflow-y-auto space-y-8">
              
              {/* 1. 대시보드 탭 */}
              {recruitTab === 'dashboard' && (
                <div className="space-y-8">
                  {role === 'ADMIN' && (
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-md">
                      <div>
                        <h4 className="font-bold text-white text-sm">담당자 전용 엑셀 업로드 도구</h4>
                        <p className="text-xs text-gray-400 mt-0.5">엑셀 파일을 일괄 업로드하여 35개 매장의 구인 현황을 실시간 반영합니다.</p>
                      </div>
                      <button onClick={() => showAlert('엑셀 업로드', '엑셀 파일(.xlsx) 일괄 업로드 창이 열렸습니다.')} className="bg-white text-black hover:bg-gray-200 text-xs font-extrabold px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg transition">
                        <i className="fa-solid fa-file-excel"></i> 엑셀 구인현황 업로드
                      </button>
                    </div>
                  )}

                  {/* 통계 카드 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                      <span className="text-xs text-gray-400 font-semibold">총 구인 요청</span>
                      <p className="text-3xl font-black text-white mt-2">{requests.length} 건</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                      <span className="text-xs text-gray-400 font-semibold">진행중 (채용중)</span>
                      <p className="text-3xl font-black text-amber-400 mt-2">{requests.filter(r => r.status === '채용중').length} 건</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                      <span className="text-xs text-gray-400 font-semibold">충원 완료</span>
                      <p className="text-3xl font-black text-emerald-400 mt-2">{requests.filter(r => r.hired >= r.required).length} 건</p>
                    </div>
                  </div>

                  {/* 요청 리스트 */}
                  <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
                    <h4 className="font-black text-white text-base mb-6 flex items-center gap-2">
                      <i className="fa-solid fa-list-check text-gray-300"></i> 
                      {role === 'STORE' ? '우리 매장 구인 신청 및 충원 현황 명단' : '전체 35개 매장 구인 요청 실시간 접수 리스트'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {requests.map(req => (
                        <div key={req.id} className="bg-black/30 border border-white/10 p-6 rounded-2xl flex flex-col justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2.5 mb-2">
                              <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">{req.status}</span>
                              <span className="font-black text-base text-white">{req.storeName}</span>
                              <span className="text-xs text-gray-400">| {req.section}</span>
                            </div>
                            <p className="text-xs text-gray-300"><i className="fa-regular fa-clock mr-1"></i> 일정: {req.date} ({req.time} / 휴게 {req.breakTime})</p>
                            {req.partner && <p className="text-xs text-indigo-300 font-semibold mt-1"><i className="fa-solid fa-user-plus mr-1"></i> 지인파트너: {req.partner}</p>}
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div>
                              <span className="text-xs text-gray-400">충원 인원: </span>
                              <span className="font-black text-base text-white ml-1">{req.hired} / {req.required} 명</span>
                            </div>
                            {role === 'ADMIN' ? (
                              <button onClick={() => showAlert('채용 결과 등록', '해당 근무자의 최종 채용 결과가 등록되었습니다.')} className="bg-white text-black hover:bg-gray-200 text-xs font-black px-4 py-2 rounded-xl shadow">
                                채용 결과 등록
                              </button>
                            ) : (
                              <button onClick={() => showAlert('TO 변경 요청 완료', '미충원 TO 변경 요청이 본사 담당자에게 전송되었습니다.')} className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
                                TO 변경요청
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. 구인 요청 작성 탭 (가로폭 꽉 차게 와이드 확장) */}
              {recruitTab === 'request' && role === 'STORE' && (
                <div className="bg-white/5 border border-white/10 p-8 lg:p-12 rounded-3xl backdrop-blur-md w-full">
                  <h4 className="font-black text-white text-xl mb-2">신규 구인 요청 작성</h4>
                  <p className="text-xs text-gray-400 mb-8">날짜, 근무시간, 파트 및 필요 인원을 선택하여 입력하면 담당자 화면에 즉시 접수됩니다.</p>
                  
                  <form onSubmit={handleAddRequest} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-2">매장 선택</label>
                      <select value={newReq.storeName} onChange={e => setNewReq({...newReq, storeName: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-medium text-white outline-none">
                        <option value="강남본점" className="bg-zinc-900">강남본점</option>
                        <option value="홍대점" className="bg-zinc-900">홍대점</option>
                        <option value="잠실점" className="bg-zinc-900">잠실점</option>
                        <option value="성수점" className="bg-zinc-900">성수점</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">근무 날짜</label>
                        <input type="date" value={newReq.date} onChange={e => setNewReq({...newReq, date: e.target.value})} required className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">파트 (섹션)</label>
                        <select value={newReq.section} onChange={e => setNewReq({...newReq, section: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm font-medium text-white outline-none">
                          <option value="홀 서빙" className="bg-zinc-900">홀 서빙</option>
                          <option value="카운터" className="bg-zinc-900">카운터</option>
                          <option value="주방 보조" className="bg-zinc-900">주방 보조</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">출퇴근 시간</label>
                        <input type="text" value={newReq.time} onChange={e => setNewReq({...newReq, time: e.target.value})} placeholder="예: 10:00 - 15:00" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none placeholder-gray-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">휴게 시간</label>
                        <input type="text" value={newReq.breakTime} onChange={e => setNewReq({...newReq, breakTime: e.target.value})} placeholder="예: 30분" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none placeholder-gray-600" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">필요 인원</label>
                        <input type="number" min="1" value={newReq.required} onChange={e => setNewReq({...newReq, required: Number(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">지인파트너 등록 (선택)</label>
                        <input type="text" value={newReq.partner} onChange={e => setNewReq({...newReq, partner: e.target.value})} placeholder="추천 지인 이름 입력" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none placeholder-gray-600" />
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-black py-4 rounded-xl shadow-xl transition mt-6 text-base">
                      구인 요청 즉시 등록 및 전송
                    </button>
                  </form>
                </div>
              )}

              {/* 3. 근무자 DB 탭 */}
              {recruitTab === 'workers' && (
                <div className="space-y-6 w-full">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-md">
                    <div>
                      <h4 className="font-bold text-white text-base">근무자 DB 관리</h4>
                      <p className="text-xs text-gray-400">매장별 파트타임 및 상시 근무자 인적사항을 통합 관리합니다.</p>
                    </div>
                    <button onClick={() => showAlert('근무자 등록', '신규 근무자 등록 창이 열렸습니다.')} className="bg-white text-black hover:bg-gray-200 text-xs font-black px-5 py-3 rounded-xl shadow">
                      + 근무자 등록
                    </button>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-bold text-white text-sm">등록된 근무자 리스트 ({workers.length}명)</h4>
                      <button onClick={() => showAlert('단체 문자 발송', '선택된 근무자 대상 단체 문자 발송이 완료되었습니다.')} className="bg-white text-black hover:bg-gray-200 text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-2 shadow">
                        <i className="fa-solid fa-paper-plane"></i> 선택 대상 단체 문자 발송
                      </button>
                    </div>
                    <div className="space-y-3">
                      {workers.map(w => (
                        <div key={w.id} className="bg-black/30 border border-white/10 p-4 rounded-xl flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-white rounded accent-white" />
                            <div>
                              <span className="font-bold text-white text-sm">{w.name}</span>
                              <span className="text-xs text-gray-400 ml-2">({w.phone})</span>
                            </div>
                          </div>
                          <span className="text-xs bg-white/10 text-gray-200 font-semibold px-3 py-1 rounded-lg">{w.exp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. 실시간 채팅 탭 */}
              {recruitTab === 'chat' && (
                <div className="bg-white/5 border border-white/10 rounded-3xl shadow-2xl flex flex-col h-[650px] w-full backdrop-blur-md overflow-hidden">
                  <div className="p-5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
                    <span className="font-extrabold text-sm text-white">실시간 소통 채널 (구인·결근·지각·조퇴 문의)</span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">● 실시간 연결됨</span>
                  </div>
                  
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {messages.map(m => (
                      <div key={m.id} className={`flex flex-col ${m.isMine ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-gray-400 mb-1">{m.sender} · {m.time}</span>
                        <div className={`p-4 rounded-2xl text-sm max-w-md shadow-lg ${m.isMine ? 'bg-white text-black font-medium rounded-tr-none' : 'bg-white/10 border border-white/10 text-white rounded-tl-none'}`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-white/10 bg-white/[0.02] flex gap-3">
                    <input 
                      type="text" 
                      value={inputMsg} 
                      onChange={e => setInputMsg(e.target.value)} 
                      onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      placeholder="메시지를 입력하세요 (예: 강남본점 조퇴 인원 발생 충원 요청)..." 
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white outline-none placeholder-gray-500"
                    />
                    <button onClick={handleSendMessage} className="bg-white text-black hover:bg-gray-200 px-6 py-3.5 rounded-xl font-black flex items-center gap-2 shadow-lg transition">
                      <i className="fa-solid fa-paper-plane"></i> 전송
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>
    </div>
  );
};