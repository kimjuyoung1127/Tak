/**
 * CSP 허용 출처.
 * 이 사이트의 사업 목적이 광고 전환 측정이라 측정 스크립트가 죽으면 CSP 자체가 실패다.
 * 출처를 추가할 일이 생기면 여기만 고친다.
 */
const ANALYTICS = {
  script: [
    "https://www.googletagmanager.com",
    "https://www.googleadservices.com",
    "https://googleads.g.doubleclick.net",
    "https://pagead2.googlesyndication.com",
    "https://connect.facebook.net",
    "https://wcs.pstatic.net",
    "https://ssl.pstatic.net",
  ],
  connect: [
    "https://api.emailjs.com",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://region1.google-analytics.com",
    "https://stats.g.doubleclick.net",
    "https://www.googletagmanager.com",
    "https://connect.facebook.net",
    "https://wcs.naver.net",
    "https://nam.veta.naver.com",
    "https://ad.doubleclick.net",
    "https://www.google.com",
    "https://www.google.co.kr",
  ],
  // Google Ads 리마케팅 비콘은 www.google.com·ad.doubleclick.net 으로 리다이렉트된다
  // (Report-Only 로 먼저 돌려서 실제 위반 출처로 확인한 값)
  frame: [
    "https://www.googletagmanager.com",
    "https://td.doubleclick.net",
    "https://ad.doubleclick.net",
    "https://www.google.com",
    "https://www.google.co.kr",
    "https://www.facebook.com",
  ],
};

/**
 * gtag·fbq 는 인라인 부트스트랩 스니펫을 쓰므로 script-src 에 'unsafe-inline' 이 불가피하다.
 * nonce 로 좁히려면 미들웨어에서 요청마다 nonce 를 발급해야 해서 별도 작업으로 분리했다.
 * img-src 는 광고 픽셀이 도메인을 수시로 바꿔서 https: 전체를 허용한다 — 이미지는 실행되지 않는다.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' ${ANALYTICS.script.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${ANALYTICS.connect.join(" ")}`,
  `frame-src ${ANALYTICS.frame.join(" ")}`,
  "media-src 'self'",
].join("; ");

/**
 * CSP 강제 적용 (2026-08-31).
 * Report-Only 로 먼저 배포해 운영에서 실제 위반을 수집했고, 두 출처
 * (ad.doubleclick.net · www.google.com — Google Ads 리마케팅 비콘 리다이렉트)를
 * 허용 목록에 반영한 뒤 위반 0을 확인하고 강제로 올렸다.
 * 되돌릴 일이 생기면 헤더 이름에 `-Report-Only` 만 다시 붙이면 된다.
 */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 828, 1200],
    imageSizes: [256, 384],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
