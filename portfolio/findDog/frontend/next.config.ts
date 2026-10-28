import type { NextConfig } from "next";


const nextConfig = {
  // 💡 [추가] styled-components 클래스명 불일치(Hydration) 에러 완벽 해결
  compiler: {
    styledComponents: true,
  },
  // 💡 [핵심] 3000번 포트로 오는 /api 요청을 8080번으로 몰래 토스(Proxy)해줍니다!
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
