# ✅ META PROMPT v4 — Tak Design (탁디장) Landing Page (Next.js 14 + ShadCN + Motion)

## ROLE
You are a senior product designer + motion designer + frontend engineer.
Build a distinctive, high-converting landing page for a Korean product-detail-page designer brand named “탁디장 (Tak Design)”.

## ABSOLUTE GOAL (Single KPI)
Primary KPI = “카톡 상담하기” click conversion.
Everything must optimize for trust → proof → action.

## HARD CONSTRAINTS (Do not violate)
- NO pricing page. NO public price numbers. Pricing is 상담 후 개별 견적 only.
- Avoid generic AI aesthetics (no Inter/Roboto/Arial/system fonts, no purple-gradient-on-white cliché, no boring centered template).
- Must include ALL “11 Essential Elements” from Landing Page Guide V2.
- Must implement microinteractions + motion (purposeful, not decorative) with reduced-motion support.
- Use transform/opacity animations only (avoid width/height/top/left animation).
- Accessibility: semantic sections, keyboard nav, focus-visible, 44x44 touch targets, WCAG AA contrast.
- Production-ready Next.js 14 App Router + TypeScript + Tailwind + ShadCN UI.

## BRAND / PRODUCT CONTEXT
### Brand
- Name: 탁디장 (Tak Design)
- Service: 온라인 셀러(스마트스토어/쿠팡/자사몰) 대상 “판매되는” 상품 상세페이지 제작
- Positioning: 단순 디자인 외주가 아니라 “시장조사 → 기획 → 촬영(옵션) → 콘티 → 상세페이지 납품”까지 하는 전환율 중심 파트너

### Target Audience (ICP)
- Online sellers with low conversion / weak PDP
- Feeling distrust from past outsourcing
- Wants an end-to-end partner

### Offer Summary (Core Flow)
1) 시장조사/트렌드 분석 + 브랜드 정체성 기획
2) 필요 시 제품 촬영
3) 콘티 스케치 제공 → 1차 콘티 피드백으로 시간 절약
4) 업로드용 상세페이지 최종 파일 납품

### Pricing Policy
- 가격은 공개하지 않음
- 상담을 통해 개별 견적
- “작은 건(애매한 소규모 작업) 안 한다”는 원칙을 부드럽게 표현

## DESIGN DIRECTION (Commit to ONE clear direction)
Choose: “Editorial & Premium Minimal (Magazine-like)”
- Large typographic hierarchy (display serif/sans mix)
- Asymmetric layout / grid-breaking bento blocks
- Subtle grain texture + refined neutrals
- Accent color reserved for CTAs only (high contrast)
- Distinctive Korean-friendly fonts (Google Fonts ok)

### Typography (MUST: not Inter/Roboto)
- Display font suggestion: "Fraunces" or "DM Serif Display" (headings)
- Body font suggestion: "Manrope" or "DM Sans" (body)
Use next/font/google. Load only required weights.

### Color System (CSS variables)
Define:
- --bg, --fg, --muted, --card, --border
- --accent (CTA), --accent-foreground
- --shadow, --ring
Keep palette minimal. Add subtle background texture (grain/noise via CSS).

## INFORMATION ARCHITECTURE
Single-page landing with anchored sections:
- Header (logo + nav anchors + primary CTA)
- Hero (title/subtitle/CTA + social proof)
- Media (portfolio preview / mockups)
- Benefits (core advantages)
- Services (4-step offer)
- Testimonials (social proof)
- Portfolio grid (case previews + modal)
- Process timeline (anxiety reduction)
- FAQ (price question handling)
- Final CTA (dramatic conversion moment)
- Footer (contact/legal)

## 11 ESSENTIAL ELEMENTS (MANDATORY CHECKLIST)
1) SEO keyword-friendly title/description + URL structure
2) Company logo header (top-left)
3) SEO-optimized hero title/subtitle (massive)
4) Primary CTA in hero (distinctive)
5) Social proof in hero (rating/stats/avatars)
6) Images/videos (authentic or designed mockups; no generic stock people)
7) Benefits/features (3–6)
8) Testimonials (4–6)
9) FAQ (5–10)
10) Final CTA (bigger than hero CTA)
11) Footer contact + legal links

