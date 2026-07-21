"use client";

import Image from "next/image";
import { scrollToContactForm } from "../common/scrollToContactForm";

export default function Header() {
  const handleHeaderCtaClick = () => {
    scrollToContactForm();
  };

  return (
    <header className="site-header">
      <div className="container-xl">
        <div className="header-inner">
          <div className="header-logo">
            <Image src="/assets/wacrlogonew.svg" alt="EC Support Match" className="logo-img" width={558} height={750} unoptimized priority style={{ width: "auto" }} />
          </div>
          <div className="header-center">
            <div className="header-tel">
              <Image src="/assets/mail3.png" alt="" className="tel-icon" width={328} height={253} />
              <span className="tel-label">Email Address</span>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nomoto-t@wacraft-jp.com"
                className="tel-number"
                target="_blank"
                rel="noopener noreferrer"
              >
                nomoto-t@wacraft-jp.com
              </a>
              <span className="tel-hours">Weekdays 9:00-18:00</span>
            </div>
          </div>
          <div className="header-cta">
            <a href="tel:0917231967" className="btn btn-call-header-mobile">0917-231-967</a>
            <button
              type="button"
              className="header-cta-image-button"
              aria-label="Consult Free Now"
              onClick={handleHeaderCtaClick}
            >
              <Image src="/assets/arrow2.png" alt="Consult Free Now" className="header-cta-image" width={453} height={205} style={{ height: "auto" }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
