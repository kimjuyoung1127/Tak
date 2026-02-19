"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-main flex items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
            T
          </span>
          <span className="text-lg font-bold text-foreground">탁디장</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-600 transition-colors shadow-cta"
          >
            무료 상담
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center h-11 w-11 rounded-lg text-foreground hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          className="md:hidden bg-white border-t border-border px-5 py-4 space-y-1"
          role="navigation"
          aria-label="모바일 메뉴"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-muted-foreground py-3 min-h-[44px] flex items-center"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block text-center px-5 py-3 min-h-[48px] flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold mt-2"
            onClick={() => setMobileOpen(false)}
          >
            무료 상담
          </a>
        </nav>
      )}
    </header>
  );
}
