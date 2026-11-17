"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setInputText, setIsLoading, setShowMap, addMessage, setPlaces, setMobileView, setSelectedDistrict } from "@/store/chatSlice";
import ReactMarkdown from "react-markdown";
import { Temporal } from "@js-temporal/polyfill";
import { FaRobot, FaMapMarkerAlt, FaMap, FaTimes } from "react-icons/fa";

export default function Chat() {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, inputText, isLoading, showMap, places, mobileView, selectedDistrict } = useSelector(
    (state: RootState) => state.chat
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (showMap) {
      dispatch(setMobileView("map"));
    }
  }, [showMap, dispatch]);

  const handleSend = useCallback(async () => {
    if (!inputText.trim()) return;
    const userQuery = inputText;
    const userMsgId = Temporal.Now.instant().epochMilliseconds;

    dispatch(addMessage({ id: userMsgId, text: userQuery, sender: "user" }));
    dispatch(setInputText(""));
    dispatch(setIsLoading(true));

    const lowerQuery = userQuery.toLowerCase();
    const isLocationQuery =
      lowerQuery.includes("맛집") ||
      lowerQuery.includes("학원") ||
      lowerQuery.includes("식당") ||
      lowerQuery.includes("카페") ||
      lowerQuery.includes("추천") ||
      lowerQuery.includes("극장") ||
      lowerQuery.includes("근처");

    dispatch(setShowMap(isLocationQuery));

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ message: `[${selectedDistrict}] ${userQuery}` }),
      });

      if (!response.ok) throw new Error("서버 에러가 발생했습니다");

      const data = await response.json();
      const aiMsgId = Temporal.Now.instant().epochMilliseconds;

      dispatch(addMessage({ id: aiMsgId, text: data.reply, sender: "ai" }));

      if (typeof data.show_map === "boolean") {
        dispatch(setShowMap(data.show_map || isLocationQuery));
      }
      if (Array.isArray(data.places)) {
        dispatch(setPlaces(data.places));
      }
    } catch (error) {
      console.error("통신에러: ", error);
      const errorMsgId = Temporal.Now.instant().epochMilliseconds;
      dispatch(addMessage({ id: errorMsgId, text: "백엔드 서버와 연결할 수 없습니다", sender: "ai" }));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [inputText, dispatch, selectedDistrict]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isLoading) {
        handleSend();
      }
    },
    [handleSend, isLoading]
  );

  return (
    // 전체 배경에 은은한 다크 그라데이션 광원 효과 추가
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#111827] to-[#0d111a] p-0 sm:p-6 font-sans text-slate-200">
      
      {/* 메인 컨테이너: 글래스모피즘(반투명 유리 + 블러 + 미세한 보더/그림자) 적용 */}
      <div className="w-full h-screen sm:h-[90vh] bg-[#131b2e]/70 backdrop-blur-2xl shadow-2xl rounded-none sm:rounded-2xl flex flex-col overflow-hidden max-w-[1400px] border border-white/10 ring-1 ring-white/5">
        
        {/* 상단바: 글래스 룩 적용 */}
        <header className="flex flex-wrap justify-between items-center px-6 py-4 bg-[#17223b]/60 backdrop-blur-md text-slate-100 shrink-0 gap-4 shadow-sm border-b border-white/5">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#1e2c4f]/80 backdrop-blur-md flex items-center justify-center shadow-inner text-[#fde047] text-xl border border-white/10">
              <FaRobot />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#fde047] flex items-center gap-2 drop-shadow-sm">
                AI <span className="text-white text-xl font-bold">로컬 어시스턴트</span>
              </h1>
              <p className="text-xs text-slate-400">지역 맞춤형 맛집 및 학원 추천 플랫폼</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* 지역 선택 셀렉트 */}
            <div className="flex items-center space-x-2 bg-[#131b2e]/80 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-inner cursor-pointer border border-white/10">
              <FaMapMarkerAlt className="text-red-400 text-xs" />
              <span className="text-xs text-slate-400">지역:</span>
              <select 
                value={selectedDistrict}
                onChange={(e) => dispatch(setSelectedDistrict(e.target.value))}
                className="bg-transparent text-xs font-semibold text-[#fde047] focus:outline-none cursor-pointer"
              >
                <option value="노원구" className="bg-[#131b2e] text-white">노원구</option>
                <option value="도봉구" className="bg-[#131b2e] text-white">도봉구</option>
                <option value="강북구" className="bg-[#131b2e] text-white">강북구</option>
                <option value="중랑구" className="bg-[#131b2e] text-white">중랑구</option>
                <option value="성북구" className="bg-[#131b2e] text-white">성북구</option>
              </select>
            </div>

            {/* 상태 배지 */}
            <div className="text-xs bg-[#1e2c4f]/80 backdrop-blur-md text-[#fde047] px-3.5 py-2 rounded-2xl font-semibold shadow-inner hidden sm:flex items-center gap-2 border border-white/10">
              <FaMap className="text-xs text-[#fde047]" />
              <span>{showMap ? "지도 연동 활성화" : "AI 대화 모드"}</span>
            </div>
          </div>
        </header>

        {/* 중앙 바디 영역 */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden relative">
              
              {/* 1) 채팅 영역 */}
              <div className={`flex-1 flex flex-col h-full overflow-hidden bg-[#0f172a]/50 backdrop-blur-sm transition-all duration-300 ${
                showMap ? "sm:w-1/2 sm:border-r sm:border-white/5" : "w-full"
              } ${mobileView === "map" && showMap ? "hidden sm:flex" : "flex"}`}>
                
                {/* 대화 내용 스크롤 박스 */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end space-x-2 ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "ai" && (
                        <div className="w-9 h-9 rounded-2xl bg-[#1e2c4f]/80 backdrop-blur-md flex items-center justify-center shrink-0 shadow-md text-slate-200 border border-white/10">
                          <FaRobot size={16} />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed shadow-lg backdrop-blur-md ${
                          msg.sender === "user"
                            ? "bg-[#2563eb]/90 text-white rounded-br-none shadow-blue-900/30 border border-blue-400/20"
                            : "bg-[#17223b]/80 text-slate-200 rounded-bl-none shadow-md border border-white/10"
                        }`}
                      >
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-end space-x-2 justify-start">
                      <div className="w-9 h-9 rounded-2xl bg-[#1e2c4f]/80 backdrop-blur-md flex items-center justify-center shrink-0 text-slate-200 border border-white/10">
                        <FaRobot size={16} />
                      </div>
                      <div className="bg-[#17223b]/80 backdrop-blur-md px-4 py-3 rounded-2xl rounded-bl-none shadow-md flex items-center space-x-2 border border-white/10">
                        <div className="w-2.5 h-2.5 bg-[#fde047] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2.5 h-2.5 bg-[#fde047] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2.5 h-2.5 bg-[#fde047] rounded-full animate-bounce"></div>
                        <span className="text-xs text-slate-300 ml-1 font-medium">최적의 장소 분석 중...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* 하단 입력 폼 */}
                <div className="p-4 bg-[#131b2e]/60 backdrop-blur-md flex items-center space-x-3 shrink-0 shadow-inner border-t border-white/5">
                  <input
                    type="text"
                    className="flex-1 bg-[#0d111a]/80 backdrop-blur-md rounded-2xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#fde047] transition shadow-inner border border-white/10"
                    placeholder={`${selectedDistrict} 맛집이나 학원을 물어보세요...`}
                    value={inputText}
                    onChange={(e) => dispatch(setInputText(e.target.value))}
                    onKeyPress={handleKeyPress}
                  />
                  {/* 노란색 계열 전송 버튼 */}
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="bg-[#fde047] hover:bg-[#facc15] disabled:bg-slate-800 text-slate-950 px-6 py-3 rounded-2xl text-sm font-bold transition shadow-md cursor-pointer shrink-0"
                  >
                    전송
                  </button>
                </div>
              </div>

              {/* 2) 다음맵 배경 + 토스트 카드 영역 */}
              {showMap && (
                <div className={`w-full sm:w-1/2 h-full relative flex flex-col overflow-hidden bg-[#0d111a]/60 ${
                  mobileView === "chat" && showMap ? "hidden sm:flex" : "flex"
                }`}>
                  
                  {/* 배경 지도 시뮬레이션 레이어 */}
                  <div className="absolute inset-0 bg-[#0a0e17]/80 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:28px_28px]"></div>
                    <div className="text-blue-400/80 text-6xl mb-3 animate-pulse">🗺️</div>
                    <p className="text-xs text-blue-300/80 font-mono tracking-widest bg-[#131b2e]/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/10">
                      [ Kakao Map Interactive Layer Active ]
                    </p>
                  </div>

                  {/* 상단 컨트롤: 지도 아이콘 + 애니메이션 닫기 버튼 */}
                  <div className="relative z-10 p-4 bg-[#131b2e]/80 backdrop-blur-md flex justify-between items-center shadow-md border-b border-white/5">
                    <div className="flex items-center space-x-2 bg-[#0f172a]/80 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-inner border border-white/10">
                      <FaMap className="text-blue-400 text-xs" />
                      <span className="text-xs font-bold text-white">{selectedDistrict} 추천 장소 지도</span>
                    </div>

                    <button
                      onClick={() => dispatch(setShowMap(false))}
                      className="group flex items-center space-x-2 bg-[#1e2c4f]/80 backdrop-blur-md hover:bg-red-500/20 hover:text-red-400 text-slate-200 px-3.5 py-2 rounded-2xl text-xs font-medium transition-all duration-300 cursor-pointer shadow-md transform active:scale-95 border border-white/10"
                    >
                      <FaMap className="text-blue-400 text-sm group-hover:rotate-12 transition-transform duration-300" />
                      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[100px] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                        지도 닫기
                      </span>
                      <FaTimes className="text-sm transition-transform duration-300 group-hover:rotate-90" />
                    </button>
                  </div>

                  {/* 토스트 스타일 장소 카드 리스트 */}
                  <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3">
                    <div className="flex space-x-3 p-3 bg-[#131b2e]/80 backdrop-blur-md rounded-2xl text-xs text-slate-300 shadow-lg border border-white/10">
                      <div className="flex items-center space-x-1.5">
                        <span>🔵</span>
                        <span className="font-semibold text-blue-300">공식 등록</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span>🟠</span>
                        <span className="font-semibold text-[#fde047]">AI 추천/미등록</span>
                      </div>
                    </div>

                    {places.length > 0 ? (
                      places.map((place, index) => (
                        <div 
                          key={index} 
                          className="p-4 bg-[#17223b]/80 backdrop-blur-md rounded-2xl shadow-xl hover:bg-[#17223b]/95 transition flex items-start space-x-3 text-left group cursor-pointer border border-white/10"
                        >
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-base shadow-md border border-white/10 ${
                            place.is_registered
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-amber-500/20 text-[#fde047]"
                          }`}>
                            {place.is_registered ? "🔵" : "🟠"}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-bold text-white text-sm truncate group-hover:text-[#fde047] transition">
                                {place.name}
                              </h4>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-2xl font-semibold shrink-0 border border-white/10 ${
                                place.is_registered
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-amber-500/20 text-[#fde047]"
                              }`}>
                                {place.is_registered ? "공식 등록" : "커스텀 추천"}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 truncate">
                              📍 {place.address} ({place.category})  
                            </p>
                            <p className="text-xs text-slate-200 mt-2 bg-[#0f172a]/80 backdrop-blur-sm p-2.5 rounded-2xl shadow-inner leading-relaxed border border-white/5">
                              {place.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-40 flex flex-col items-center justify-center text-center text-slate-400 bg-[#131b2e]/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
                        <div className="text-3xl mb-2">🔍</div>
                        <p className="text-xs text-slate-300">
                          선택하신 지역의 장소 데이터를 불러오는 중이거나 표시할 항목이 없습니다.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

        </div>
      </div>

      {/* 모바일 전용 플로팅 토글 버튼 */}
      {showMap && (
        <div className="fixed bottom-6 right-6 z-50 sm:hidden">
          <button
            onClick={() => dispatch(setMobileView(mobileView === "chat" ? "map" : "chat"))}
            className="bg-[#fde047] hover:bg-[#facc15] text-slate-950 px-5 py-3 rounded-2xl font-bold shadow-2xl flex items-center space-x-2 text-sm active:scale-95 transition cursor-pointer backdrop-blur-md"
          >
            {mobileView === "chat" ? (
              <>
                <FaMap className="text-slate-950" />
                <span>지도 보기</span>
                <span className="w-2 h-2 rounded-2xl bg-blue-600 animate-ping"></span>
              </>
            ) : (
              <>
                <span>💬 채팅 보기</span>
                {messages.length > 0 && (
                  <span className="bg-slate-950 text-[#fde047] w-5 h-5 rounded-2xl text-xs flex items-center justify-center font-extrabold shadow-md">
                    {messages.length}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}