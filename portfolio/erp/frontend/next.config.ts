import stylexPlugin from "@stylexjs/nextjs-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 기존 styled-components SSR 최적화 설정 유지
  compiler: {
    styledComponents: true,
  },
  // 💡 Turbopack 경고를 해결하기 위한 빈 설정 추가
  turbopack: {},
};

export default stylexPlugin({
  rootDir: __dirname,
})(nextConfig);