import { KAKAO_CHANNEL_URL } from "@/lib/constants";

const FOOTER_LINKS = {
  서비스: [
    { label: "포트폴리오", href: "#portfolio" },
    { label: "프로세스", href: "#process" },
    { label: "문의하기", href: "#contact" },
  ],
  정보: [
    { label: "소개", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "개인정보처리방침", href: "/privacy" },
  ],
  연결: [
    { label: "카카오톡 채널", href: KAKAO_CHANNEL_URL },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-cta-dark text-cta-dark-foreground">
      <div className="container-main px-5 md:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs">
                T
              </span>
              <span className="text-base font-bold">탁디장</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              팔리는 상세페이지를 설계하는
              <br />
              디자인 스튜디오
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
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
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} 탁디장. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
