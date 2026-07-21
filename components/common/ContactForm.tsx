"use client";

import { useState } from "react";

type ContactFormProps = {
  variant: "sidebar" | "mobile";
};

export default function ContactForm({ variant }: ContactFormProps) {
  const idPrefix = variant;
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      company: formData.get("company"),
      last_name: formData.get("last_name"),
      first_name: formData.get("first_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      agree: formData.get("agree") === "on",
    };

    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      form.reset();
      setStatus("送信が完了しました。担当者よりご連絡いたします。");
    } catch (error) {
      console.error(error);
      setStatus("送信に失敗しました。しばらくしてから再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  const submitButton = (
    <button className="sidebar-form-submit" type="submit" disabled={submitting}>
      {submitting ? "送信中..." : "送信"}
    </button>
  );

  const statusElement = (
    <p className="sidebar-form-status" data-form-status aria-live="polite">
      {status}
    </p>
  );

  return (
    <form
      className={
        variant === "mobile"
          ? "sidebar-contact-form mobile-local-form"
          : "sidebar-contact-form"
      }
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor={`${idPrefix}-company`}>会社名<span className="required">*</span></label>
        <input id={`${idPrefix}-company`} name="company" type="text" placeholder="WA+CRAFT株式会社" required />
      </div>
      <div className="sidebar-form-row">
        <div>
          <label htmlFor={`${idPrefix}-last-name`}>姓<span className="required">*</span></label>
          <input id={`${idPrefix}-last-name`} name="last_name" type="text" placeholder="日越" required />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-first-name`}>名<span className="required">*</span></label>
          <input id={`${idPrefix}-first-name`} name="first_name" type="text" placeholder="太郎" required />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`}>Eメール　<span className="required">*</span></label>
        <input id={`${idPrefix}-email`} name="email" type="email" placeholder="example@gmail.com" required />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`}>電話番号<span className="required">*</span></label>
        <input id={`${idPrefix}-phone`} name="phone" type="tel" placeholder="090-1234-5678" required />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-message`}>お問い合わせの内容<span className="required">*</span></label>
        <textarea id={`${idPrefix}-message`} name="message" placeholder="例：お客様対応をお願いできる企業を探したい" required></textarea>
      </div>
      <label className="sidebar-form-agree" htmlFor={`${idPrefix}-agree`}>
        <input id={`${idPrefix}-agree`} name="agree" type="checkbox" required />
        <span>
          <a href="/company-profile.html" data-company-modal-open>
            {variant === "mobile" ? "個人情報の取り扱いについて" : "個人情報の取扱いについて"}
          </a>
          同意する<span className="required">*</span>
        </span>
      </label>
      {variant === "sidebar" ? (
        <div className="sidebar-form-submit-wrap">
          {submitButton}
          {statusElement}
        </div>
      ) : (
        <>
          {submitButton}
          {statusElement}
        </>
      )}
    </form>
  );
}
