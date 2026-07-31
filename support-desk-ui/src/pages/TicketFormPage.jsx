import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import TicketFormWizard from '../components/TicketFormWizard'
import { useAuth } from '../context/AuthContext'
import { getTicket } from '../services/api'

function TicketFormPage() {
  const { ticketId = '' } = useParams()
  const { token } = useAuth()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(Boolean(ticketId))
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    if (!ticketId) return

    let ignore = false

    getTicket(ticketId, token)
      .then((data) => {
        if (!ignore) setTicket(data)
      })
      .catch((error) => {
        if (!ignore) setLoadError(error.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [ticketId, token])

  const isEditing = Boolean(ticketId)

  return (
    <section className="form-page">
      <div className="dashboard-intro">
        <div>
          <p className="eyebrow">Support request</p>
          <h2>{isEditing ? 'Edit ticket' : 'Create a ticket'}</h2>
        </div>
        <p>Provide enough detail for the support team to begin investigating.</p>
      </div>

      <div className="page-card">
        {loading && <p>Loading ticket...</p>}
        {loadError && <p className="form-message form-error" role="alert">{loadError}</p>}
        {!loading && !loadError && (
          <TicketFormWizard
            key={ticket?.id || 'new'}
            ticketId={ticketId}
            initialValues={ticket || undefined}
          />
        )}
      </div>
    </section>
  )
}

export default TicketFormPage
