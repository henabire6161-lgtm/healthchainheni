const styles = {
  green: { background:'#dcfce7', color:'#15803d' },
  red:   { background:'#fee2e2', color:'#dc2626' },
  amber: { background:'#fef3c7', color:'#d97706' },
  blue:  { background:'#dbeafe', color:'#2563eb' },
  gray:  { background:'#f1f5f9', color:'#475569' },
}
export default function Badge({ label, variant='gray', dot }) {
  const s = styles[variant]||styles.gray
  return (
    <span style={{
      display:'inline-flex',alignItems:'center',gap:'5px',
      padding:'0.2rem 0.6rem',borderRadius:'99px',
      fontSize:'0.72rem',fontWeight:700,...s
    }}>
      {dot && <span style={{width:5,height:5,borderRadius:'50%',background:s.color}}/>}
      {label}
    </span>
  )
}
