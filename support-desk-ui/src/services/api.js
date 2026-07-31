export async function fetchApiInfo() {
  const response = await fetch('/api/v1/info')

  if (!response.ok) {
    throw new Error('Failed to load API info')
  }

  return response.json()
}

export async function loginRequest(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    let message = 'Login failed. Check your email and password.'

    try {
      const error = await response.json()
      message = error.message || message
    } catch {
      // Keep the user-friendly fallback when the backend has no JSON error body.
    }

    throw new Error(message)
  }

  return response.json()
}

async function ticketRequest(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!response.ok) {
    let message = 'Could not save the ticket.'

    try {
      const error = await response.json()
      message = error.message || message
    } catch {
      // Use the fallback when the backend does not return JSON.
    }

    throw new Error(message)
  }

  return response.json()
}

export function getTicket(id, token) {
  return ticketRequest(`/api/v1/tickets/${id}`, token)
}

export function getTickets(token) {
  return ticketRequest('/api/v1/tickets', token)
}

export function createTicket(token, payload) {
  return ticketRequest('/api/v1/tickets', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateTicket(id, token, payload) {
  return ticketRequest(`/api/v1/tickets/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
