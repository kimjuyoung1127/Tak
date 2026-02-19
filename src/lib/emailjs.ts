import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export interface EmailPayload {
  name: string;
  brandOrStore: string;
  contact: string;
  inquiryType: string;
  budgetRange: string;
  deadline?: string;
  message: string;
}

export async function sendInquiry(payload: EmailPayload): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "[EmailJS] 환경변수가 설정되지 않았습니다. .env.local을 확인하세요."
    );
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: payload.name,
    brand: payload.brandOrStore,
    contact: payload.contact,
    inquiry_type: payload.inquiryType,
    budget: payload.budgetRange,
    deadline: payload.deadline || "미정",
    message: payload.message,
  }, PUBLIC_KEY);
}
