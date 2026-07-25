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
