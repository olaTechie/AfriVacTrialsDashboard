import { wordTokens } from '../utils/dataUtils';

export default function TagCloud({ rows, column, title }) {
  const words = wordTokens(rows, column);
  const max = Math.max(...words.map((word) => word.value), 1);

  return (
    <article className="tag-cloud-card">
      <h3>{title}</h3>
      <div className="tag-cloud">
        {words.map((word) => (
          <span
            key={word.text}
            style={{
              fontSize: `${0.78 + (word.value / max) * 1.15}rem`,
              opacity: 0.55 + (word.value / max) * 0.45,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </article>
  );
}
