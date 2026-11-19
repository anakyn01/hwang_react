import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // 정적 HTML/CSS/JS 파일로 빌드 (out 폴더 생성)
  basePath: "/portfolio/mes", // 배포될 하위 경로 설정
  trailingSlash: true,       // 하위 페이지 새로고침 시 404 방지 (/admin/index.html 형태 생성)
  images: {
    unoptimized: true,       // 정적 빌드 시 next/image 오류 방지
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;