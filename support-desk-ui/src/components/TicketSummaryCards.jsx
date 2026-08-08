const summaries = [
  { label: 'Total Tickets', status: null },
  { label: 'Open', status: 'OPEN' },
  { label: 'In Progress', status: 'IN_PROGRESS' },
  { label: 'Closed', status: 'CLOSED' },
]

function TicketSummaryCards({ tickets }) {
  return (
    <section className="ticket-summary" aria-label="Ticket summary">
      {summaries.map(({ label, status }) => {
        const count = status === null
          ? tickets.length
          : tickets.filter((ticket) => ticket.status === status).length

        return (
          <article className="ticket-summary-card" aria-label={label} key={label}>
            <span>{label}</span>
            <strong>{count}</strong>
          </article>
        )
      })}
    </section>
  )
}

export default TicketSummaryCards
