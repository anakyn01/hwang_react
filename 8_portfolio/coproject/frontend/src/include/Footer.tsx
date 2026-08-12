import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

declare global {
    interface Window {
        kakao: any;
    }
}

export const Footer = () => {
    // --- [1. 상태 관리] ---
    const [mapType, setMapType] = useState<'google' | 'daum'>('google');
    const [mapValue, setMapValue] = useState('');
    const kakaoMapRef = useRef<HTMLDivElement>(null);

    // --- [2. 백엔드 설정 불러오기] ---
    useEffect(() => {
        const fetchMapSettings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/settings/map');
                if (response.data) {
                    setMapType(response.data.mapType || 'google');
                    setMapValue(response.data.mapUrl || '');
                }
            } catch (error) {
                console.error('푸터 지도 설정 불러오기 에러:', error);
            }
        };
        fetchMapSettings();
    }, []);

    // --- [3. 🚀 핵심 해결 로직: 카카오맵 그리기] ---
    useEffect(() => {
        // 구글맵이거나 좌표값이 없으면 실행 안 함
        if (mapType !== 'daum' || !mapValue) return;

        // 지도를 그리는 진짜 함수 (load 함수 제거하고 직관적으로 변경!)
        const renderMap = () => {
            if (!kakaoMapRef.current) return;
            
            // 띄어쓰기가 있어도 정확히 숫자로 변환하도록 trim() 추가
            const [lat, lng] = mapValue.split(',').map((v) => parseFloat(v.trim()));
            
            if (!isNaN(lat) && !isNaN(lng)) {
                const options = {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level: 3
                };

                const map = new window.kakao.maps.Map(kakaoMapRef.current, options);
                const markerPosition = new window.kakao.maps.LatLng(lat, lng);
                const marker = new window.kakao.maps.Marker({ position: markerPosition });
                marker.setMap(map);
            }
        };

        // 💡 0.1초마다 카카오 스크립트가 준비되었는지 감시 (관리자 페이지 성공 원리)
        const mapCheckInterval = setInterval(() => {
            if (window.kakao && window.kakao.maps) {
                clearInterval(mapCheckInterval); // 준비가 확인되면 추적기 종료
                renderMap(); // 딜레이 없이 바로 지도 그리기 시작
            }
        }, 100);

        // 푸터가 화면에서 사라지면 추적기도 깔끔하게 청소
        return () => clearInterval(mapCheckInterval);

    }, [mapType, mapValue]);

    const defaultGoogleUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.111677235935!2d126.97473421573828!3d37.575987879796195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eaa19c763d%3A0xb28a32722d675764!2z6rSR7ZmU66y4KEd3YW5naHdhbXVuIEdhdGUp!5e0!3m2!1sko!2skr!4v1481946656451";

    return (
        <footer className="footer">
            
            {/* 구글맵 영역 */}
            {mapType === 'google' && (
                <iframe 
                    src={mapValue ? mapValue : defaultGoogleUrl}
                    frameBorder="0"
                    allowFullScreen
                    style={{ width: '100%', height: '400px' }}
                ></iframe>
            )}

            {/* 카카오맵 영역 */}
            <div
                ref={kakaoMapRef}        
                style={{ width: '100%', height: '400px', display: mapType === 'daum' ? 'block' : 'none' }}
            ></div>
            
            <p className="copyright">INDIGO</p>
        </footer>
    );
};