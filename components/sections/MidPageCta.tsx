"use client";

import { scrollToContactForm } from "../common/scrollToContactForm";

export default function MidPageCta() {
  return (
    <section className="mid-page-cta" aria-label="無料相談">
      <div className="container-xl">
        <div className="mid-page-cta-inner">
          <p className="mid-page-cta-lead">
            30秒で入力完了。WA+CRAFT担当者よりご連絡します。
          </p>
          <button
            type="button"
            className="mid-page-cta-btn"
            onClick={() => scrollToContactForm()}
          >
            無料相談はこちら
          </button>
        </div>
      </div>
    </section>
  );
}
