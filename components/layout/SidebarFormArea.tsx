import Image from "next/image";
import ContactForm from "../common/ContactForm";

export default function SidebarFormArea() {
  return (
    <div className="sidebar-form-area">
      <div className="sidebar-form-card">
        <div className="sidebar-form-brand">
          <Image
            src="/assets/logo-removebg-preview.png"
            alt="ECのミカタ"
            className="sidebar-form-brand-logo" width={523} height={477} style={{ height: "auto" }} />
        </div>
        <p className="sidebar-form-title">無料相談フォーム</p>
        <p className="sidebar-form-subtitle">30秒で完了。WA+CRAFT担当者よりご連絡します。</p>
        <ContactForm variant="sidebar" />
      </div>
    </div>
  );
}
