// The original page's inline `toggleFaq` was dead code: nothing referenced it
// and it targeted `.faq-answer`/`.faq-toggle` elements absent from the markup
// (which uses `.faq-answer-new`). It is intentionally not ported, so this
// section stays a server component; answers are always visible, as before.
import SectionHeader from "../ui/SectionHeader";

export default function FaqSection() {
  return (
    <section className="section-faq" id="faq">
      <div className="container-xl">
        <SectionHeader
          bgText="FAQ"
          className="mb-5"
          label="よくある"
          title="ご質問"
        />
        <div className="faq-list">
          <div className="faq-item">
            <div className="faq-question-new">
              <span className="faq-badge faq-badge-q">Q</span>
              <span className="faq-question-text">どのような業務を依頼できますか？
              </span>
            </div>
            <div className="faq-answer-new">
              <span className="faq-badge faq-badge-a">A</span>
              <p className="faq-answer-text">データ入力、データ処理、電子文書管理、システム情報更新をはじめ、<span style={{ fontWeight: "bold", color: "#d76200" }}>お客様の業務フローに合わせた</span><br role="presentation" />
                各種デジタル業務・定型業務に対応しています。</p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question-new">
              <span className="faq-badge faq-badge-q">Q</span>
              <span className="faq-question-text">小規模な業務でも依頼できますか？</span>
            </div>
            <div className="faq-answer-new">
              <span className="faq-badge faq-badge-a">A</span>
              <p className="faq-answer-text">はい。業務量にかかわらず、<span style={{ fontWeight: "bold", color: "#d76200" }}>お客様のご要望に合わせて最適な運用方法</span>をご提案いたします。</p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question-new">
              <span className="faq-badge faq-badge-q">Q</span>
              <span className="faq-question-text">料金はどのように決まりますか？</span>
            </div>
            <div className="faq-answer-new">
              <span className="faq-badge faq-badge-a">A</span>
              <p className="faq-answer-text">ご依頼いただく業務内容、業務量、運用方法などに応じて、<span style={{ fontWeight: "bold", color: "#d76200" }}>お見積りいたします。</span>お客様のご要望やご予算に合わせて、<span style={{ fontWeight: "bold", color: "#d76200" }}>最適なプラン</span>をご提案します。</p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question-new">
              <span className="faq-badge faq-badge-q">Q</span>
              <span className="faq-question-text">依頼した業務を対応するだけですか？改善提案もしてもらえますか？</span>
            </div>
            <div className="faq-answer-new">
              <span className="faq-badge faq-badge-a">A</span>
              <p className="faq-answer-text">まずはお客様のご要望や運用ルールに沿って業務を遂行いたします。
                そのうえで、日々の運用を通じて業務の課題や改善できるポイントを見つけた場合は、<span style={{ fontWeight: "bold", color: "#d76200" }}>効率化や品質向上につながる改善案</span>をご提案いたします。<br role="presentation" />
                ご提案内容にご納得いただいた場合のみ、改善施策の導入・運用を進めます。
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question-new">
              <span className="faq-badge faq-badge-q">Q</span>
              <span className="faq-question-text">データのセキュリティはどのように確保していますか？</span>
            </div>
            <div className="faq-answer-new">
              <span className="faq-badge faq-badge-a">A</span>
              <p className="faq-answer-text">
                お客様のデータを安全に管理するため、<span style={{ fontWeight: "bold", color: "#d76200" }}>厳格な社内セキュリティポリシー</span> を遵守しています。<br />
                安全なファイル送受信環境、アクセス権限の管理、ならびに全従業員との機密保持契約（NDA）の締結など、<span style={{ fontWeight: "bold", color: "#d76200" }}>情報漏えい防止</span>に向けた対策を徹底しています。
              </p>
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question-new">
              <span className="faq-badge faq-badge-q">Q</span>
              <span className="faq-question-text">導入後のサポートはありますか？</span>
            </div>
            <div className="faq-answer-new">
              <span className="faq-badge faq-badge-a">A</span>
              <p className="faq-answer-text">はい。<span style={{ fontWeight: "bold", color: "#d76200" }}>運用開始後も継続的に</span>業務分析・改善を行い、<span style={{ fontWeight: "bold", color: "#d76200" }}>業務品質と生産性の向上</span>をサポートいたします。 </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
