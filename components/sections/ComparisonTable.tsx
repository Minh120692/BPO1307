type MarkLevel = "bad" | "mid" | "good";

const MARK_SYMBOL: Record<MarkLevel, string> = { bad: "×", mid: "△", good: "◎" };
const MARK_LABEL: Record<MarkLevel, string> = { bad: "劣る", mid: "普通", good: "優れる" };

function Mark({ level }: { level: MarkLevel }) {
  return (
    <>
      <span className={`comparison-mark comparison-mark-${level}`} aria-hidden="true">
        {MARK_SYMBOL[level]}
      </span>
      <span className="visually-hidden">{MARK_LABEL[level]}</span>
    </>
  );
}

type Row = {
  item: string;
  own: string;
  general: string;
  wacraft: string;
};

const ROWS: Row[] = [
  {
    item: "コスト",
    own: "高コスト",
    general: "主に国内人財でやや高額",
    wacraft: "オフショア活用で最大50〜60%のコスト削減可能",
  },
  {
    item: "柔軟性",
    own: "人員調整が難しい",
    general: "契約範囲内での調整が中心",
    wacraft: "スケールフリー運用で人員変動に強い",
  },
  {
    item: "継続性",
    own: "担当者に依存し退職リスクあり",
    general: "担当者の交代は可能だが品質に差が出る場合あり",
    wacraft: "若手IT人材の継続確保で長期的な安定運用を実現",
  },
  {
    item: "標準化",
    own: "マニュアル整備が遅れている",
    general: "既存のプロセスをそのまま運用",
    wacraft: "日本語マニュアルと日本式のチェック体制を完備",
  },
  {
    item: "改善・見直し",
    own: "日常業務に追われて改善が難しい",
    general: "契約範囲内での改善に限定",
    wacraft: "AIによる自動化と継続的な改善提案を実施",
  },
];

export default function ComparisonTable() {
  return (
    <div className="comparison-design">
      <div className="comparison-design-top">
        <img
          className="comparison-chara comparison-chara-woman"
          src="/assets/compare-woman.png"
          alt=""
          aria-hidden="true"
        />
        <p className="comparison-bubble">WA+CRAFT BPOにお任せください！</p>
        <img
          className="comparison-chara comparison-chara-man"
          src="/assets/compare-man.png"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="comparison-table-wrap">
      <table className="comparison-table">
        <caption className="visually-hidden">WA+CRAFT BPOにお任せください！</caption>
        <thead>
          <tr>
            <th scope="col">比較項目</th>
            <th scope="col">自社実施</th>
            <th scope="col">一般的なBPO</th>
            <th scope="col" className="comparison-col-wacraft">
              WA+CRAFT BPO
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.item}>
              <th scope="row">{row.item}</th>
              <td>
                <Mark level="bad" />
                {row.own}
              </td>
              <td>
                <Mark level="mid" />
                {row.general}
              </td>
              <td className="comparison-col-wacraft">
                <Mark level="good" />
                {row.wacraft}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
