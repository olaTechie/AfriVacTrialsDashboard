export default function SectionHeader({ eyebrow, title, copy, actions }) {
  return (
    <header className="section-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
      {actions && <div className="section-actions">{actions}</div>}
    </header>
  );
}
