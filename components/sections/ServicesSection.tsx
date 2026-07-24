import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";

export default function ServicesSection() {
  return (
    <section className="section-services" id="services">
      <div className="container-xl">
        <SectionHeader
          bgText="OUR SERVICES"
          className="mb-5"
          label="提供サービス"
          title={<>業務フローに合わせて柔軟に対応します。<div className="d-none d-sm-none d-md-inline"></div></>}
          descClassName="mt-3"
          desc={<>お客様の業務フローに合わせて、<br className="pc-only" role="presentation" /> 日本語対応可能なベトナム人高度人材とAI自動化を組み合わせ、<br className="pc-only" role="presentation" />
            各種デジタル業務・定型業務を柔軟にサポートします。
          </>}
        >
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 col-md-6 col-6">
              <div className="service-blue-card">
                <div className="service-icon-circle">
                  <Image src="/assets/new7.png" alt="" width={387} height={370} style={{ height: "auto" }} />
                </div>
                <h3 className="service-card-title">データ入力代行</h3>
                <p className="service-card-text">データ集計・加工・チェック・照合・クレンジングなど。
                  <br className="pc-only" role="presentation" />各種データの入力・登録・更新を日本語対応で実施。
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-6">
              <div className="service-blue-card">
                <div className="service-icon-circle">
                  <Image src="/assets/new8.png" alt="" width={365} height={389} style={{ height: "auto" }} />
                </div>
                <h3 className="service-card-title">データ処理代行</h3>
                <p className="service-card-text">データ集計・加工・チェック・照合・クレンジングなど。<br className="pc-only" role="presentation" />業務に必要なデータ処理を高速かつ正確に実行。
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-6">
              <div className="service-blue-card">
                <div className="service-icon-circle">
                  <Image src="/assets/new9.png" alt="" width={175} height={208} style={{ height: "auto" }} />
                </div>
                <h3 className="service-card-title">電子文書管理</h3>
                <p className="service-card-text">契約書・請求書・申請書などの電子化、登録、整理、保管。<br className="pc-only" role="presentation" />日本企業向けのセキュリティ基準で運用。
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-6" style={{ marginLeft: "-12px" }}>
              <div className="service-blue-card">
                <div className="service-icon-circle">
                  <Image src="/assets/new10.png" alt="" width={219} height={209} style={{ height: "auto" }} />
                </div>
                <h3 className="service-card-title">システム情報更新</h3>
                <p className="service-card-text">顧客情報・商品情報・在庫情報・マスタデータの更新・メンテナンス。<br className="pc-only" role="presentation" />AI自動化 による高速処理にも対応。
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-6">
              <div className="service-blue-card">
                <div className="service-icon-circle">
                  <Image src="/assets/new11.png" alt="" width={229} height={220} style={{ height: "auto" }} />
                </div>
                <h3 className="service-card-title">定型業務運用支援</h3>
                <p className="service-card-text">日次・週次・月次の定型業務、バックオフィス業務を継続運用。<br className="pc-only" role="presentation" />属人化しやすい業務を標準化し、安定した品質で提供。
                </p>
              </div>
            </div>
          </div>
        </SectionHeader>
      </div>
    </section>
  );
}
