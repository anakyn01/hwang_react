"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  setInputText,
  setIsLoading,
  setShowMap,
  addMessage,
  setPlaces,
  setMobileView,
  setSelectedDistrict,
} from "@/store/chatSlice";
import ReactMarkdown from "react-markdown";
import { Temporal } from "@js-temporal/polyfill";
import {
  FaMapMarkerAlt,
  FaMap,
  FaTimes,
  FaExternalLinkAlt,
  FaLocationArrow,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

// 🌟 요청하신 "다 검색할 지니" 럭셔리 황금빛 깃털 벡터 SVG 컴포넌트 코드
const SearchGenieLogoSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 65" width="100%" height="100%">
    <defs>
      <linearGradient id="searchGenieGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF8DC" />
        <stop offset="30%" stopColor="#EEDC82" />
        <stop offset="60%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#996515" />
      </linearGradient>
      <linearGradient id="featherGold" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C5A059" />
        <stop offset="60%" stopColor="#FFFACD" />
        <stop offset="100%" stopColor="#8B6508" />
      </linearGradient>
      <filter id="luxuryGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.8" />
        <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#D4AF37" floodOpacity="0.5" />
      </filter>
    </defs>
    <g filter="url(#luxuryGlow)" fontFamily="'Pretendard', 'Nanum Myeongjo', serif" fontWeight="900" fontSize="38" fill="url(#searchGenieGold)" letterSpacing="1.2">
    
      <text x="5" y="46">다 검</text>
    
      <g transform="translate(82, 5) rotate(10)">
        <line x1="12" y1="2" x2="4" y2="48" stroke="url(#featherGold)" strokeWidth="1.2" />
        <path d="M 12 2 Q 18 18 7 40 Q 3 46 1 48 Q 6 36 12 18 Z" fill="url(#featherGold)" />
        <path d="M 10 8 Q 14 20 6 36" stroke="#FFF8DC" strokeWidth="0.7" fill="none" opacity="0.9" />
      </g>

  
      <text x="115" y="46">색할 지니</text>
    </g>
  </svg>
);

declare global {
  interface Window {
    kakao: any;
  }
}

const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = {
  노원구: { lat: 37.6542, lng: 127.0568 },
  도봉구: { lat: 37.6688, lng: 127.0471 },
  강북구: { lat: 37.6396, lng: 127.0257 },
  중랑구: { lat: 37.6066, lng: 127.0927 },
  성북구: { lat: 37.5894, lng: 127.0167 },
};

const DEFAULT_DISTRICT_PLACES: Record<string, any[]> = {
  노원구: [
    {
      name: "노원 중계점 수학전문학원",
      address: "서울 노원구 한글비석로 245 (중계동 은행사거리)",
      category: "입시/보습학원",
      description: "중계동 은행사거리 대표 고등/중등 내신 및 수능 집중 관리 학원",
      is_registered: true,
      lat: 37.6515,
      lng: 127.0765,
      kakaoQuery: "노원구 중계동 은행사거리 수학학원",
    },
    {
      name: "노원역 돈부리 & 수제돈까스",
      address: "서울 노원구 상계로 65",
      category: "일식/맛집",
      description: "노원역 4번 출구 인근 두툼한 숙성 등심 돈까스와 사케동 맛집",
      is_registered: true,
      lat: 37.6558,
      lng: 127.0615,
      kakaoQuery: "노원역 돈까스 맛집",
    },
  ],
  도봉구: [
    {
      name: "창동 에듀 입시영어학원",
      address: "서울 도봉구 노해로65길 18",
      category: "외국어학원",
      description: "창동역 인근 체계적인 내신/수능 영어 커리큘럼 운영",
      is_registered: true,
      lat: 37.6531,
      lng: 127.0479,
      kakaoQuery: "창동역 영어학원",
    },
  ],
  강북구: [
    {
      name: "수유역 스카이 과학학원",
      address: "서울 강북구 도봉로 328",
      category: "과학/입시학원",
      description: "수유역 인근 물리·화학·생명과학 집중 특강 전문 학원",
      is_registered: true,
      lat: 37.6381,
      lng: 127.0259,
      kakaoQuery: "수유역 학원",
    },
  ],
  중랑구: [
    {
      name: "면목 하이클래스 국어학원",
      address: "서울 중랑구 면목로 410",
      category: "입시학원",
      description: "비문학 독해 및 내신 국어 완벽 대비 전문 학원",
      is_registered: true,
      lat: 37.5889,
      lng: 127.0878,
      kakaoQuery: "면목동 학원",
    },
  ],
  성북구: [
    {
      name: "길음 뉴타운 코딩 & 수학학원",
      address: "서울 성북구 길음로 33",
      category: "코딩/수학학원",
      description: "사고력 수학과 알고리즘 코딩을 함께 배우는 프리미엄 학원",
      is_registered: true,
      lat: 37.6038,
      lng: 127.0251,
      kakaoQuery: "길음역 수학학원",
    },
  ],
};

