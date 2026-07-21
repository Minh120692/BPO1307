import SectionHeader from "../ui/SectionHeader";

export default function ProblemsSection() {
  return (
    <section className="section-problems" id="problems">
      <div className="container-xl">
        <SectionHeader
          bgText="YOUR PROBLEMS"
          className="mb-5"
          label="日々の業務の中で,"
          title="このようなお悩みはありませんか？"
          descClassName="mt-3"
          desc={<>一つでも当てはまる場合は、<br className="pc-only" role="presentation" />BPOサービスの活用によって業務効率化・生産性向上につながる可能性があります。</>}
        />
        <div className="row g-4 problems-grid">
          <div className="col-md-4">
            <div className="problem-card fade-in visible">
              <div className="problem-card-header">
                <img src="/assets/new1.png" alt="" className="problem-icon" />
                <h3 className="problem-title">人材不足で業務が回らない  </h3>
              </div>
              <ul className="problem-solve-list">
                <li><span className="solve-name">必要な人材を迅速に採用できない</span></li>
                <li><span className="solve-name">既存スタッフの負担が増え、業務が属人化・過重労働になりやすい</span></li>
                <li><span className="solve-name">人手不足により、日々の業務量が増え続けている</span></li>
                <li><span className="solve-name">安定した業務運営や納期の維持が難しくなっている</span></li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="problem-card fade-in visible">
              <div className="problem-card-header">
                <img src="/assets/new2.png" alt="" className="problem-icon" />
                <h3 className="problem-title">定型業務で手一杯</h3>
              </div>
              <ul className="problem-solve-list">
                <li><span className="solve-name">日々のデータ入力に多くの時間を費やしている</span></li>
                <li><span className="solve-name">書類や資料の管理に多くの工数がかかっている</span></li>
                <li><span className="solve-name">定型業務に人員やリソースが取られている</span></li>
                <li><span className="solve-name">本来注力すべきコア業務に集中できない</span></li>
              </ul>
            </div>
          </div>
          {/* カード3 */}
          <div className="col-md-4">
            <div className="problem-card fade-in visible">
              <div className="problem-card-header">
                <img src="/assets/new31.png" alt="" className="problem-icon" />
                <h3 className="problem-title"> 生産性が向上しない</h3>
              </div>
              <ul className="problem-solve-list">
                <li><span className="solve-name">手作業による業務が多く、効率化が進んでいない</span></li>
                <li><span className="solve-name">業務処理に多くの時間がかかり、負担が大きい</span></li>
                <li><span className="solve-name">ヒューマンエラーや入力ミスが発生しやすい環境</span></li>
                <li><span className="solve-name">業務効率や生産性が思うように向上していない</span></li>
              </ul>
            </div>
          </div>
          {/* カード4 */}
          <div className="col-md-4">
            <div className="problem-card fade-in visible">
              <div className="problem-card-header">
                <img src="/assets/new4.png" alt="" className="problem-icon" />
                <h3 className="problem-title">業務改善が進まない </h3>
              </div>
              <ul className="problem-solve-list">
                <li><span className="solve-name">業務改善の必要性は感じているものの</span></li>
                <li><span className="solve-name">何から着手すべきかわからない状況</span></li>
                <li><span className="solve-name">日々の業務に追われ、余裕がない</span></li>
                <li><span className="solve-name">改善プロジェクトが後回しになってしまう</span></li>
              </ul>
            </div>
          </div>
          {/* カード5 */}
          <div className="col-md-4">
            <div className="problem-card fade-in visible">
              <div className="problem-card-header">
                <img src="/assets/new5.png" alt="" className="problem-icon" />
                <h3 className="problem-title">業務量に対応できない</h3>
              </div>
              <ul className="problem-solve-list">
                <li><span className="solve-name">業務量に応じた柔軟な人員配置ができない</span></li>
                <li><span className="solve-name">繁忙期には人手不足が発生しやすい</span></li>
                <li><span className="solve-name">閑散期には余剰人員が発生してしまう</span></li>
                <li><span className="solve-name">安定した業務運営とコスト最適化が難しい</span></li>
              </ul>
            </div>
          </div>
          {/* カード6 */}
          <div className="col-md-4">
            <div className="problem-card fade-in visible">
              <div className="problem-card-header">
                <img src="/assets/new6.png" alt="" className="problem-icon" />
                <h3 className="problem-title">属人化で標準化が難しい</h3>
              </div>
              <ul className="problem-solve-list">
                <li><span className="solve-name">業務が特定の担当者の経験やスキルに依存している</span></li>
                <li><span className="solve-name">業務の標準化やスムーズな引き継ぎが進まない</span></li>
                <li><span className="solve-name">担当者の異動や退職時に業務の継続が難しくなる</span></li>
                <li><span className="solve-name">業務品質や進捗スケジュールに影響を受けやすい</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
