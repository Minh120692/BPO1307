import type { ReactNode } from "react";

type PhaseCardProps = {
  /** Picks the phase-header / phase-badge / title class variant. */
  variant: 1 | 2 | 3;
  /** Badge number text, e.g. "01". */
  num: ReactNode;
  /** Header title. */
  title: ReactNode;
  /** Left column heading (defaults to today's shared text). */
  leftTitle?: ReactNode;
  /** Left column checklist items. */
  items: ReactNode[];
  /** Left column illustration source. */
  imgSrc: string;
  /** Right column heading (card 1 historically renders "効果:"). */
  rightTitle?: ReactNode;
  /** Right column checklist items. */
  effects: ReactNode[];
};

/**
 * One "core value" phase card (ScopeSection). Emits exactly the markup and
 * per-variant class names (`phase-header`/`phase-header2`/`phase-header3`,
 * `phase-badge{,2,3}`, `phase-header-title{,3}`) previously copy-pasted three
 * times.
 */
export default function PhaseCard({
  variant,
  num,
  title,
  leftTitle = "取り組み",
  items,
  imgSrc,
  rightTitle = "効果",
  effects,
}: PhaseCardProps) {
  const sfx = variant === 1 ? "" : String(variant);
  const titleClass = variant === 3 ? "phase-header-title3" : "phase-header-title";
  return (
    <div className="phase-container">
      <div className={`phase-header${sfx}`}>
        <div className={`phase-badge${sfx}`}>
          <span className="phase-label"></span>
          <span className="phase-num">{num}</span>
        </div>
        <h3 className={titleClass}>{title}</h3>
      </div>

      <div className="row g-0 phase-row">
        <div className="col-lg-6 phase-col border-end">
          <div className="col-inner">
            <h4 className="col-sub-title">{leftTitle}</h4>
            <div className="row g-0">
              <div className="col-8">
                <ul className="col-check-list">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-end">
                <div className="col-img-wrap">
                  <img src={imgSrc} alt="" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 phase-col border-end bg-light-blue">
          <div className="col-inner">
            <h4 className="col-sub-title">{rightTitle}</h4>
            <div className="row g-0">
              <div className="col">
                <ul className="col-check-list">
                  {effects.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
