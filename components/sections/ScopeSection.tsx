import PhaseCard from "../ui/PhaseCard";

export default function ScopeSection() {
  return (
    <section className="section-problems" id="scope">
      <div className="container-xl">
        <div className="section-header mb-5">
          <span className="section-en-bg">VALUE PROPOSITION</span>
          <div className="section-heading">
            <span className="section-heading-label">最適化された運用ソリューション</span>
            <span className="section-heading-title">従来のBPOを超えて</span>
          </div>
          <p className="section-desc mt-3">私たちのBPOサービスは、専門スタッフによる業務分析と、日本語対応可能なベトナム人高度人材、そしてAIの活用を組み合わせることで、お客様一社一社の長期的な成長を支える「自動化とコスト最適化された運用メカニズム」を提供します。
            <br className="pc-only" role="presentation" /></p>

          <p className="section-desc mt-3">お客様に圧倒的な価値をもたらす、3つのコアバリューをご紹介します。<br className="pc-only" role="presentation" /></p>
        </div>

        <PhaseCard
          variant={1}
          num="01"
          title="より効率的に（リソースの最適化）"
          items={[
            "ITツール活用による反復業務の自動化",
            "マクロ・スクリプトによる手作業の最小化",
            "AI自動化による高速処理",
            "ベトナム人高度人材（日本語対応）による大規模処理体制",
            "プロセス改善による無駄工程の排除",
          ]}
          imgSrc="/img/point01.png"
          imgWidth={316}
          imgHeight={356}
          rightTitle="効果:"
          effects={[
            "運用時間とコストの大幅削減",
            "国内BPO比で最大50〜60%のコスト最適化",
            "コア業務へのリソース集中",
            "大量処理でも安定した納期を維持",
            "一人あたりの生産性向上",
          ]}
        />

        <PhaseCard
          variant={2}
          num="02"
          title="より高品質に（正確性と一貫性の向上）"
          items={[
            "厳格な運用基準の適用",
            "日本語対応可能なベトナム人スタッフによる運用",
            "日本式チェック体制（二重チェック・チェックリスト）",
            "実データに基づくプロセス改善",
            "AIによる自動チェック・照合",
          ]}
          imgSrc="/img/point02.png"
          imgWidth={314}
          imgHeight={346}
          effects={[
            "高品質なアウトプットの維持",
            "正確かつ一貫した業務品質の実現",
            "ヒューマンエラーの大幅削減",
            "顧客からの信頼性向上",
            "処理プロセスのリスク軽減",
          ]}
        />

        <PhaseCard
          variant={3}
          num="03"
          title="より持続的に（人に依存しない仕組みづくり）"
          items={[
            "業務マニュアルの標準化・整備",
            "日本語マニュアルによるスムーズな引き継ぎ",
            "オフショア拠点による継続的な人材確保",
            "パフォーマンスの自動レポート化（AI活用）",
            "運用の継続的なモニタリング・アップデート",
          ]}
          imgSrc="/img/point03.png"
          imgWidth={291}
          imgHeight={310}
          effects={[
            "属人化の解消",
            "人員変動に左右されない安定した品質",
            "長期的な成長に向けた運用基盤の構築",
            "業務の継続性とナレッジ継承の確保",
            "改善サイクルが自走する運用モデルの実現",
          ]}
        />
      </div>
    </section>
  );
}
