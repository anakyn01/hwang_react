import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 💡 카페24 정적 배포를 위한 필수 설정
  output: 'export',
  basePath: '/portfolio/mes', // (접속을 원하시는 경로명으로 맞춰주세요. 예: '/erp' 또는 '/portfolio/erp')
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // 💡 기존에 쓰시던 styled-components 설정 유지
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;