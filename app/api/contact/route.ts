import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_TIMEOUT_MS = 10_000;

const MAX_LENGTHS = {
  company: 200,
  last_name: 100,
  first_name: 100,
  email: 320,
  phone: 50,
  message: 5000,
} as const;

function cleanRequired(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

function cleanOptional(value: unknown, max: number): string | null {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length > max) return null;
  return trimmed;
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

function invalidInput() {
  return NextResponse.json(
    { ok: false, error: "invalid_input" },
    { status: 400 },
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return invalidInput();
  }

  if (typeof body !== "object" || body === null) {
    return invalidInput();
  }

  const raw = body as Record<string, unknown>;

  const company = cleanRequired(raw.company, MAX_LENGTHS.company);
  const lastName = cleanRequired(raw.last_name, MAX_LENGTHS.last_name);
  const firstName = cleanRequired(raw.first_name, MAX_LENGTHS.first_name);
  const email = cleanRequired(raw.email, MAX_LENGTHS.email);
  const phone = cleanOptional(raw.phone, MAX_LENGTHS.phone);
  const message = cleanOptional(raw.message, MAX_LENGTHS.message);

  if (
    company === null ||
    lastName === null ||
    firstName === null ||
    email === null ||
    !EMAIL_PATTERN.test(email) ||
    phone === null ||
    message === null ||
    raw.agree !== true
  ) {
    return invalidInput();
  }

  const lead = {
    type: "contact_lead",
    company,
    last_name: lastName,
    first_name: firstName,
    email,
    phone,
    message,
    receivedAt: new Date().toISOString(),
  };

  console.log(JSON.stringify(lead));

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmailTo = process.env.CONTACT_EMAIL_TO;

  if (resendApiKey && contactEmailTo) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
          to: contactEmailTo,
          reply_to: email,
          subject: `お問い合わせ: ${singleLine(company)}`,
          text: [
            `会社名: ${company}`,
            `お名前: ${lastName} ${firstName}`,
            `メールアドレス: ${email}`,
            `電話番号: ${phone}`,
            `お問い合わせ内容: ${message}`,
            `受信日時: ${lead.receivedAt}`,
          ].join("\n"),
        }),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        console.error(
          `Resend API returned ${response.status}; lead already logged.`,
          detail,
        );
      }
    } catch (error) {
      console.error("Failed to send email via Resend; lead already logged.", error);
    }
  } else if (resendApiKey || contactEmailTo) {
    console.warn(
      "Partial email config: set both RESEND_API_KEY and CONTACT_EMAIL_TO; email skipped, lead only logged.",
    );
  }

  return NextResponse.json({ ok: true });
}
