import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { getPagedTickets, updateTicket } from '../services/api'

const TicketDataContext = createContext(null)

const initialState = {
  tickets: [],
  selectedTicketId: '',
  loading: false,
  error: '',
  page: 0,
  size: 5,
  totalPages: 0,
  totalElements: 0,
  sortBy: 'createdAt',
  direction: 'desc',
  searchText: '',
  statusFilter: 'ALL',
  priorityFilter: 'ALL',
  pageCache: {},
  lastLoadSource: '',
  updatingTicketId: '',
  updateError: '',
}

function replaceTicket(tickets, updatedTicket) {
  return tickets.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
}

function replaceCachedTicket(pageCache, updatedTicket) {
  return Object.fromEntries(
    Object.entries(pageCache).map(([key, pageData]) => [
      key,
      { ...pageData, content: replaceTicket(pageData.content, updatedTicket) },
    ]),
  )
}

function applyPage(state, pageData, lastLoadSource) {
  const { content = [], number = 0, size = state.size, totalPages = 0, totalElements = 0 } = pageData
  return {
    ...state,
    tickets: content,
    page: number,
    size,
    totalPages,
    totalElements,
    selectedTicketId: content.some((ticket) => ticket.id === state.selectedTicketId)
      ? state.selectedTicketId
      : (content[0]?.id ?? ''),
    loading: false,
    error: '',
    lastLoadSource,
  }
}

function ticketDataReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: '' }
    case 'LOAD_SUCCESS': {
      return {
        ...applyPage(state, action.payload, 'Fetched from backend'),
        pageCache: { ...state.pageCache, [action.cacheKey]: action.payload },
      }
    }
    case 'LOAD_CACHE':
      // A fetch can populate the current page cache while the effect is running.
      // Keep its "Fetched from backend" message instead of immediately replacing it.
      if (state.tickets === action.payload.content) return state
      return applyPage(state, action.payload, 'Loaded from cache')
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload }
    case 'SET_STATUS_FILTER':
      return { ...state, statusFilter: action.payload }
    case 'SET_PRIORITY_FILTER':
      return { ...state, priorityFilter: action.payload }
    case 'SELECT_TICKET':
      return { ...state, selectedTicketId: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SET_SIZE':
      return { ...state, size: action.payload, page: 0 }
    case 'SET_SORT':
      return { ...state, ...action.payload, page: 0 }
    case 'STATUS_UPDATE_OPTIMISTIC':
      return {
        ...state,
        tickets: replaceTicket(state.tickets, action.payload),
        pageCache: replaceCachedTicket(state.pageCache, action.payload),
        updatingTicketId: action.payload.id,
        updateError: '',
      }
    case 'STATUS_UPDATE_SUCCESS':
      return {
        ...state,
        tickets: replaceTicket(state.tickets, action.payload),
        pageCache: replaceCachedTicket(state.pageCache, action.payload),
        updatingTicketId: '',
      }
    case 'STATUS_UPDATE_ROLLBACK':
      return {
        ...state,
        tickets: replaceTicket(state.tickets, action.payload.ticket),
        pageCache: replaceCachedTicket(state.pageCache, action.payload.ticket),
        updatingTicketId: '',
        updateError: action.payload.message,
      }
    default:
      return state
  }
}

export function TicketDataProvider({ children }) {
  const [state, dispatch] = useReducer(ticketDataReducer, initialState)

  const loadTickets = useCallback(async (token, pageInfo, cachedPage, forceReload = false) => {
    if (cachedPage && !forceReload) {
      dispatch({ type: 'LOAD_CACHE', payload: cachedPage })
      return
    }

    const cacheKey = `${pageInfo.page}|${pageInfo.size}|${pageInfo.sortBy}|${pageInfo.direction}`
    dispatch({ type: 'LOAD_START' })
    try {
      const result = await getPagedTickets(token, pageInfo)
      dispatch({ type: 'LOAD_SUCCESS', payload: result, cacheKey })
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', payload: error.message })
    }
  }, [])

  const updateTicketStatus = useCallback(async (token, ticket, status) => {
    if (ticket.status === status) return

    const backup = { ...ticket }
    const optimisticTicket = { ...ticket, status }
    dispatch({ type: 'STATUS_UPDATE_OPTIMISTIC', payload: optimisticTicket })

    try {
      const updatedTicket = await updateTicket(ticket.id, token, {
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status,
      })
      dispatch({ type: 'STATUS_UPDATE_SUCCESS', payload: updatedTicket })
    } catch (error) {
      dispatch({
        type: 'STATUS_UPDATE_ROLLBACK',
        payload: { ticket: backup, message: error.message },
      })
    }
  }, [])

  const value = useMemo(
    () => ({ state, dispatch, loadTickets, updateTicketStatus }),
    [state, loadTickets, updateTicketStatus],
  )

  return <TicketDataContext.Provider value={value}>{children}</TicketDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTicketData() {
  const context = useContext(TicketDataContext)
  if (!context) throw new Error('useTicketData must be used inside TicketDataProvider')
  return context
}
