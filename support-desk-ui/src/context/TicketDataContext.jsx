import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import { getPagedTickets } from '../services/api'

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
}

function ticketDataReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: '' }
    case 'LOAD_SUCCESS': {
      const { content = [], number = 0, size = state.size, totalPages = 0, totalElements = 0 } = action.payload
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
      }
    }
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
    default:
      return state
  }
}

export function TicketDataProvider({ children }) {
  const [state, dispatch] = useReducer(ticketDataReducer, initialState)

  const loadTickets = useCallback(async (token, pageInfo) => {
    dispatch({ type: 'LOAD_START' })
    try {
      const result = await getPagedTickets(token, pageInfo)
      dispatch({ type: 'LOAD_SUCCESS', payload: result })
    } catch (error) {
      dispatch({ type: 'LOAD_ERROR', payload: error.message })
    }
  }, [])

  const value = useMemo(() => ({ state, dispatch, loadTickets }), [state, loadTickets])

  return <TicketDataContext.Provider value={value}>{children}</TicketDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTicketData() {
  const context = useContext(TicketDataContext)
  if (!context) throw new Error('useTicketData must be used inside TicketDataProvider')
  return context
}
