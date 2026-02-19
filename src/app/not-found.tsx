import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5 text-center">
      <p className="text-sm font-medium text-primary tracking-widest uppercase">
        Coming Soon
      </p>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
        페이지 준비중입니다
      </h1>
      <p className="mt-4 text-muted-foreground max-w-md">
        현재 준비중인 페이지입니다. 빠른 시일 내에 찾아뵙겠습니다.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-600 transition-colors shadow-cta"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
