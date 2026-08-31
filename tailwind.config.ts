import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Base / Surface (에디토리얼 오프화이트 + 근접 블랙) ── */
        background: "#FAFAF8",
        foreground: "#1A1A1A",
        card: "#FFFFFF",
        "card-foreground": "#1A1A1A",

        /* ── Brand Accent (Rose) ──
           원래 500(#CB6664)은 흰 글자 대비 3.73:1, 오프화이트 위 본문 3.57:1 로 WCAG AA(4.5:1) 미달이었다.
           DEFAULT 는 그 색상각(hue)을 그대로 두고 채도를 올려 밝기를 되찾은 값이다 —
           #BD4442 는 primary 텍스트가 놓이는 배경 3종 모두에서 통과한다 —
           흰 카드 5.16:1 · 오프화이트 4.94:1 · muted(#F2F1EE) 4.57:1. 후기 섹션이 muted 배경이라 이게 기준선이다.
           연한 로즈가 필요한 자리는 primary-500 을 직접 지목해 쓴다. */
        primary: {
          DEFAULT: "#BD4442",
          foreground: "#FFFFFF",
          50: "#FDF2F2",
          100: "#FBE8E8",
          200: "#F5CDCC",
          300: "#EDA9A7",
          400: "#DB8382",
          500: "#CB6664",
          600: "#B04E4C",
          700: "#923D3B",
        },

        /* ── Trust / Strategy Blue ── */
        secondary: {
          DEFAULT: "#1E3A5F",
          foreground: "#FFFFFF",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },

        /* ── Muted / Border (warm neutral) ── */
        muted: {
          DEFAULT: "#F2F1EE",
          /* #6F6F6C 는 muted 배경(#F2F1EE) 위에서 4.46:1 로 AA(4.5:1)에 미달했다. 한 톤만 낮춰 4.66:1. */
          foreground: "#6C6C69",
        },
        border: "#E6E4DF",

        /* ── CTA Dark Zone (Final CTA / Footer) ── */
        "cta-dark": {
          DEFAULT: "#161615",
          foreground: "#FAFAF8",
        },

        /* ── Semantic ── */
        destructive: "#EF4444",
        success: "#10B981",
        ring: "#CB6664",
      },

      fontFamily: {
        sans: [
          "var(--font-pretendard)",
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "sans-serif",
        ],
      },

      fontSize: {
        /* 헤드라인 스케일 — 에디토리얼 대비 강화(크게 + 타이트) */
        "display-lg": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-md": ["3.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["2.25rem", { lineHeight: "1.18", letterSpacing: "-0.01em", fontWeight: "700" }],
        /* KPI / 숫자 강조 */
        "kpi": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" }],
      },

      borderRadius: {
        "card": "0.625rem",  /* 10px — 에디토리얼 샤프 */
        "card-lg": "0.75rem", /* 12px */
      },

      boxShadow: {
        /* 플랫 — border 중심, 그림자는 최소 */
        "card": "0 1px 2px rgba(26,26,26,0.04)",
        "card-hover": "0 6px 20px rgba(26,26,26,0.07)",
        "cta": "0 1px 2px rgba(26,26,26,0.08)",
      },

      maxWidth: {
        "container": "1400px",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 220ms ease-out",
        "accordion-up": "accordion-up 220ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
