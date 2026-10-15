import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

declare global {
    interface Window {
        kakao: any;
    }
}

export const Footer = () => {
    const [mapType, setMapType] = useState<'google' | 'daum'>('google');
    const [mapValue, setMapValue] = useState('');
    const kakaoMapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMapSettings = async () => {
            try {
                // 🚨 핵심 포인트 1: 인터넷 주소 뒤에 시간을 붙여 무조건 갓 구운 최신 DB 데이터를 가져옵니다!
                const response = await axios.get(`http://localhost:5000/api/settings/map?timestamp=${new Date().getTime()}`);
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

    useEffect(() => {
        if (mapType !== 'daum' || !mapValue) return;

        const renderMap = () => {
            if (!kakaoMapRef.current) return;
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

        const mapCheckInterval = setInterval(() => {
            if (window.kakao && window.kakao.maps) {
                clearInterval(mapCheckInterval);
                renderMap();
            }
        }, 100);

        return () => clearInterval(mapCheckInterval);
    }, [mapType, mapValue]);

    const defaultGoogleUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.111677235935!2d126.97473421573828!3d37.575987879796195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eaa19c763d%3A0xb28a32722d675764!2z6rSR7ZmU66y4KEd3YW5naHdhbXVuIEdhdGUp!5e0!3m2!1sko!2skr!4v1481946656451";

    return (
        <footer className="footer">
            {mapType === 'google' && (
                <iframe 
                    src={mapValue ? mapValue : defaultGoogleUrl}
                    frameBorder="0"
                    allowFullScreen
                    style={{ width: '100%', height: '400px' }}
                ></iframe>
            )}
            <div
                ref={kakaoMapRef}        
                style={{ width: '100%', height: '400px', display: mapType === 'daum' ? 'block' : 'none' }}
            ></div>
            <p className="copyright">INDIGO</p>
        </footer>
    );
};