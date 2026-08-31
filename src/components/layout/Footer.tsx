import Image from "next/image";
import { Instagram, Youtube } from "lucide-react";
import { KAKAO_CHANNEL_URL } from "@/lib/constants";
import { SITE } from "@/lib/seo/site";

const SOCIAL_LINKS = [
  { label: "인스타그램", href: SITE.social.instagram, Icon: Instagram },
  { label: "유튜브", href: SITE.social.youtube, Icon: Youtube },
];

const FOOTER_LINKS = {
  서비스: [
    { label: "전체 서비스", href: "/services" },
    { label: "탁몽 (AI 상세페이지)", href: "/takmong" },
    { label: "가격 안내", href: "/pricing" },
    { label: "포트폴리오", href: "/portfolio" },
    { label: "블로그운영", href: "/blog-management" },
  ],
  정보: [
    { label: "프로세스", href: "/#process" },
    { label: "FAQ", href: "/#faq" },
    { label: "개인정보처리방침", href: "/privacy" },
  ],
  연결: [
    { label: "문의하기", href: "/#contact" },
    { label: "카카오톡 채널", href: KAKAO_CHANNEL_URL },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border text-foreground">
      <div className="container-main px-5 md:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo.png"
              alt="탁디장"
              width={851}
              height={359}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              팔리는 상세페이지를 설계하는
              <br />
              디자인 스튜디오
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h2 className="text-sm font-semibold mb-4 text-foreground">
                {title}
              </h2>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border space-y-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {SITE.business.name} · 사업자등록번호 {SITE.business.businessNumber}
            <span className="mx-1.5 hidden md:inline">·</span>
            <br className="md:hidden" />
            {SITE.business.addressRegion} {SITE.business.addressLocality}{" "}
            {SITE.business.streetAddress} · {SITE.business.phone}
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} 탁디장. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                개인정보처리방침
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
