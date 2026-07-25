function TicketFilterPanel({
  searchText,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
}) {
  const hasActiveFilters =
    searchText.trim() !== '' ||
    statusFilter !== 'ALL' ||
    priorityFilter !== 'ALL'

  return (
    <section className="filter-panel" aria-label="Ticket filters">
      <label className="search-field">
        <span>Search tickets</span>
        <input
          type="search"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or category"
        />
      </label>

      <label>
        <span>Status</span>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="ALL">All statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </label>

      <label>
        <span>Priority</span>
        <select
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="ALL">All priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </label>

      <button
        className="clear-filters"
        type="button"
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
      >
        Clear
      </button>
    </section>
  )
}

export default TicketFilterPanel
