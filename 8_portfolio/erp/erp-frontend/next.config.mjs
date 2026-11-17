/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // 이 옵션을 반드시 추가해야 합니다.
  },
};

export default nextConfig; // (next.config.mjs인 경우 export default nextConfig;)