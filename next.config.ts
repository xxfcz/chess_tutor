import type { NextConfig } from "next";

// Check if building for mobile (static export) or web (server)
const isMobileBuild = process.env.BUILD_TARGET === 'mobile';

const nextConfig: NextConfig = {
  // Mobile: static export (no API routes, no server)
  // Web: standalone (includes API routes)
  output: isMobileBuild ? 'export' : 'standalone',

  // Disable image optimization for static export
  images: {
    unoptimized: isMobileBuild,
  },

  // Next.js 16 默认只允许 localhost 访问 /_next/* 开发资源（含 HMR WebSocket）。
  // 通过局域网 IP 或 VPN 虚拟网卡（如 Clash/Mihomo TUN 的 198.18.0.1）打开时，
  // HMR 会被 blockCrossSiteDEV 拦掉并报 "WebSocket connection failed"。
  // 这里放开本机局域网地址与常见 VPN TUN 网段，方便真机/多设备联调。
  allowedDevOrigins: [
    '198.18.0.1',   // Mihomo / Clash Meta TUN 虚拟网卡
    '192.168.*.*',  // 局域网
    '10.*.*.*',
    '172.16.*.*',   // 172.16.0.0 ~ 172.31.255.255 简化写法
  ],

  // Environment variables
  env: {
    NEXT_PUBLIC_USE_REMOTE_ENGINE: process.env.NEXT_PUBLIC_USE_REMOTE_ENGINE || (isMobileBuild ? 'true' : 'false'),
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
};

export default nextConfig;