const UNIFIED_GLASS_BTN_STYLE: React.CSSProperties = {
  height: "38px",
  minHeight: "38px",
  maxHeight: "38px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: "14px",
  paddingRight: "14px",
  background:
    "linear-gradient(135deg, rgba(88, 28, 135, 0.42) 0%, rgba(49, 46, 129, 0.3) 100%)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(253, 224, 71, 0.35)",
  boxShadow:
    "0 6px 20px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.35)",
  borderRadius: "12px",
  color: "#fde047",
  fontSize: "12px",
  whiteSpace: "nowrap",
};

export default function Chat() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    messages,
    inputText,
    isLoading,
    showMap,
    places,
    mobileView,
    selectedDistrict,
  } = useSelector((state: RootState) => state.chat);

  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const kakaoMapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [isCardListCollapsed, setIsCardListCollapsed] = useState(true);

  const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || "";

  const activePlaces =
    places && places.length > 0
      ? places
      : DEFAULT_DISTRICT_PLACES[selectedDistrict] || [];

  useEffect(() => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (showMap) {
      dispatch(setMobileView("map"));
    }
  }, [showMap, dispatch]);

  useEffect(() => {
    const currentList =
      places && places.length > 0
        ? places
        : DEFAULT_DISTRICT_PLACES[selectedDistrict] || [];
    setSelectedPlace(currentList[0] || null);
  }, [selectedDistrict, places]);

  useEffect(() => {
    if (!kakaoAppKey) return;
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => setSdkLoaded(true));
      return;
    }

    const existingScript = document.getElementById("kakao-map-sdk");
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        window.kakao.maps.load(() => setSdkLoaded(true));
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => setSdkLoaded(true));
      }
    };
    document.head.appendChild(script);
  }, [kakaoAppKey]);

  useEffect(() => {
    if (
      !showMap ||
      !sdkLoaded ||
      !kakaoMapContainerRef.current ||
      !window.kakao?.maps
    )
      return;

    const kakao = window.kakao;
    const centerCoord =
      DISTRICT_COORDS[selectedDistrict] || DISTRICT_COORDS["노원구"];

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new kakao.maps.Map(kakaoMapContainerRef.current, {
        center: new kakao.maps.LatLng(centerCoord.lat, centerCoord.lng),
        level: 4,
      });
      infoWindowRef.current = new kakao.maps.InfoWindow({ zIndex: 10 });
    } else {
      mapInstanceRef.current.relayout();
      mapInstanceRef.current.setCenter(
        new kakao.maps.LatLng(centerCoord.lat, centerCoord.lng)
      );
    }

    const map = mapInstanceRef.current;
    const geocoder = new kakao.maps.services.Geocoder();

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    activePlaces.forEach((place) => {
      const renderMarker = (lat: number, lng: number) => {
        const position = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({
          map,
          position,
          title: place.name,
        });
        markersRef.current.push(marker);

        kakao.maps.event.addListener(marker, "click", () => {
          setSelectedPlace(place);
          map.panTo(position);
          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(
              `<div style="padding:6px 12px;font-size:12px;font-weight:bold;color:#0f172a;white-space:nowrap;">📍 ${place.name}</div>`
            );
            infoWindowRef.current.open(map, marker);
          }
        });
      };

      if (place.lat && place.lng) {
        renderMarker(place.lat, place.lng);
      } else if (place.address) {
        geocoder.addressSearch(place.address, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            renderMarker(parseFloat(result[0].y), parseFloat(result[0].x));
          }
        });
      }
    });
  }, [showMap, sdkLoaded, selectedDistrict, activePlaces]);

  const handleSelectPlace = useCallback(
    (place: any) => {
      setSelectedPlace(place);

      if (sdkLoaded && mapInstanceRef.current && window.kakao?.maps) {
        const kakao = window.kakao;
        const map = mapInstanceRef.current;

        const moveAndOpenInfo = (lat: number, lng: number) => {
          const moveLatLon = new kakao.maps.LatLng(lat, lng);
          map.setLevel(3);
          map.panTo(moveLatLon);
          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(
              `<div style="padding:6px 12px;font-size:12px;font-weight:bold;color:#0f172a;white-space:nowrap;">📍 ${place.name}</div>`
            );
            const tempMarker = new kakao.maps.Marker({ position: moveLatLon });
            infoWindowRef.current.open(map, tempMarker);
          }
        };

        if (place.lat && place.lng) {
          moveAndOpenInfo(place.lat, place.lng);
        } else if (place.address) {
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(place.address, (result: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
              moveAndOpenInfo(parseFloat(result[0].y), parseFloat(result[0].x));
            }
          });
        }
      }
    },
    [sdkLoaded]
  );

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
      lowerQuery.includes("근처") ||
      lowerQuery.includes("알려줘");

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
      if (Array.isArray(data.places) && data.places.length > 0) {
        dispatch(setPlaces(data.places));
        setSelectedPlace(data.places[0]);
      }
    } catch (error) {
      console.error("통신에러: ", error);
      const errorMsgId = Temporal.Now.instant().epochMilliseconds;
      dispatch(
        addMessage({
          id: errorMsgId,
          text: `현재 백엔드 서버 응답 지연으로 **${selectedDistrict}** 추천 업체를 우측 전체 다음맵 위에 표시합니다. 업체 카드를 클릭해 위치를 확인해 보세요!`,
          sender: "ai",
        })
      );
      dispatch(setShowMap(true));
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

  const kakaoSearchQuery = selectedPlace
    ? selectedPlace.kakaoQuery || `${selectedDistrict} ${selectedPlace.name}`
    : `${selectedDistrict} 맛집 학원`;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center p-0 sm:p-3 font-sans text-slate-100 overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #2e1065 0%, #0f0728 55%, #030014 100%)",
      }}
    >
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "5%",
          left: "10%",
          width: "460px",
          height: "460px",
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(219, 39, 119, 0.25) 50%, transparent 75%)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: "5%",
          right: "10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, rgba(126, 34, 206, 0.35) 50%, transparent 75%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div
        className={`relative z-10 w-full h-[92vh] sm:h-[88vh] rounded-3xl flex flex-col overflow-hidden transition-all duration-300 ${
          showMap
            ? "w-[98vw] max-w-none mx-2 sm:mx-4 h-full rounded-none border-0 shadow-none my-0"
            : "max-w-[1380px]"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, rgba(30, 27, 75, 0.35) 50%, rgba(15, 23, 42, 0.6) 100%)",
          backdropFilter: "blur(30px) saturate(190%)",
          WebkitBackdropFilter: "blur(30px) saturate(190%)",
          border: showMap ? "none" : "1px solid rgba(216, 180, 254, 0.25)",
          boxShadow: showMap
            ? "none"
            : "0 35px 70px -15px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.4)",
        }}
      >
        {/* 상단 글래스 헤더 ("다 검색할 지니" SVG 로고 적용) */}
        <header
          className="flex flex-wrap justify-between items-center px-6 shrink-0 gap-4"
          style={{
            height: showMap ? "64px" : "80px",
            background:
              "linear-gradient(90deg, rgba(88, 28, 135, 0.28) 0%, rgba(30, 27, 75, 0.18) 100%)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(216, 180, 254, 0.2)",
          }}
        >
          <div className="flex items-center space-x-3.5">
            {/* '다 검색할 지니' 벡터 SVG 로고 출력 */}
            <div className="flex items-center h-10 w-52 sm:w-60 drop-shadow-md">
              <SearchGenieLogoSvg />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div
              className="cursor-pointer transition hover:brightness-110"
              style={{ ...UNIFIED_GLASS_BTN_STYLE, width: "145px" }}
            >
              <div className="flex items-center space-x-1.5">
                <FaMapMarkerAlt className="text-[#fde047] text-[10px]" />
                <span className="text-xs text-purple-200 font-medium">지역:</span>
              </div>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  dispatch(setSelectedDistrict(e.target.value));
                  dispatch(setShowMap(true));
                }}
                className="bg-transparent text-xs font-bold text-[#fde047] focus:outline-none cursor-pointer text-right"
              >
                <option value="노원구" className="bg-[#1e1b4b] text-white">
                  노원구
                </option>
                <option value="도봉구" className="bg-[#1e1b4b] text-white">
                  도봉구
                </option>
                <option value="강북구" className="bg-[#1e1b4b] text-white">
                  강북구
                </option>
                <option value="중랑구" className="bg-[#1e1b4b] text-white">
                  중랑구
                </option>
                <option value="성북구" className="bg-[#1e1b4b] text-white">
                  성북구
                </option>
              </select>
            </div>

            <button
              onClick={() => dispatch(setShowMap(!showMap))}
              className="text-xs font-semibold hidden sm:flex items-center cursor-pointer transition hover:brightness-110 active:scale-95"
              style={{
                ...UNIFIED_GLASS_BTN_STYLE,
                width: "135px",
                background:
                  "linear-gradient(135deg, rgba(147, 51, 234, 0.4) 0%, rgba(234, 179, 8, 0.25) 100%)",
                border: "1px solid rgba(253, 224, 71, 0.45)",
              }}
            >
              <div className="flex items-center space-x-1.5">
                <FaMap className="text-xs text-[#fde047]" />
                <span>지도 연동</span>
              </div>
              <span className="text-[#fde047] font-bold">
                {showMap ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </header>

        {/* 중앙 바디 영역 (20:80 와이드 뷰) */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden relative min-h-0">
          <div
            className={`flex flex-col h-full overflow-hidden transition-all duration-300 min-h-0 ${
              showMap ? "w-full sm:w-[20%] sm:border-r sm:border-purple-300/15" : "w-full"
            } ${mobileView === "map" && showMap ? "hidden sm:flex" : "flex"}`}
          >
            <div
              ref={chatScrollContainerRef}
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar min-h-0"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end space-x-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "text-white rounded-br-xs"
                        : "text-purple-100 rounded-bl-xs"
                    }`}
                    style={
                      msg.sender === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, rgba(147, 51, 234, 0.65) 0%, rgba(79, 70, 229, 0.5) 100%)",
                            backdropFilter: "blur(16px)",
                            border: "1px solid rgba(216, 180, 254, 0.4)",
                            boxShadow:
                              "0 8px 25px rgba(147, 51, 234, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                          }
                        : {
                            background:
                              "linear-gradient(135deg, rgba(88, 28, 135, 0.25) 0%, rgba(30, 27, 75, 0.35) 100%)",
                            backdropFilter: "blur(16px)",
                            border: "1px solid rgba(216, 180, 254, 0.2)",
                            boxShadow:
                              "0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                          }
                    }
                  >
                    <div className="prose prose-invert prose-xs max-w-none select-text">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-end space-x-2.5 justify-start">
                  <div
                    className="px-3.5 py-2.5 rounded-2xl flex items-center space-x-2 text-[#fde047]"
                    style={UNIFIED_GLASS_BTN_STYLE}
                  >
                    <div className="w-2 h-2 bg-[#fde047] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-[#fde047] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-[#fde047] rounded-full animate-bounce" />
                    <span className="text-[11px] text-purple-200 ml-1 font-medium">
                      분석 중...
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              className="px-4 py-3 flex items-center space-x-2.5 shrink-0"
              style={{
                height: showMap ? "60px" : "72px",
                background:
                  "linear-gradient(180deg, rgba(88, 28, 135, 0.15) 0%, rgba(15, 23, 42, 0.4) 100%)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(216, 180, 254, 0.2)",
              }}
            >
              <input
                type="text"
                className="flex-1 h-[38px] px-3.5 text-xs text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-[#fde047]/60 transition-all select-text"
                style={{
                  background: "rgba(30, 27, 75, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(216, 180, 254, 0.25)",
                  borderRadius: "12px",
                  boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.4)",
                }}
                placeholder="맛집/학원 검색..."
                value={inputText}
                onChange={(e) => dispatch(setInputText(e.target.value))}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="text-xs font-bold text-[#fde047] transition-all cursor-pointer shrink-0 active:scale-95 hover:brightness-110"
                style={{
                  ...UNIFIED_GLASS_BTN_STYLE,
                  height: "38px",
                  minHeight: "38px",
                  maxHeight: "38px",
                  width: showMap ? "58px" : "75px",
                  padding: "0",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, rgba(234, 179, 8, 0.4) 0%, rgba(147, 51, 234, 0.3) 100%)",
                  border: "1px solid rgba(253, 224, 71, 0.6)",
                  boxShadow:
                    "0 8px 20px rgba(234, 179, 8, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
                }}
              >
                전송
              </button>
            </div>
          </div>

          {showMap && (
            <div
              className={`w-full sm:w-[80%] h-full relative flex flex-col overflow-hidden min-h-0 ${
                mobileView === "map" && showMap ? "hidden sm:flex" : "flex"
              }`}
            >
              <div className="absolute inset-0 z-0 bg-[#0f0728]">
                {kakaoAppKey && sdkLoaded ? (
                  <div ref={kakaoMapContainerRef} className="w-full h-full" />
                ) : (
                  <iframe
                    key={kakaoSearchQuery}
                    title="다음맵 실시간 지도"
                    src={`https://map.kakao.com/?q=${encodeURIComponent(
                      kakaoSearchQuery
                    )}`}
                    className="w-full h-full border-0"
                  />
                )}
              </div>

              <div
                className="relative z-10 m-2 mb-1 px-3.5 py-2 flex justify-between items-center shrink-0"
                style={{
                  ...UNIFIED_GLASS_BTN_STYLE,
                  height: "auto",
                  minHeight: "42px",
                  background: "rgba(30, 27, 75, 0.82)",
                  backdropFilter: "blur(20px) saturate(180%)",
                }}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="px-2.5 flex items-center space-x-1.5 text-[#fde047]"
                    style={{
                      ...UNIFIED_GLASS_BTN_STYLE,
                      height: "28px",
                      fontSize: "11px",
                      width: "auto",
                    }}
                  >
                    <FaMap className="text-[#fde047] text-[10px]" />
                    <span className="font-bold text-[#fde047] text-xs">
                      {selectedDistrict} 추천 업체 & 다음맵 (20:80 와이드)
                    </span>
                  </div>
                  <span className="text-[11px] text-purple-200 hidden xl:inline">
                    업체 클릭 시 지도 전환
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setIsCardListCollapsed(!isCardListCollapsed)}
                    className="text-xs font-semibold text-[#fde047] transition cursor-pointer hover:brightness-110 flex items-center space-x-1"
                    style={{
                      ...UNIFIED_GLASS_BTN_STYLE,
                      height: "28px",
                      fontSize: "11px",
                      width: "105px",
                    }}
                  >
                    <span>
                      {isCardListCollapsed ? "목록 펼치기" : "목록 접기"}
                    </span>
                    {isCardListCollapsed ? (
                      <FaChevronDown className="text-[10px]" />
                    ) : (
                      <FaChevronUp className="text-[10px]" />
                    )}
                  </button>

                  <button
                    onClick={() => dispatch(setShowMap(false))}
                    className="hover:text-rose-300 text-[#fde047] text-xs font-semibold transition cursor-pointer hover:brightness-110 flex items-center space-x-1"
                    style={{
                      ...UNIFIED_GLASS_BTN_STYLE,
                      height: "28px",
                      fontSize: "11px",
                      width: "60px",
                      justifyContent: "center",
                    }}
                  >
                    <span>닫기</span>
                    <FaTimes className="text-[10px]" />
                  </button>
                </div>
              </div>

              {!isCardListCollapsed && (
                <div className="relative z-10 max-h-[46%] overflow-y-auto px-2.5 pb-2 space-y-2 custom-scrollbar shrink-0">
                  <div
                    className="flex items-center justify-between px-3 py-1.5 text-xs text-purple-100"
                    style={{
                      ...UNIFIED_GLASS_BTN_STYLE,
                      height: "auto",
                      minHeight: "34px",
                      background: "rgba(30, 27, 75, 0.75)",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className="px-2 py-0.5 text-[10px] font-bold text-purple-200 flex items-center gap-1"
                        style={{
                          ...UNIFIED_GLASS_BTN_STYLE,
                          height: "22px",
                          width: "auto",
                          fontSize: "10px",
                          borderRadius: "8px",
                          background:
                            "linear-gradient(135deg, rgba(147, 51, 234, 0.35) 0%, rgba(79, 70, 229, 0.2) 100%)",
                          border: "1px solid rgba(216, 180, 254, 0.4)",
                        }}
                      >
                        🟣 공식 등록
                      </span>
                      <span
                        className="px-2 py-0.5 text-[10px] font-bold text-[#fde047] flex items-center gap-1"
                        style={{
                          ...UNIFIED_GLASS_BTN_STYLE,
                          height: "22px",
                          width: "auto",
                          fontSize: "10px",
                          borderRadius: "8px",
                          background:
                            "linear-gradient(135deg, rgba(234, 179, 8, 0.35) 0%, rgba(180, 83, 9, 0.2) 100%)",
                          border: "1px solid rgba(253, 224, 71, 0.4)",
                        }}
                      >
                        🟡 커스텀 추천
                      </span>
                    </div>
                    <span className="text-[11px] text-purple-200 font-medium">
                      총 <b>{activePlaces.length}</b>개
                    </span>
                  </div>

                  {activePlaces.map((place, index) => {
                    const isSelected = selectedPlace?.name === place.name;
                    return (
                      <div
                        key={index}
                        onClick={() => handleSelectPlace(place)}
                        className="p-3 transition-all flex items-start space-x-2.5 text-left group cursor-pointer hover:brightness-110"
                        style={{
                          borderRadius: "14px",
                          background: isSelected
                            ? "linear-gradient(135deg, rgba(88, 28, 135, 0.88) 0%, rgba(49, 46, 129, 0.82) 100%)"
                            : "linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(15, 23, 42, 0.72) 100%)",
                          backdropFilter: "blur(22px) saturate(180%)",
                          WebkitBackdropFilter: "blur(22px) saturate(180%)",
                          border: isSelected
                            ? "1px solid rgba(253, 224, 71, 0.85)"
                            : "1px solid rgba(216, 180, 254, 0.24)",
                          boxShadow: isSelected
                            ? "0 12px 28px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.45)"
                            : "0 8px 20px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                        }}
                      >
                        <div
                          className="flex items-center justify-center shrink-0"
                          style={{
                            ...UNIFIED_GLASS_BTN_STYLE,
                            width: "32px",
                            height: "32px",
                            minHeight: "32px",
                            maxHeight: "32px",
                            padding: "0",
                            justifyContent: "center",
                            background: place.is_registered
                              ? "linear-gradient(135deg, rgba(147, 51, 234, 0.4) 0%, rgba(79, 70, 229, 0.2) 100%)"
                              : "linear-gradient(135deg, rgba(234, 179, 8, 0.4) 0%, rgba(180, 83, 9, 0.2) 100%)",
                          }}
                        >
                          {place.is_registered ? "🟣" : "🟡"}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-white text-xs truncate group-hover:text-[#fde047] transition flex items-center gap-1.5 sm:text-sm">
                              <span>{place.name}</span>
                              {isSelected && (
                                <span
                                  className="text-[10px] text-[#fde047] px-1.5 py-0.5 font-bold shrink-0"
                                  style={{
                                    ...UNIFIED_GLASS_BTN_STYLE,
                                    height: "18px",
                                    width: "auto",
                                    padding: "0 5px",
                                    fontSize: "9px",
                                    borderRadius: "6px",
                                    background:
                                      "linear-gradient(135deg, rgba(234, 179, 8, 0.35) 0%, rgba(147, 51, 234, 0.2) 100%)",
                                    border:
                                      "1px solid rgba(253, 224, 71, 0.6)",
                                  }}
                                >
                                  표시중
                                </span>
                              )}
                            </h4>

                            <span
                              className={`text-[10px] px-2 py-0.5 font-bold shrink-0 ${
                                place.is_registered
                                  ? "text-purple-200"
                                  : "text-[#fde047]"
                              }`}
                              style={{
                                ...UNIFIED_GLASS_BTN_STYLE,
                                height: "20px",
                                width: "auto",
                                padding: "0 6px",
                                fontSize: "9px",
                                borderRadius: "6px",
                                background: place.is_registered
                                  ? "linear-gradient(135deg, rgba(147, 51, 234, 0.35) 0%, rgba(79, 70, 229, 0.2) 100%)"
                                  : "linear-gradient(135deg, rgba(234, 179, 8, 0.35) 0%, rgba(180, 83, 9, 0.2) 100%)",
                                border: place.is_registered
                                  ? "1px solid rgba(216, 180, 254, 0.4)"
                                  : "1px solid rgba(253, 224, 71, 0.4)",
                              }}
                            >
                              {place.is_registered ? "공식 등록" : "커스텀"}
                            </span>
                          </div>

                          <p className="text-[11px] text-purple-200/80 mt-0.5 truncate">
                            📍 {place.address} ({place.category})
                          </p>
                          <p className="text-[11px] text-purple-100/90 mt-1 line-clamp-1">
                            {place.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div
                className="relative z-10 mt-auto m-2 mb-2 px-3.5 py-2 flex items-center justify-between"
                style={{
                  ...UNIFIED_GLASS_BTN_STYLE,
                  height: "auto",
                  minHeight: "40px",
                  width: "calc(100% - 16px)",
                  background: "rgba(30, 27, 75, 0.88)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  boxShadow:
                    "0 15px 35px rgba(0, 0, 0, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.4)",
                }}
              >
                <div className="flex items-center space-x-1.5 truncate pr-2">
                  <FaLocationArrow className="text-[#fde047] text-[10px] shrink-0" />
                  <span className="text-xs font-bold text-white truncate">
                    {selectedPlace
                      ? `${selectedPlace.name} — ${selectedPlace.address}`
                      : `${selectedDistrict} 다음맵`}
                  </span>
                </div>
                <a
                  href={`https://map.kakao.com/?q=${encodeURIComponent(
                    kakaoSearchQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#fde047] text-xs font-extrabold shrink-0 transition hover:brightness-110 flex items-center space-x-1"
                  style={{
                    ...UNIFIED_GLASS_BTN_STYLE,
                    height: "28px",
                    width: "auto",
                    fontSize: "11px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(135deg, rgba(234, 179, 8, 0.38) 0%, rgba(147, 51, 234, 0.25) 100%)",
                    border: "1px solid rgba(253, 224, 71, 0.6)",
                  }}
                >
                  <span>다음맵 크게보기</span>
                  <FaExternalLinkAlt size={9} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(216, 180, 254, 0.28); border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(216, 180, 254, 0.48); }
      `,
        }}
      />
    </div>
  );
}