import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Base / Surface ── */
        background: "#F8F9FA",
        foreground: "#111827",
        card: "#FFFFFF",
        "card-foreground": "#1F2937",

        /* ── Brand Accent ── */
        primary: {
          DEFAULT: "#F59E0B",
          foreground: "#FFFFFF",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
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

        /* ── Muted / Border ── */
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#6B7280",
        },
        border: "#E5E7EB",

        /* ── CTA Dark Zone (Final CTA / Footer) ── */
        "cta-dark": {
          DEFAULT: "#1E293B",
          foreground: "#F8FAFC",
        },

        /* ── Semantic ── */
        destructive: "#EF4444",
        success: "#10B981",
        ring: "#F59E0B",
      },

      fontFamily: {
        sans: [
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
        /* 헤드라인 스케일 */
        "display-lg": ["3.5rem", { lineHeight: "1.15", fontWeight: "800" }],
        "display-md": ["2.75rem", { lineHeight: "1.2", fontWeight: "700" }],
        "display-sm": ["2rem", { lineHeight: "1.25", fontWeight: "700" }],
        /* KPI / 숫자 강조 */
        "kpi": ["3rem", { lineHeight: "1.1", fontWeight: "800" }],
      },

      borderRadius: {
        "card": "1.25rem",  /* 20px — PRD 9.3 카드 라운드 */
        "card-lg": "1.5rem", /* 24px */
      },

      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        "cta": "0 4px 14px rgba(245,158,11,0.35)",
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
