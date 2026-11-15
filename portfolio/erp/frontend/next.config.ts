import stylexPlugin from "@stylexjs/nextjs-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 💡 카페24 정적 배포를 위한 필수 추가 설정
  output: 'export',           // Node.js 서버 없이 순수 HTML/CSS/JS로 추출
  basePath: '/portfolio/erp',           // 도메인 하위 경로(/erp)에서 에셋(CSS, 이미지 등)을 정확히 찾도록 설정
  trailingSlash: true,        // 새로고침 시 404 에러 방지 (경로 끝에 / 를 붙여 폴더 형태로 라우팅)
  images: {
    unoptimized: true,        // output: 'export' 사용 시 Next.js 자체 이미지 최적화 서버 기능을 꺼야 빌드 가능
  },

  // 기존 설정 유지
  compiler: {
    styledComponents: true,
  },
  // Turbopack 경고를 해결하기 위한 빈 설정 유지
  turbopack: {},
};

export default stylexPlugin({
  rootDir: __dirname,
})(nextConfig);

