"use client";
import React from 'react';

export default function AdminLogoIcon({ width = 36, height = 36, className }: { width?: number, height?: number, className?: string }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 흰색 얼굴 바탕 */}
      <ellipse cx="18" cy="18" rx="14" ry="13" fill="#FFFFFF"/>

      {/* 귀 (연한 쿨그레이로 흰색 얼굴과 경계를 주어 입체감 부여) */}
      <ellipse cx="8" cy="14" rx="6.5" ry="11" transform="rotate(-25 8 14)" fill="#cbd5e1"/>
      <ellipse cx="28" cy="14" rx="6.5" ry="11" transform="rotate(25 28 14)" fill="#cbd5e1"/>

      {/* 눈/코 (다크 사이드바 배경색과 동일하게 맞춰 뚫려있는 듯한 효과) */}
      <ellipse cx="14" cy="16" rx="1.5" ry="2.2" fill="#0f172a"/>
      <ellipse cx="22" cy="16" rx="1.5" ry="2.2" fill="#0f172a"/>
      <ellipse cx="18" cy="20" rx="3" ry="2" fill="#0f172a"/>

      {/* 앞발 */}
      <circle cx="12.5" cy="31" r="5.5" fill="#FFFFFF" stroke="#cbd5e1" strokeWidth="1.5"/>
      <circle cx="23.5" cy="31" r="5.5" fill="#FFFFFF" stroke="#cbd5e1" strokeWidth="1.5"/>
    </svg>
  );
}