import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Oversized english watermark text (`.section-en-bg`). */
  bgText: ReactNode;
  /** Small label above the title (`.section-heading-label`). */
  label: ReactNode;
  /** Main heading (`.section-heading-title`). */
  title: ReactNode;
  /** Optional description paragraph (`.section-desc`). */
  desc?: ReactNode;
  /** Extra classes appended to the `.section-header` wrapper (e.g. `mb-5`). */
  className?: string;
  /** Extra classes appended to the `.section-desc` paragraph (e.g. `mt-3`). */
  descClassName?: string;
  /** Extra content rendered inside the wrapper, after the description. */
  children?: ReactNode;
};

/**
 * Shared section heading block: watermark + label/title + optional
 * description. Emits exactly the markup previously copy-pasted into each
 * section component; divergent headers (e.g. ScopeSection's responsive dual
 * titles) intentionally do not use this component.
 */
export default function SectionHeader({
  bgText,
  label,
  title,
  desc,
  className,
  descClassName,
  children,
}: SectionHeaderProps) {
  return (
    <div className={className ? `section-header ${className}` : "section-header"}>
      <span className="section-en-bg">{bgText}</span>
      <div className="section-heading">
        <span className="section-heading-label">{label}</span>
        <span className="section-heading-title">{title}</span>
      </div>
      {desc !== undefined && (
        <p className={descClassName ? `section-desc ${descClassName}` : "section-desc"}>
          {desc}
        </p>
      )}
      {children}
    </div>
  );
}
