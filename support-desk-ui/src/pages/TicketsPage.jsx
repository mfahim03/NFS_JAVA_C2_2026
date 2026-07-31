import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import ApiInfoCard from '../components/ApiInfoCard'
import TicketDetail from '../components/TicketDetail'
import TicketFilterPanel from '../components/TicketFilterPanel'
import TicketList from '../components/TicketList'
import { useAuth } from '../context/AuthContext'
import { fetchApiInfo, getTickets } from '../services/api'

function TicketsPage() {
  const { token } = useAuth()
  const [tickets, setTickets] = useState([])
  const [selectedTicketId, setSelectedTicketId] = useState('')
  const [ticketsLoading, setTicketsLoading] = useState(true)
  const [ticketsError, setTicketsError] = useState('')
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [priorityFilter, setPriorityFilter] = useState('ALL')
  const [apiInfo, setApiInfo] = useState(null)
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadApiInfo() {
      try {
        const data = await fetchApiInfo()

        if (!ignore) {
          setApiInfo(data)
        }
      } catch {
        if (!ignore) {
          setApiError(
            'Could not connect to the Day 10 API. Start Spring Boot on port 8080 and refresh the page.',
          )
        }
      } finally {
        if (!ignore) {
          setApiLoading(false)
        }
      }
    }

    loadApiInfo()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false

    getTickets(token)
      .then((data) => {
        if (!ignore) {
          setTickets(data)
          setSelectedTicketId((currentId) => currentId || data[0]?.id || '')
        }
      })
      .catch((error) => {
        if (!ignore) setTicketsError(error.message)
      })
      .finally(() => {
        if (!ignore) setTicketsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [token])

  const filteredTickets = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase()

    return tickets.filter((ticket) => {
      const matchesSearch =
        normalizedSearch === '' ||
        ticket.title.toLowerCase().includes(normalizedSearch) ||
        ticket.category.toLowerCase().includes(normalizedSearch)
      const matchesStatus =
        statusFilter === 'ALL' || ticket.status === statusFilter
      const matchesPriority =
        priorityFilter === 'ALL' || ticket.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tickets, searchText, statusFilter, priorityFilter])

  const selectedTicket =
    filteredTickets.find((ticket) => ticket.id === selectedTicketId) ??
    filteredTickets[0] ??
    null

  function clearFilters() {
    setSearchText('')
    setStatusFilter('ALL')
    setPriorityFilter('ALL')
  }

  return (
    <>
      <section className="dashboard-intro">
        <div>
          <p className="eyebrow">Workspace</p>
          <h2>Ticket dashboard</h2>
        </div>
        <p>Select a ticket to review its full details.</p>
      </section>

      <ApiInfoCard
        loading={apiLoading}
        error={apiError}
        apiInfo={apiInfo}
      />

      <TicketFilterPanel
        searchText={searchText}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={setSearchText}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onClearFilters={clearFilters}
      />

      {ticketsLoading && <p className="form-message">Loading tickets...</p>}
      {ticketsError && <p className="form-message form-error" role="alert">{ticketsError}</p>}
      {!ticketsLoading && !ticketsError && (
        <div className="ticket-workspace">
          <TicketList
            tickets={filteredTickets}
            selectedTicketId={selectedTicket?.id}
            onSelectTicket={(ticket) => setSelectedTicketId(ticket.id)}
          />
          <TicketDetail ticket={selectedTicket} />
        </div>
      )}
    </>
  )
}

export default TicketsPage
