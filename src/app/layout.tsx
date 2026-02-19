import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://takdjang.com"),
  title: "탁디장 | 팔리는 상세페이지를 설계합니다",
  description:
    "기획·촬영·디자인·원본까지 한 번에. 매출을 올리는 상세페이지 전문 디자인 스튜디오, 탁디장입니다.",
  openGraph: {
    title: "탁디장 | 팔리는 상세페이지를 설계합니다",
    description:
      "기획·촬영·디자인·원본까지 한 번에. 매출을 올리는 상세페이지 전문 디자인 스튜디오.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
