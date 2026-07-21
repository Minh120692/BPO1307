"use client";

import { useEffect, useState } from "react";

export default function CompanyModal() {
  const [hidden, setHidden] = useState(true);

  // Openers live elsewhere in the page (privacy links carrying
  // [data-company-modal-open]); listen for them like the original script.
  useEffect(() => {
    const openers = document.querySelectorAll("[data-company-modal-open]");
    if (openers.length === 0) return;

    const handleOpen = (event: Event) => {
      event.preventDefault();
      setHidden(false);
    };

    openers.forEach((link) => link.addEventListener("click", handleOpen));
    return () => {
      openers.forEach((link) => link.removeEventListener("click", handleOpen));
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHidden(true);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  // The body class mirrors the open state; the cleanup also guarantees the
  // scroll lock never outlives the modal.
  useEffect(() => {
    document.body.classList.toggle("company-modal-open", !hidden);
    return () => document.body.classList.remove("company-modal-open");
  }, [hidden]);

  const closeCompanyModal = () => {
    setHidden(true);
  };

  return (
    <div className="company-modal" id="company-modal" hidden={hidden}>
      <div
        className="company-modal__backdrop"
        data-company-modal-close
        onClick={closeCompanyModal}
      ></div>
      <div
        className="company-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="company-modal-title"
      >
        <button
          type="button"
          className="company-modal__close"
          aria-label="閉じる"
          data-company-modal-close
          onClick={closeCompanyModal}
        >
          ×
        </button>
        <p className="company-modal__eyebrow">Privacy Policy</p>
        <h3 className="company-modal__title" id="company-modal-title">プライバシーポリシー</h3>
        <div className="company-modal__body">
          <p>当社は、お客様、お取引先様ならびに当社ウェブサイトをご利用いただく皆様の個人情報を適切に保護することを重要な責務と考えています。</p>
          <p>取得した個人情報は、お問い合わせへの回答、ご相談・ご依頼への対応、サービス案内、お客様との連絡、業務改善、法令対応の範囲内で利用いたします。</p>
          <p>法令で認められる場合を除き、ご本人の同意なく第三者へ個人情報を提供いたしません。詳細はプライバシーポリシーページをご確認ください。</p>
        </div>
      </div>
    </div>
  );
}
