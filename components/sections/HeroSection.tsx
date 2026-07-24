import CtaButton from "../common/CtaButton";

function CheckIcon() {
  return (
    <svg
      className="hero-check-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M7.5 12.2l3 3 6-6.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const HERO_BULLETS = [
  "AI自動化を内製できるBPO",
  "最短24時間で神速システム構築",
  "プロフェッショナルなチーム運営",
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-brand">WA+CRAFT BPO</p>
          <h1 className="hero-headline">業務プロセスの最適化!</h1>
          <p className="hero-subcopy">
            <span className="hero-accent">日本語対応</span> × <span className="hero-accent">AI自動化</span> ×<br className="hero-subcopy-br" /> <span className="hero-accent">オフショアBPO</span>、<br className="hero-subcopy-br" /><span className="hero-accent-orange">最短1日</span>から超高速導入!
          </p>
          <ul className="hero-checklist">
            {HERO_BULLETS.map((text) => (
              <li key={text}>
                <CheckIcon />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="hero-cta">
            <CtaButton className="hero-cta-btn" label="無料相談はこちら" />
          </div>
        </div>
        <div className="hero-visual">
          {/* Bubble CSS được neo theo % bên trong hero-character để luôn phủ
              kín bong bóng nướng sẵn trong ảnh gốc ở mọi kích thước. */}
          <div className="hero-character">
            <p className="hero-bubble">
              こんにちは、WA+CRAFT BPOです。お客様のビジネスを支えるパートナーとして、いつでもお気軽にご相談ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
