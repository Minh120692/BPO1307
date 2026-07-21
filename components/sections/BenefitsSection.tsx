export default function BenefitsSection() {
  return (
    <section className="section-benefits" id="benefits">
      <div className="container-xl">
        <div className="section-header mb-5">
          <span className="section-en-bg">BENEFITS</span>
          <div className="section-heading">
            <span className="section-heading-label">最適な付加価値の提供</span>
            <span className="section-heading-title">貴社の成長に伴走します</span>
          </div>
          <p className="section-desc mt-3">私たちは、貴社の事業にとって最も必要とされる価値を、 <br />妥協することなく提供し続けることに努めてまいります。</p>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="benefit-card fade-in visible">
              <img src="/img/man03.png" alt="" className="benefit-illust" />
              <h3 className="benefit-title">改善できる業務は、改善まで考える</h3>
              <p className="benefit-text">日々の運用を通じて課題を見つけ、改善提案まで継続してサポートします。</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="benefit-card fade-in visible">
              <img src="/img/woman03.png" alt="" className="benefit-illust" />
              <h3 className="benefit-title">人だけに頼らない運用をつくる</h3>
              <p className="benefit-text">マクロ・スクリプト・各種ツールを活用し、繰り返し作業の削減や業務効率化をご提案します。</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="benefit-card fade-in visible">
              <img src="/img/man04.png" alt="" className="benefit-illust" />
              <h3 className="benefit-title">属人化しない仕組みを残す</h3>
              <p className="benefit-text">業務フローやマニュアルを整理し、担当者に依存しにくい運用体制づくりを支援します。</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="benefit-card fade-in visible">
              <img src="/img/woman4040.png" alt="" className="benefit-illust" />
              <h3 className="benefit-title">お客様ごとに最適な運用を設計する </h3>
              <p className="benefit-text">決まったサービスを提供するのではなく、業務内容や課題に合わせて運用方法をご提案します。</p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="benefit-card fade-in visible">
              <img src="/assets/st01.png" alt="" className="benefit-illust" />
              <h3 className="benefit-title">本業へ集中できる環境を支える</h3>
              <p className="benefit-text">バックオフィス業務の負担を軽減し、お客様が事業成長により多くのリソースを使える環境づくりを目指します。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
