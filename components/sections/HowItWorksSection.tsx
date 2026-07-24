import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";

export default function HowItWorksSection() {
  return (
    <section className="section-how" id="how">
      <div className="container-xl">
        <SectionHeader
          bgText="WORKFLOW"
          className="mb-5"
          label="ご利用の"
          title="流れ"
          descClassName="mt-3"
          desc={<>最短1営業日でご提案。フォーム送信から商談まで、<br role="presentation" />すべて無料でサポートします。</>}
        />
        <div className="how-steps">
          <div className="how-step fade-in visible">
            <div className="step-badge">
              <span className="step-badge-label">STEP</span>
              <span className="step-badge-num">01</span>
            </div>
            <div className="step-illust-wrap">
              <Image src="/assets/icontn.png" alt="" className="step-illust" width={326} height={344} />
            </div>
            <div className="step-body">
              <h3 className="step-title">お問い合わせ受付</h3>
              <p className="step-text">お客様からのお問い合わせを受付後、内容を確認し、ご要望や業務内容などをお伺いするため、迅速にご連絡いたします。
              </p>
            </div>
          </div>
          <div className="how-step fade-in visible">
            <div className="step-badge">
              <span className="step-badge-label">STEP</span>
              <span className="step-badge-num">02</span>
            </div>
            <div className="step-illust-wrap">
              <Image src="/assets/ksat2.png" alt="" className="step-illust step-illust-tall" width={351} height={336} />
            </div>
            <div className="step-body">
              <h3 className="step-title">ヒアリング・業務分析
              </h3>
              <p className="step-text">お客様の業務内容、具体的なご要望、現状の課題についてヒアリングを行います。現在の運用フローを分析し、ボトルネックの特定や改善の機会を洗い出します。
              </p>
            </div>
          </div>
          <div className="how-step fade-in visible">
            <div className="step-badge">
              <span className="step-badge-label">STEP</span>
              <span className="step-badge-num">03</span>
            </div>
            <div className="step-illust-wrap">
              <Image src="/assets/dexuat2.png" alt="" className="step-illust" width={345} height={336} />
            </div>
            <div className="step-body">
              <h3 className="step-title">ご提案・お見積り・契約締結 </h3>
              <p className="step-text">分析結果をもとに、日本語対応可能なベトナム人高度人材によるオフショア運用とAI自動化を組み合わせ、お客様に最適なBPOソリューションをご提案します。 運用プラン、業務範囲、お見積りにご合意いただいた後、正式に契約を締結します。</p>
            </div>
          </div>
          <div className="how-step fade-in visible">
            <div className="step-badge">
              <span className="step-badge-label">STEP</span>
              <span className="step-badge-num">04</span>
            </div>
            <div className="step-illust-wrap">
              <Image src="/assets/trienkhai.png" alt="" className="step-illust" width={306} height={365} />
            </div>
            <div className="step-body">
              <h3 className="step-title"> 業務運用・対応実施
              </h3>
              <p className="step-text">合意された契約内容に沿って、業務の立ち上げおよび実務を開始します。品質、納期、セキュリティを徹底して管理し、安定かつ正確なサービスを提供します。</p>
            </div>
          </div>
          <div className="how-step fade-in visible">
            <div className="step-badge">
              <span className="step-badge-label">STEP</span>
              <span className="step-badge-num">05</span>
            </div>
            <div className="step-illust-wrap">
              <Image src="/assets/bangiao.png" alt="" className="step-illust" width={350} height={349} />
            </div>
            <div className="step-body">
              <h3 className="step-title">成果物提出・進捗共有
              </h3>
              <p className="step-text">対応した成果物を納期通りに提出するとともに、定期的に進捗状況を共有します。透明性の高いコミュニケーションを維持し、お客様が常に稼働状況を把握できる体制を整えます。
              </p>
            </div>
          </div>
          <div className="how-step fade-in visible">
            <div className="step-badge">
              <span className="step-badge-label">STEP</span>
              <span className="step-badge-num">06</span>
            </div>
            <div className="step-illust-wrap">
              <Image src="/assets/iconbt.png" alt="" className="step-illust" width={250} height={253} />
            </div>
            <div className="step-body">
              <h3 className="step-title">フィードバック対応・継続改善
              </h3>
              <p className="step-text">成果物をご提出した後も、お客様からのフィードバックをもとに修正・改善・再実施を繰り返します。さらに、運用状況を分析し、必要に応じて当社から改善案をご提案します。フィードバックと改善を継続することで、お客様にとって最適な成果を実現するまで伴走します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
