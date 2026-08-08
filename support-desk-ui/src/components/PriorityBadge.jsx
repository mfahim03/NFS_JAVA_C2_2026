function PriorityBadge({ priority }) {
  return (
    <span className={`badge priority-${priority.toLowerCase()}`}>
      {priority}
    </span>
  )
}

export default PriorityBadge
