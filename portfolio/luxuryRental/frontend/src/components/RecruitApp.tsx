import React, { useState } from 'react';
import { 
  LayoutDashboard, Send, Upload, FileText, PlusCircle, Users, MessageSquare, ShieldCheck
} from 'lucide-react';

export const RecruitApp = () => {
  const [role, setRole] = useState<'STORE' | 'ADMIN'>('STORE');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'request' | 'workers' | 'chat'>('dashboard');

  // 상태 데이터
  const [requests, setRequests] = useState([
    { id: 1, storeName: '강남본점', date: '2026-10-31', section: '홀 서빙', time: '10:00 - 15:00', breakTime: '30분', required: 2, hired: 1, status: '채용중' as const, partner: '' },
    { id: 2, storeName: '홍대점', date: '2026-11-01', section: '카운터', time: '12:00 - 20:00', breakTime: '60분', required: 1, hired: 0, status: '채용중' as const, partner: '김지인' }
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

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequests([...requests, { id: Date.now(), ...newReq, hired: 0, status: '채용중' }]);
    alert('구인 요청이 즉시 접수되었습니다.');
    setActiveTab('dashboard');
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: role === 'ADMIN' ? '담당자' : '매장', text: inputMsg, time: '방금', isMine: true }]);
    setInputMsg('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative w-full">
      {/* 상단 서브 네비게이션 탭 */}
      <div className="flex bg-white border-b border-gray-200 shadow-sm overflow-x-auto">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex-1 min-w-[80px] py-3 text-xs sm:text-sm font-bold border-b-2 transition text-center ${activeTab === 'dashboard' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-gray-500'}`}
        >
          📊 현황
        </button>
        {role === 'STORE' && (
          <button 
            onClick={() => setActiveTab('request')} 
            className={`flex-1 min-w-[80px] py-3 text-xs sm:text-sm font-bold border-b-2 transition text-center ${activeTab === 'request' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-gray-500'}`}
          >
            ➕ 요청작성
          </button>
        )}
        <button 
          onClick={() => setActiveTab('workers')} 
          className={`flex-1 min-w-[80px] py-3 text-xs sm:text-sm font-bold border-b-2 transition text-center ${activeTab === 'workers' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-gray-500'}`}
        >
          👥 근무자DB
        </button>
        <button 
          onClick={() => setActiveTab('chat')} 
          className={`flex-1 min-w-[80px] py-3 text-xs sm:text-sm font-bold border-b-2 transition text-center ${activeTab === 'chat' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-gray-500'}`}
        >
          💬 채팅·소통
        </button>
      </div>

      {/* 본문 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        
        {/* 현황 대시보드 탭 */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4 max-w-4xl mx-auto w-full">
            {role === 'ADMIN' && (
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="font-bold text-indigo-900 text-sm">담당자 전용 엑셀 업로드 도구</h3>
                  <p className="text-xs text-indigo-700">엑셀 파일을 업로드하여 35개 매장의 구인 현황을 일괄 반영할 수 있습니다.</p>
                </div>
                <button onClick={() => alert('엑셀 파일 업로드 창이 열립니다.')} className="bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow hover:bg-indigo-700">
                  <Upload size={14} /> 엑셀 구인현황 업로드
                </button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
                <span className="text-xs text-gray-400 font-semibold">총 구인 요청</span>
                <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">{requests.length} 건</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
                <span className="text-xs text-gray-400 font-semibold">진행중 (채용중)</span>
                <p className="text-xl sm:text-2xl font-black text-orange-500 mt-1">{requests.filter(r => r.status === '채용중').length} 건</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
                <span className="text-xs text-gray-400 font-semibold">충원 완료</span>
                <p className="text-xl sm:text-2xl font-black text-green-600 mt-1">{requests.filter(r => r.hired >= r.required).length} 건</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-indigo-600" /> 
                {role === 'STORE' ? '우리 매장 구인 신청 및 충원 현황 명단' : '전체 35개 매장 구인 요청 실시간 접수 리스트'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {requests.map(req => (
                  <div key={req.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700">{req.status}</span>
                        <span className="font-extrabold text-sm text-gray-900">{req.storeName}</span>
                        <span className="text-xs text-gray-500">| {req.section}</span>
                      </div>
                      <p className="text-xs text-gray-600">일정: {req.date} ({req.time} / 휴게 {req.breakTime})</p>
                      {req.partner && <p className="text-xs text-indigo-600 font-semibold mt-1">지인파트너: {req.partner}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <div>
                        <span className="text-[10px] text-gray-400">충원 인원: </span>
                        <span className="font-black text-sm text-indigo-600">{req.hired} / {req.required} 명</span>
                      </div>
                      {role === 'ADMIN' ? (
                        <button onClick={() => alert('채용 결과 등록 모달이 열립니다.')} className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow">
                          채용 결과 등록
                        </button>
                      ) : (
                        <button onClick={() => alert('미충원 TO 변경 요청이 전송되었습니다.')} className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-100">
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

        {/* 구인 요청 작성 탭 */}
        {activeTab === 'request' && role === 'STORE' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm max-w-2xl mx-auto w-full">
            <h3 className="font-bold text-base text-gray-900 mb-1">신규 구인 요청 작성</h3>
            <p className="text-xs text-gray-500 mb-6">날짜, 근무시간, 파트 및 필요 인원을 선택하여 입력하면 담당자 화면에 즉시 접수됩니다.</p>
            
            <form onSubmit={handleAddRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">매장 선택</label>
                <select value={newReq.storeName} onChange={e => setNewReq({...newReq, storeName: e.target.value})} className="w-full border rounded-xl p-3 text-sm font-medium bg-gray-50">
                  <option value="강남본점">강남본점</option>
                  <option value="홍대점">홍대점</option>
                  <option value="잠실점">잠실점</option>
                  <option value="성수점">성수점</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">근무 날짜</label>
                  <input type="date" value={newReq.date} onChange={e => setNewReq({...newReq, date: e.target.value})} required className="w-full border rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">파트 (섹션)</label>
                  <select value={newReq.section} onChange={e => setNewReq({...newReq, section: e.target.value})} className="w-full border rounded-xl p-3 text-sm font-medium bg-gray-50">
                    <option value="홀 서빙">홀 서빙</option>
                    <option value="카운터">카운터</option>
                    <option value="주방 보조">주방 보조</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">출퇴근 시간</label>
                  <input type="text" value={newReq.time} onChange={e => setNewReq({...newReq, time: e.target.value})} placeholder="예: 10:00 - 15:00" className="w-full border rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">휴게 시간</label>
                  <input type="text" value={newReq.breakTime} onChange={e => setNewReq({...newReq, breakTime: e.target.value})} placeholder="예: 30분" className="w-full border rounded-xl p-3 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">필요 인원</label>
                  <input type="number" min="1" value={newReq.required} onChange={e => setNewReq({...newReq, required: Number(e.target.value)})} className="w-full border rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">지인파트너 등록 (선택)</label>
                  <input type="text" value={newReq.partner} onChange={e => setNewReq({...newReq, partner: e.target.value})} placeholder="추천 지인 이름 입력" className="w-full border rounded-xl p-3 text-sm" />
                </div>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow transition mt-4">
                구인 요청 즉시 등록 및 전송
              </button>
            </form>
          </div>
        )}

        {/* 근무자 DB 및 단체 문자 탭 */}
        {activeTab === 'workers' && (
          <div className="space-y-4 max-w-3xl mx-auto w-full">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">근무자 DB 관리</h3>
                <p className="text-xs text-gray-500">매장별 파트타임 및 상시 근무자 인적사항을 통합 관리합니다.</p>
              </div>
              <button onClick={() => alert('신규 근무자 등록 창')} className="bg-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow">
                + 근무자 등록
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-gray-800">등록된 근무자 리스트 ({workers.length}명)</h3>
                <button onClick={() => alert('선택 대상 단체 문자 발송 완료')} className="bg-green-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow">
                  <Send size={14} /> 선택 대상 단체 문자 발송
                </button>
              </div>
              <div className="space-y-2">
                {workers.map(w => (
                  <div key={w.id} className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                      <div>
                        <span className="font-bold text-sm text-gray-900">{w.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({w.phone})</span>
                      </div>
                    </div>
                    <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-lg">{w.exp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 실시간 소통 및 채팅 탭 */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[500px] max-w-3xl mx-auto w-full">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <span className="font-bold text-sm text-gray-800">실시간 소통 채널 (구인·결근·지각·조퇴 문의)</span>
              <span className="text-xs text-green-600 font-bold">● 실시간 연결됨</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/30">
              {messages.map(m => (
                <div key={m.id} className={`flex flex-col ${m.isMine ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-gray-500 mb-1">{m.sender} · {m.time}</span>
                  <div className={`p-3 rounded-2xl text-sm max-w-sm shadow-sm ${m.isMine ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
              <input 
                type="text" 
                value={inputMsg} 
                onChange={e => setInputMsg(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="메시지 입력 (예: 강남본점 조퇴 인원 발생 충원 요청)..." 
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-600"
              />
              <button onClick={handleSendMessage} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-1 shadow">
                <Send size={16} /> 전송
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};