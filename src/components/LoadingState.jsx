export default function LoadingState({ label = 'Preparing analysis' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loader-ring" />
      <span>{label}</span>
    </div>
  );
}
