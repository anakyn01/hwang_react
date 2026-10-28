import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RecruitApp = ({ embeddedAdmin = false }: { embeddedAdmin?: boolean }) => {
  const { role, setRole, requests, messages } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat'>('dashboard');

  useEffect(() => {
    if (embeddedAdmin) setRole('ADMIN');
  }, [embeddedAdmin, setRole]);

  return (
    <div className={`flex flex-col h-full ${!embeddedAdmin ? 'bg-gradient-to-br from-indigo-50 to-blue-50 p-4' : ''}`}>
      {!embeddedAdmin && (
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-extrabold text-blue-600">SmartRecruit</h1>
          <button onClick={() => setRole(role === 'ADMIN' ? 'STORE' : 'ADMIN')} className="text-xs bg-white px-3 py-1 rounded-md shadow border">
            {role === 'ADMIN' ? '관리자 모드' : '매장 모드'} 전환
          </button>
        </div>
      )}
      
      <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${activeTab === 'dashboard' ? 'bg-white shadow' : 'text-gray-500'}`}>대시보드</button>
        <button onClick={() => setActiveTab('chat')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${activeTab === 'chat' ? 'bg-white shadow' : 'text-gray-500'}`}>채팅/문자</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' ? (
          <div className="bg-white/60 backdrop-blur-md border border-white/50 p-4 rounded-xl shadow">
             <h2 className="font-bold mb-3 flex items-center gap-2"><LayoutDashboard className="text-indigo-500" size={18} /> 구인 현황 리스트</h2>
             {requests.map(req => (
               <div key={req.id} className="bg-white p-3 rounded-lg border border-gray-100 mb-2 flex justify-between items-center">
                 <div>
                   <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">{req.status}</span>
                   <p className="font-bold text-gray-800 mt-1">{req.storeName} - {req.section}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-semibold text-blue-600">충원: {req.hired}/{req.required}</p>
                   {role === 'ADMIN' && req.status === '채용중' && (
                     <button className="mt-1 text-[10px] bg-indigo-500 text-white px-2 py-1 rounded">근무자 배정</button>
                   )}
                 </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="bg-white border rounded-xl flex flex-col h-96">
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-gray-500 mb-1">{msg.sender}</span>
                  <div className={`px-3 py-1.5 rounded-xl text-sm ${msg.isMine ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white border rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 bg-white border-t flex gap-2">
              <input type="text" placeholder="메시지 입력..." className="flex-1 border rounded-lg px-3 py-1.5 text-sm" />
              <button className="bg-blue-500 text-white p-1.5 rounded-lg"><Send size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};