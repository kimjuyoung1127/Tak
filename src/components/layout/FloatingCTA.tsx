"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="카카오톡으로 문의하기"
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <MessageCircle size={24} />
      </button>
      <div
        className={cn(
          "fixed bottom-[5.5rem] right-6 z-40 rounded-xl bg-foreground text-white text-sm font-medium px-4 py-2.5 shadow-lg transition-all duration-300",
          showToast
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0 pointer-events-none"
        )}
      >
        카카오톡 채널 준비중입니다
      </div>
    </>
  );
}
