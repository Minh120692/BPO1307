"use client";

import { useEffect, useState } from "react";
import { scrollToContactForm } from "./scrollToContactForm";

export default function FloatingCta() {
  // Fail closed: chỉ hiện nút sau khi observer xác nhận form/footer KHÔNG
  // trong viewport — nếu môi trường thiếu IntersectionObserver hoặc không tìm
  // thấy section, nút giữ trạng thái ẩn để không bao giờ che form.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Theo dõi cả section form mobile lẫn footer: nút ẩn khi một trong hai
    // đang hiện để không che form controls, status message hay link footer.
    const targets = [
      document.querySelector(".mobile-final-form"),
      document.querySelector("footer"),
    ].filter((el): el is Element => el !== null);

    if (targets.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target);
          } else {
            intersecting.delete(entry.target);
          }
        });
        setVisible(intersecting.size === 0);
      },
      { threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="floating-cta" data-form-visible={visible ? "false" : "true"}>
      <button
        type="button"
        className="floating-cta-btn"
        onClick={() => scrollToContactForm()}
      >
        無料相談フォームを開く
      </button>
    </div>
  );
}
