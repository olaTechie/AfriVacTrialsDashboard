import { motion as Motion } from 'framer-motion';

export default function MetricCard({ label, value, tone = 'sage', detail }) {
  return (
    <Motion.article
      className={`metric-card tone-${tone}`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </Motion.article>
  );
}
