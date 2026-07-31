function StatusBadge({ status }) {
  const label = status.replaceAll('_', ' ')

  return (
    <span className={`badge status-${status.toLowerCase()}`}>
      {label}
    </span>
  )
}

export default StatusBadge
