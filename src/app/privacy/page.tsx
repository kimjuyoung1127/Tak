import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 탁디장",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-main max-w-3xl px-5 py-20 md:py-28">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; 홈으로
        </Link>

        <h1 className="mt-6 text-display-sm font-bold text-foreground">
          개인정보처리방침
        </h1>

        <div className="mt-8 prose prose-gray max-w-none text-sm text-muted-foreground leading-relaxed space-y-6">
          <section>
            <h2 className="text-base font-semibold text-foreground">
              1. 수집하는 개인정보 항목
            </h2>
            <p>
              탁디장은 문의 접수를 위해 다음 항목을 수집합니다: 이름, 연락처,
              브랜드/스토어명, 문의 내용.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              2. 수집 및 이용 목적
            </h2>
            <p>수집된 정보는 상담 회신 및 프로젝트 견적 안내 목적으로만 사용됩니다.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              3. 보유 및 이용 기간
            </h2>
            <p>
              문의 접수일로부터 1년간 보관 후 파기합니다. 단, 관련 법령에 따라
              보관이 필요한 경우 해당 기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              4. 제3자 제공
            </h2>
            <p>
              수집된 개인정보는 제3자에게 제공하지 않습니다. 단, 법령에 의한 요청이
              있는 경우 예외로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              5. 문의
            </h2>
            <p>
              개인정보 관련 문의는 카카오톡 채널 또는 문의 폼을 통해 접수해주세요.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
