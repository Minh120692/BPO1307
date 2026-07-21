export default function ComparisonSection() {
  return (
    <section className="section-comparison" id="choose-us">
      <div className="container-xl">
        <div className="section-header mb-5">
          <span className="section-en-bg">WHY CHOOSE US</span>
          <div className="section-heading">
            <span className="section-heading-label">WA+CRAFT BPO</span>
            <span className="section-heading-title">選ばれる理由</span>
          </div>
          <p className="section-desc mt-3">自社で探す方法や一括見積サイトと比べて、WA+CRAFTのマッチングサービスが選ばれる理由を比較でご確認ください。</p>
        </div>
        <div className="comparison-svg-wrap">
          <div className="row">
            <div className="col-sm-10 offset-sm-1">
              <img src="/assets/newtable.jpeg" alt="比較表" className="comparison-svg-img" role="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