## CTA STRATEGY (MANDATORY)
CTA label must be consistent:
- Primary: “카톡 상담하기”
- Secondary: “상담지 작성하기” (optional)
CTA repeated at least 6 times (hero/header/services/portfolio/process/faq/final/footer).
CTA destination:
- Use a placeholder env var: NEXT_PUBLIC_KAKAO_CHAT_URL
- Fallback to "#contact" if missing

## MICROINTERACTIONS + MOTION (Purposeful Motion Rules)
Implement the following:
### Timing scale
- hover/tap: 120–160ms
- small transitions: 200–280ms
- modals/section reveals: 320–480ms
Use easing:
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-in: cubic-bezier(0.55, 0, 1, 0.45)
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)

### Required interactions
1) Buttons:
- hover: scale(1.02) + subtle shadow lift
- tap: scale(0.98)
- focus-visible ring
2) Portfolio cards:
- hover: lift + image zoom (transform)
- show “자세히 보기” affordance
- click opens modal with smooth enter/exit (AnimatePresence)
3) FAQ accordion:
- smooth expand/collapse
- icon rotation
4) Scroll reveals:
- sections fade-up on viewport
- stagger card reveals
5) Toast feedback:
- on CTA click, show toast “카톡 상담 링크로 이동합니다”
(If external link open in new tab, still toast)
6) Reduced motion:
- if prefers-reduced-motion, disable motion durations (0ms) and remove parallax/complex animations.

### Performance rules
- Use transform/opacity only for animations.
- Avoid layout thrash. No heavy scroll listeners; use IntersectionObserver or Framer Motion inView.

## LOADING / SKELETON (If any async)
If portfolio data is local static, no skeleton needed.
If you simulate async, use skeleton cards with animate-pulse.

## TECH REQUIREMENTS
- Next.js 14 App Router
- TypeScript strict
- Tailwind + ShadCN UI
- Framer Motion (for transitions + microinteractions)
- next/image with proper sizes, priority for above-the-fold
- next/font for typography
- SEO metadata (OpenGraph + Twitter)
- Accessible semantics: <header><main><section><footer>

## PROJECT STRUCTURE (Generate exactly)
app/
  layout.tsx
  page.tsx
  globals.css
components/
  header.tsx
  hero.tsx
  social-proof.tsx
  media.tsx
  benefits.tsx
  services.tsx
  testimonials.tsx
  portfolio.tsx
  process.tsx
  faq.tsx
  final-cta.tsx
  footer.tsx
components/ui/ (shadcn)
lib/
  motion.ts (variants + easings)
  data.ts (portfolio/testimonials/faqs static data)
  utils.ts (cn, external link helper)
  seo.ts (metadata helpers)

## CONTENT REQUIREMENTS (Korean copy, concise, premium tone)
### Hero copy (example direction; refine)
H1: “판매되는 상세페이지를 만듭니다”
Sub: “시장조사부터 콘티, 촬영(옵션)까지. 셀러의 전환율을 설계하는 탁디장.”
Trust line: “상담 기반 맞춤 견적 · 소규모 애매한 작업은 진행하지 않습니다(명확한 범위만).”

### FAQ MUST include
Q. 가격은 얼마인가요?
A. 프로젝트 범위/상품 수/촬영 여부에 따라 달라서, 상담 후 개별 견적을 안내드립니다.

## IMPLEMENTATION INSTRUCTIONS (Step-by-step)
1) Decide and document design system at top of globals.css and in a comment in page.tsx
2) Implement layout.tsx with SEO metadata + font loading
3) Build page.tsx with section order above
4) Implement components with ShadCN primitives but heavily customized
5) Add motion variants in lib/motion.ts and reuse across components
6) Add reduced-motion handling
7) Add keyboard & focus-visible states
8) Final validation checklist: 11 elements + CTA count + accessibility + reduced motion

## OUTPUT FORMAT (IMPORTANT)
Return:
- File tree
- Then each file content in separate code blocks labeled with file path.
No extra commentary. No placeholders like “...” in code; write complete code.

## FINAL VALIDATION CHECKLIST (MUST PASS)
- [ ] 11 essential elements included
- [ ] CTA repeated >= 6
- [ ] No public pricing
- [ ] Distinct typography (not Inter/Roboto)
- [ ] Motion is purposeful + reduced-motion supported
- [ ] Transform/opacity animation only
- [ ] SEO metadata set
- [ ] Accessible + keyboard navigation ok
- [ ] Looks non-template (editorial layout + custom visuals)

Now implement the site.
