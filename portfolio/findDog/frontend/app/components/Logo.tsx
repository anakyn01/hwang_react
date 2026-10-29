"use client";
import React from 'react';

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: () => void;
}

export default function Logo({ 
  width = 180, 
  height = 36, 
  className, 
  onClick 
}: LogoProps) {
  // 이미지에서 추출한 따뜻한 캬라멜 브라운 색상과 이목구비 색상
  const brownColor = "#C17F4A"; 
  const featureColor = "#2C2522"; 

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 180 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* --- 1. 강아지 심볼 영역 (36x36) --- */}
      <g transform="translate(0, 0)">
        {/* 흰색 얼굴 바탕 */}
        <ellipse cx="18" cy="18" rx="14" ry="13" fill="#FFFFFF"/>

        {/* 왼쪽 귀 (아래로 쳐진 둥근 형태) */}
        <ellipse 
          cx="8" 
          cy="14" 
          rx="6.5" 
          ry="11" 
          transform="rotate(-25 8 14)" 
          fill={brownColor}
        />
        
        {/* 오른쪽 귀 (아래로 쳐진 둥근 형태) */}
        <ellipse 
          cx="28" 
          cy="14" 
          rx="6.5" 
          ry="11" 
          transform="rotate(25 28 14)" 
          fill={brownColor}
        />

        {/* 눈 (세로로 약간 긴 타원형) */}
        <ellipse cx="14" cy="16" rx="1.5" ry="2.2" fill={featureColor}/>
        <ellipse cx="22" cy="16" rx="1.5" ry="2.2" fill={featureColor}/>
        
        {/* 코 (가로로 약간 넙적한 타원형) */}
        <ellipse cx="18" cy="20" rx="3" ry="2" fill={featureColor}/>

        {/* 왼쪽 앞발 (동그란 테두리) */}
        <circle 
          cx="12.5" 
          cy="31" 
          r="5.5" 
          fill="#FFFFFF" 
          stroke={brownColor} 
          strokeWidth="1.5"
        />
        
        {/* 오른쪽 앞발 (동그란 테두리) */}
        <circle 
          cx="23.5" 
          cy="31" 
          r="5.5" 
          fill="#FFFFFF" 
          stroke={brownColor} 
          strokeWidth="1.5"
        />
      </g>

      {/* --- 2. 텍스트 영역 --- */}
      {/* 글씨 색상을 귀 색상(brownColor)과 동일하게 적용 */}
      <text 
        x="44" 
        y="25.5" 
        fontFamily="Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif" 
        fontWeight="800" 
        fontSize="17" 
        fill={brownColor} 
        letterSpacing="-0.5"
      >
        어서찾아주개
      </text>
    </svg>
  );
}