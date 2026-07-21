export default function DashboardGrid({ children, minColWidth = 230, gap = '1rem' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(${minColWidth}px,1fr))`, gap }}>
      {children}
    </div>
  )
}
