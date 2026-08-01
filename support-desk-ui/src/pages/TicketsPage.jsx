import { useEffect, useMemo, useState } from 'react'
import '../App.css'
import ApiInfoCard from '../components/ApiInfoCard'
import TicketDetail from '../components/TicketDetail'
import TicketFilterPanel from '../components/TicketFilterPanel'
import TicketList from '../components/TicketList'
import { useAuth } from '../context/AuthContext'
import { useTicketData } from '../context/TicketDataContext'
import { fetchApiInfo } from '../services/api'

function TicketsPage() {
  const { token } = useAuth()
  const { state, dispatch, loadTickets, updateTicketStatus } = useTicketData()
  const { page, size, sortBy, direction } = state
  const cacheKey = `${page}|${size}|${sortBy}|${direction}`
  const cachedPage = state.pageCache[cacheKey]
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
    loadTickets(token, { page, size, sortBy, direction }, cachedPage)
  }, [token, page, size, sortBy, direction, cachedPage, loadTickets])

  function refreshTickets() {
    loadTickets(token, { page, size, sortBy, direction }, null, true)
  }

  const filteredTickets = useMemo(() => {
    const normalizedSearch = state.searchText.trim().toLowerCase()

    return state.tickets.filter((ticket) => {
      const matchesSearch =
        normalizedSearch === '' ||
        ticket.title.toLowerCase().includes(normalizedSearch) ||
        ticket.category.toLowerCase().includes(normalizedSearch)
      const matchesStatus =
        state.statusFilter === 'ALL' || ticket.status === state.statusFilter
      const matchesPriority =
        state.priorityFilter === 'ALL' || ticket.priority === state.priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [state.tickets, state.searchText, state.statusFilter, state.priorityFilter])

  const selectedTicket =
    filteredTickets.find((ticket) => ticket.id === state.selectedTicketId) ??
    filteredTickets[0] ??
    null

  function clearFilters() {
    dispatch({ type: 'SET_SEARCH_TEXT', payload: '' })
    dispatch({ type: 'SET_STATUS_FILTER', payload: 'ALL' })
    dispatch({ type: 'SET_PRIORITY_FILTER', payload: 'ALL' })
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
        searchText={state.searchText}
        statusFilter={state.statusFilter}
        priorityFilter={state.priorityFilter}
        pageSize={state.size}
        sortBy={state.sortBy}
        direction={state.direction}
        onSearchChange={(value) => dispatch({ type: 'SET_SEARCH_TEXT', payload: value })}
        onStatusChange={(value) => dispatch({ type: 'SET_STATUS_FILTER', payload: value })}
        onPriorityChange={(value) => dispatch({ type: 'SET_PRIORITY_FILTER', payload: value })}
        onPageSizeChange={(value) => dispatch({ type: 'SET_SIZE', payload: value })}
        onSortByChange={(value) => dispatch({ type: 'SET_SORT', payload: { sortBy: value, direction: state.direction } })}
        onDirectionChange={(value) => dispatch({ type: 'SET_SORT', payload: { sortBy: state.sortBy, direction: value } })}
        onClearFilters={clearFilters}
      />

      {state.loading && <p className="form-message">Loading tickets...</p>}
      {state.error && <p className="form-message form-error" role="alert">{state.error}</p>}
      {!state.loading && !state.error && (
        <div className="data-load-status">
          <span aria-live="polite">{state.lastLoadSource}</span>
          <button type="button" onClick={refreshTickets}>Refresh tickets</button>
        </div>
      )}
      {!state.loading && !state.error && (
        <div className="ticket-workspace">
          <TicketList
            tickets={filteredTickets}
            selectedTicketId={selectedTicket?.id}
            onSelectTicket={(ticket) => dispatch({ type: 'SELECT_TICKET', payload: ticket.id })}
          />
          <TicketDetail
            ticket={selectedTicket}
            onStatusChange={(status) => updateTicketStatus(token, selectedTicket, status)}
            isUpdating={state.updatingTicketId === selectedTicket?.id}
            updateError={state.updateError}
          />
        </div>
      )}
      {!state.loading && !state.error && (
        <nav className="pagination-controls" aria-label="Ticket pagination">
          <button type="button" onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page - 1 })} disabled={state.page === 0}>Previous</button>
          <span>Page {state.totalPages === 0 ? 0 : state.page + 1} of {state.totalPages} ({state.totalElements} tickets)</span>
          <button type="button" onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page + 1 })} disabled={state.page + 1 >= state.totalPages}>Next</button>
        </nav>
      )}
    </>
  )
}

export default TicketsPage
