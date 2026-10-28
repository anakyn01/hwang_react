import React, { useState, createContext, useContext, type ReactNode } from 'react';

// 🚨 'SHOP_LIKE' 가 추가되었습니다.
export type ViewState = 'SHOP_MAIN' | 'SHOP_ADMIN' | 'RECRUIT_APP' | 'SHOP_CATEGORY' | 'SHOP_SELL' | 'SHOP_LIKE';
export type Role = 'STORE' | 'ADMIN';

export interface RecruitRequest {
  id: number; storeName: string; date: string; section: string; time: string;
  breakTime: string; required: number; hired: number; status: '채용중' | '완료'; applicants?: string[];
}
export interface Message {
  id: number; sender: string; text: string; time: string; isMine: boolean;
}
export interface Worker {
  id: number; name: string; phone: string; exp: string;
}
export interface Product {
  id: number; title: string; type: 'RENT' | 'BUY'; price: number;
}

interface AppContextType {
  currentView: ViewState; setCurrentView: React.Dispatch<React.SetStateAction<ViewState>>;
  role: Role; setRole: React.Dispatch<React.SetStateAction<Role>>;
  requests: RecruitRequest[]; setRequests: React.Dispatch<React.SetStateAction<RecruitRequest[]>>;
  messages: Message[]; setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  workerDB: Worker[];
  products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<ViewState>('SHOP_MAIN');
  const [role, setRole] = useState<Role>('STORE');
  const [requests, setRequests] = useState<RecruitRequest[]>([
    { id: 1, storeName: '강남본점', date: '2026-10-31', section: '홀 서빙', time: '10:00 - 15:00', breakTime: '30분', required: 2, hired: 1, status: '채용중', applicants: ['김철수'] }
  ]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: '강남본점', text: '오늘 저녁 구인 급합니다!', time: '10:30 AM', isMine: false }
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const workerDB: Worker[] = [
    { id: 1, name: '김철수', phone: '010-1234-5678', exp: '홀 1년' },
    { id: 2, name: '이영희', phone: '010-8765-4321', exp: '주방 3년' },
  ];

  return (
    <AppContext.Provider value={{ 
      currentView, setCurrentView, role, setRole, requests, setRequests, 
      messages, setMessages, workerDB, products, setProducts 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};