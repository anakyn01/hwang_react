import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 💡 1. 카페24 정적 배포를 위한 필수 설정
  output: 'export',
  basePath: '/portfolio/finddog', // (실제 올리실 하위 경로로 맞춰주세요)
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // 💡 2. 기존 styled-components 클래스명 불일치 방지 유지
  compiler: {
    styledComponents: true,
  },

  // 🚨 [핵심 주의사항] 
  // output: 'export' 사용 시 rewrites, redirects, headers 기능은 Next.js에서 막아두어 에러가 납니다.
  // 따라서 개발하실 때 쓰던 아래 프록시 코드는 주석 처리하거나 지워야 빌드가 통과됩니다!
  /*
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
  */
};

export default nextConfig;