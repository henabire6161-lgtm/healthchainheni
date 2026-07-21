export default function Skeleton({ height = 220, borderRadius = 16, label }) {
  return (
    <div
      role="status"
      aria-label={label || 'Loading content'}
      className="skeleton-shimmer"
      style={{
        height, borderRadius, position: 'relative', overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span className="skeleton-shimmer-sweep" />
      <style>{`
        .skeleton-shimmer-sweep {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.08), transparent);
          animation: skeleton-sweep 1.6s ease-in-out infinite;
        }
        @keyframes skeleton-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-shimmer-sweep { animation: none; opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
