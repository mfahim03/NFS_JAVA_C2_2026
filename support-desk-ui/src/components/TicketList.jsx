import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'

function TicketList({ tickets, selectedTicketId, onSelectTicket }) {
  return (
    <section className="panel ticket-list-panel" aria-labelledby="ticket-list-heading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Inbox</p>
          <h2 id="ticket-list-heading">Support tickets</h2>
        </div>
        <span className="ticket-count">{tickets.length}</span>
      </div>

      <div className="ticket-list">
        {tickets.length === 0 && (
          <div className="empty-state">
            <div aria-hidden="true">?</div>
            <h3>No tickets found</h3>
            <p>Try changing or clearing your filters.</p>
          </div>
        )}

        {tickets.map((ticket) => {
          const isSelected = ticket.id === selectedTicketId

          return (
            <button
              className={`ticket-row${isSelected ? ' selected' : ''}`}
              type="button"
              key={ticket.id}
              onClick={() => onSelectTicket(ticket)}
              aria-pressed={isSelected}
            >
              <span className="ticket-row-top">
                <strong>{ticket.title}</strong>
                <PriorityBadge priority={ticket.priority} />
              </span>
              <span className="ticket-row-meta">
                <span>{ticket.category}</span>
                <StatusBadge status={ticket.status} />
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default TicketList
