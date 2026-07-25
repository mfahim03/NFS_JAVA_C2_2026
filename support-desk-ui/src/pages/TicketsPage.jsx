import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import ApiInfoCard from '../components/ApiInfoCard'
import TicketDetail from '../components/TicketDetail'
import TicketFilterPanel from '../components/TicketFilterPanel'
import TicketList from '../components/TicketList'
import { sampleTickets } from '../sampleTickets'
import { fetchApiInfo } from '../services/api'

function TicketsPage() {
  const [selectedTicketId, setSelectedTicketId] = useState(sampleTickets[0].id)
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

  const filteredTickets = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase()

    return sampleTickets.filter((ticket) => {
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
  }, [searchText, statusFilter, priorityFilter])

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

      <div className="ticket-workspace">
        <TicketList
          tickets={filteredTickets}
          selectedTicketId={selectedTicket?.id}
          onSelectTicket={(ticket) => setSelectedTicketId(ticket.id)}
        />
        <TicketDetail ticket={selectedTicket} />
      </div>
    </>
  )
}

export default TicketsPage
