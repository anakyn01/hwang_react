import type { NextConfig } from "next";


const nextConfig = {
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
