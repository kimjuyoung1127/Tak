import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE, VERIFICATION } from "@/lib/seo/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { Analytics } from "@/components/analytics/Analytics";

/**
 * Pretendard 자체 호스팅.
 * 이전에는 jsdelivr CSS를 <link>로 물려 렌더가 2,090ms 막혔다(모바일 실측).
 * next/font/local 은 @font-face 를 앱 CSS에 인라인하므로 외부 origin 왕복도, 렌더 차단도 없다.
 * 서브셋 = KS X 1001 상용 한글 2,350자 + 사이트 실사용 문자 + 라틴/구두점 (scripts/build-font-subset.sh).
 *
 * preload: false — 이 사이트의 LCP 요소는 텍스트가 아니라 히어로 배경 이미지다.
 * preload 를 켜면 442KB woff2 가 High 우선순위로 72ms 에 먼저 나가면서
 * LCP 이미지(Low 우선순위, 910ms 시작)의 대역폭을 뺏는다 — 운영 실측에서 모바일 LCP 가
 * 9.2s → 9.9s 로 되레 나빠졌다. display:swap 이라 폰트는 늦게 와도 글자가 안 보이지 않는다.
 */
const pretendard = localFont({
  src: "./fonts/PretendardVariable.subset.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "탁디장 | 상세페이지부터 웹사이트·홍보까지 설계합니다",
    template: "%s | 탁디장",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "상세페이지 제작",
    "스마트스토어 상세페이지",
    "브랜드 웹사이트 제작",
    "검색 광고 홍보",
    "디자인 스튜디오",
    "탁디장",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE.name,
    title: "탁디장 | 상세페이지부터 웹사이트·홍보까지",
    description:
      "상세페이지 · 웹사이트 제작 · 검색/광고 홍보 · 운영 관리를 한 곳에서. 매출을 설계하는 디자인 스튜디오.",
    url: SITE.url,
    type: "website",
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: "탁디장 | 상세페이지부터 웹사이트·홍보까지",
    description:
      "상세페이지 · 웹사이트 제작 · 검색/광고 홍보 · 운영 관리를 한 곳에서.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // 소유확인 코드는 .env.local 에서 주입(값이 있을 때만 태그 출력)
  verification: {
    google: VERIFICATION.google,
    other: VERIFICATION.naver
      ? { "naver-site-verification": VERIFICATION.naver }
      : {},
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        {children}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Analytics />
      </body>
    </html>
  );
}
