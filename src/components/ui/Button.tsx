import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CTA 버튼/링크 공용 프리미티브.
 * 기존 사이트에 흩어져 있던 primary/outline/soft/ghost 버튼 클래스를 한곳에 모았다.
 * href가 있으면 <a>, 없으면 <button>으로 렌더한다.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // 메인 CTA — 탁디장 브랜드 로즈(로고색)
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-700 shadow-cta",
        // 로즈 액센트 CTA (primary와 동일 계열 — 다크 배경 위 포인트용)
        accent:
          "bg-primary text-primary-foreground hover:bg-primary-700 shadow-cta",
        outline:
          "border border-foreground/15 bg-white text-foreground hover:bg-muted",
        outlineDark:
          "border border-gray-600 text-gray-200 hover:border-gray-400 hover:text-white",
        soft: "bg-primary-50 text-primary-700 hover:bg-primary-100",
        ghost: "text-primary hover:text-primary-700",
        kakao: "bg-[#FEE500] text-[#3C1E1E] hover:bg-[#F5DC00]",
      },
      size: {
        sm: "px-5 py-2.5 min-h-[44px] rounded-md text-sm",
        md: "px-5 py-3 min-h-[48px] rounded-md text-sm",
        lg: "px-6 py-3.5 md:px-8 md:py-4 min-h-[48px] rounded-md text-sm md:text-base",
        pill: "px-6 py-3 rounded-md text-sm",
        link: "text-sm",
      },
      fullWidth: {
        true: "w-full sm:w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  className?: string;
  children: ReactNode;
  /** 후행 아이콘(예: ArrowRight). 16~18px 권장 */
  trailingIcon?: ReactNode;
  /** 선행 아이콘 */
  leadingIcon?: ReactNode;
};

type ButtonProps = ButtonOwnProps &
  Omit<ComponentProps<"a"> & ComponentProps<"button">, "ref" | "className">;

export function Button({
  href,
  variant,
  size,
  fullWidth,
  className,
  children,
  trailingIcon,
  leadingIcon,
  ...rest
}: ButtonProps) {
  const Comp: ElementType = href ? "a" : "button";
  return (
    <Comp
      href={href}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </Comp>
  );
}
