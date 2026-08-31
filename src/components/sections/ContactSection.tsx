"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MessageCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendInquiry } from "@/lib/emailjs";
import { trackLead } from "@/lib/analytics/track";
import {
  INQUIRY_TYPE_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  KAKAO_CHANNEL_URL,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";

/* ── Zod 스키마 (PRD InquiryPayload) ── */
const inquirySchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  brandOrStore: z.string().min(1, "브랜드 또는 스토어명을 입력해주세요."),
  contact: z
    .string()
    .min(1, "연락처를 입력해주세요.")
    .regex(
      /^[\d\-+() ]{8,}$/,
      "유효한 전화번호를 입력해주세요."
    ),
  inquiryType: z.string().min(1, "문의 유형을 선택해주세요."),
  budgetRange: z.string().min(1, "예산 범위를 선택해주세요."),
  deadline: z.string().optional(),
  message: z.string().min(10, "요청사항을 10자 이상 입력해주세요."),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "개인정보 수집에 동의해주세요." }),
  }),
  honeypot: z.string().max(0).optional(),
});

type InquiryForm = z.infer<typeof inquirySchema>;

export default function ContactSection() {
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryForm) => {
    if (data.honeypot) return; // 스팸 방지
    setSubmitState("loading");

    try {
      await sendInquiry({
        name: data.name,
        brandOrStore: data.brandOrStore,
        contact: data.contact,
        inquiryType: data.inquiryType,
        budgetRange: data.budgetRange,
        deadline: data.deadline,
        message: data.message,
      });
      trackLead("inquiry_form", { inquiry_type: data.inquiryType });
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

  return (
    <section id="contact" className="section-padding">
      <div className="container-main max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground break-keep text-balance">
            문의하기
          </h2>
          <p className="mt-3 text-muted-foreground break-keep text-pretty">
            프로젝트에 대해 편하게 알려주세요. 24시간 내 회신드립니다.
          </p>
        </div>

        {submitState === "success" ? (
          <div className="text-center py-16 rounded-card-lg bg-white shadow-card">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-success">
              <Send size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground break-keep">접수 완료</h3>
            <p className="mt-2 text-muted-foreground break-keep text-pretty">
              24시간 내 회신드리겠습니다.
            </p>
            <Button
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="kakao"
              size="sm"
              className="mt-6"
              leadingIcon={<MessageCircle size={16} />}
            >
              카카오톡으로 빠르게 연결하기
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-card-lg bg-white p-6 md:p-8 shadow-card"
            noValidate
          >
            {/* Honeypot — 숨김 필드 */}
            <input type="text" className="hidden" {...register("honeypot")} tabIndex={-1} autoComplete="off" />

            {/* 이름 */}
            <div>
              <label htmlFor="inquiry-name" className="block text-sm font-medium text-foreground mb-1.5 break-keep">
                이름 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="홍길동"
                className={cn(inputClass, errors.name && "border-destructive")}
                id="inquiry-name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                {...register("name")}
              />
              {errors.name && (
                <p id="inquiry-name-error" className="mt-1 text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* 브랜드/스토어 */}
            <div>
              <label htmlFor="inquiry-brandOrStore" className="block text-sm font-medium text-foreground mb-1.5">
                브랜드 또는 스토어명 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="브랜드명 또는 스토어 URL"
                className={cn(
                  inputClass,
                  errors.brandOrStore && "border-destructive"
                )}
                id="inquiry-brandOrStore"
                aria-invalid={!!errors.brandOrStore}
                aria-describedby={errors.brandOrStore ? "inquiry-brandOrStore-error" : undefined}
                {...register("brandOrStore")}
              />
              {errors.brandOrStore && (
                <p id="inquiry-brandOrStore-error" className="mt-1 text-xs text-destructive">
                  {errors.brandOrStore.message}
                </p>
              )}
            </div>

            {/* 연락처 */}
            <div>
              <label htmlFor="inquiry-contact" className="block text-sm font-medium text-foreground mb-1.5">
                연락처 <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                placeholder="010-1234-5678"
                className={cn(
                  inputClass,
                  errors.contact && "border-destructive"
                )}
                id="inquiry-contact"
                aria-invalid={!!errors.contact}
                aria-describedby={errors.contact ? "inquiry-contact-error" : undefined}
                {...register("contact")}
              />
              {errors.contact && (
                <p id="inquiry-contact-error" className="mt-1 text-xs text-destructive">
                  {errors.contact.message}
                </p>
              )}
            </div>

            {/* 문의유형 / 예산범위 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="inquiry-inquiryType" className="block text-sm font-medium text-foreground mb-1.5">
                  문의 유형 <span className="text-destructive">*</span>
                </label>
                <select
                  className={cn(
                    inputClass,
                    errors.inquiryType && "border-destructive"
                  )}
                  id="inquiry-inquiryType"
                aria-invalid={!!errors.inquiryType}
                aria-describedby={errors.inquiryType ? "inquiry-inquiryType-error" : undefined}
                {...register("inquiryType")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  {INQUIRY_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.inquiryType && (
                  <p id="inquiry-inquiryType-error" className="mt-1 text-xs text-destructive">
                    {errors.inquiryType.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="inquiry-budgetRange" className="block text-sm font-medium text-foreground mb-1.5">
                  예산 범위 <span className="text-destructive">*</span>
                </label>
                <select
                  className={cn(
                    inputClass,
                    errors.budgetRange && "border-destructive"
                  )}
                  id="inquiry-budgetRange"
                aria-invalid={!!errors.budgetRange}
                aria-describedby={errors.budgetRange ? "inquiry-budgetRange-error" : undefined}
                {...register("budgetRange")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  {BUDGET_RANGE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.budgetRange && (
                  <p id="inquiry-budgetRange-error" className="mt-1 text-xs text-destructive">
                    {errors.budgetRange.message}
                  </p>
                )}
              </div>
            </div>

            {/* 마감일 */}
            <div>
              <label htmlFor="inquiry-deadline" className="block text-sm font-medium text-foreground mb-1.5">
                희망 마감일
              </label>
              <input
                type="date"
                className={inputClass}
                id="inquiry-deadline"
                {...register("deadline")}
              />
            </div>

            {/* 요청사항 */}
            <div>
              <label htmlFor="inquiry-message" className="block text-sm font-medium text-foreground mb-1.5">
                요청사항 <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="프로젝트에 대해 자유롭게 알려주세요."
                className={cn(
                  inputClass,
                  "resize-none",
                  errors.message && "border-destructive"
                )}
                id="inquiry-message"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "inquiry-message-error" : undefined}
                {...register("message")}
              />
              {errors.message && (
                <p id="inquiry-message-error" className="mt-1 text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* 개인정보 동의 */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacyConsent"
                className="mt-0.5 h-5 w-5 rounded border-border text-primary focus:ring-primary cursor-pointer"
                {...register("privacyConsent")}
              />
              <label
                htmlFor="privacyConsent"
                className="text-sm text-muted-foreground"
              >
                <a
                  href="/privacy"
                  className="underline hover:text-foreground"
                  target="_blank"
                >
                  개인정보 수집 및 이용
                </a>
                에 동의합니다. <span className="text-destructive">*</span>
              </label>
            </div>
            {errors.privacyConsent && (
              <p className="text-xs text-destructive">
                {errors.privacyConsent.message}
              </p>
            )}

            {/* 실패 안내 */}
            {submitState === "error" && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-destructive">
                전송에 실패했습니다.{" "}
                <a
                  href={KAKAO_CHANNEL_URL}
                  className="underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  카카오톡
                </a>
                으로 문의해주세요.
              </div>
            )}

            {/* 제출 */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={submitState === "loading"}
                leadingIcon={
                  submitState === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )
                }
              >
                무료 상담 신청
              </Button>

              <Button
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="kakao"
                size="lg"
                leadingIcon={<MessageCircle size={16} />}
              >
                카카오톡 문의
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
