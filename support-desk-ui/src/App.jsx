import { useMemo, useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import TicketDetail from './components/TicketDetail'
import TicketFilterPanel from './components/TicketFilterPanel'
import TicketList from './components/TicketList'
import { sampleTickets } from './data/sampleTickets'

function App() {
  const [selectedTicketId, setSelectedTicketId] = useState(sampleTickets[0].id)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [priorityFilter, setPriorityFilter] = useState('ALL')

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
    <Layout>
      <section className="dashboard-intro">
        <div>
          <p className="eyebrow">Workspace</p>
          <h2>Ticket dashboard</h2>
        </div>
        <p>Select a ticket to review its full details.</p>
      </section>

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
    </Layout>
  )
}

export default App
