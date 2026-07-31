import PriorityBadge from './PriorityBadge'
import StatusBadge from './StatusBadge'

function TicketDetail({ ticket }) {
  if (!ticket) {
    return (
      <section className="panel detail-panel detail-empty">
        <p>There is no ticket to display.</p>
      </section>
    )
  }

  return (
    <section className="panel detail-panel" aria-labelledby="ticket-detail-heading">
      <div className="detail-heading">
        <div>
          <p className="eyebrow">Ticket detail</p>
          <h2 id="ticket-detail-heading">{ticket.title}</h2>
        </div>
        <span className="ticket-id">{ticket.id}</span>
      </div>

      <div className="badge-row">
        <PriorityBadge priority={ticket.priority} />
        <StatusBadge status={ticket.status} />
      </div>

      <p className="ticket-description">{ticket.description}</p>

      <dl className="ticket-facts">
        <div>
          <dt>Category</dt>
          <dd>{ticket.category}</dd>
        </div>
        <div>
          <dt>Created by</dt>
          <dd>{ticket.createdBy}</dd>
        </div>
        <div>
          <dt>Created on</dt>
          <dd>
            <time dateTime={ticket.createdAt}>{ticket.createdAt}</time>
          </dd>
        </div>
      </dl>
    </section>
  )
}

export default TicketDetail
