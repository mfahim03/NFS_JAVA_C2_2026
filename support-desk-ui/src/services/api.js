import { apiRequest } from './httpClient'

export function fetchApiInfo() {
  return apiRequest('/api/v1/info')
}

export function loginRequest(email, password) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

function ticketRequest(path, token, options) {
  return apiRequest(path, { token, ...options })
}

export function getTicket(id, token) {
  return ticketRequest(`/api/v1/tickets/${id}`, token)
}

export function getTickets(token) {
  return ticketRequest('/api/v1/tickets', token)
}

export function getPagedTickets(token, pageInfo) {
  const query = new URLSearchParams({
    page: String(pageInfo.page),
    size: String(pageInfo.size),
    sortBy: pageInfo.sortBy,
    direction: pageInfo.direction,
  })

  return ticketRequest(`/api/v1/tickets/paged?${query}`, token)
}

export function createTicket(token, payload) {
  return ticketRequest('/api/v1/tickets', token, {
    method: 'POST',
    body: payload,
  })
}

export function updateTicket(id, token, payload) {
  return ticketRequest(`/api/v1/tickets/${id}`, token, {
    method: 'PUT',
    body: payload,
  })
}
