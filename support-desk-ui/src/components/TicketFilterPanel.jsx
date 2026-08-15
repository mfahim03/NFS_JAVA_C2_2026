function TicketFilterPanel({
  searchText,
  statusFilter,
  priorityFilter,
  pageSize,
  sortBy,
  direction,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onPageSizeChange,
  onSortByChange,
  onDirectionChange,
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
        <span>Page size</span>
        <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </label>

      <label>
        <span>Sort by</span>
        <select value={sortBy} onChange={(event) => onSortByChange(event.target.value)}>
          <option value="createdAt">Created date</option>
          <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="title">Title</option>
        </select>
      </label>

      <label>
        <span>Direction</span>
        <select value={direction} onChange={(event) => onDirectionChange(event.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
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
