import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../context/AuthContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function renderProtectedRoute() {
  return render(
    <MemoryRouter initialEntries={['/app/tickets']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route
            path="/app/tickets"
            element={
              <ProtectedRoute>
                <h1>Protected Tickets</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('redirects a user without a token to the login page', () => {
    renderProtectedRoute()

    expect(screen.getByRole('heading', { name: 'Login Page' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Protected Tickets' })).not.toBeInTheDocument()
  })

  it('shows the protected ticket page when authentication is stored', () => {
    localStorage.setItem(
      'supportDeskAuth',
      JSON.stringify({ token: 'test-jwt', user: { name: 'Test User' } }),
    )

    renderProtectedRoute()

    expect(screen.getByRole('heading', { name: 'Protected Tickets' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Login Page' })).not.toBeInTheDocument()
  })
})
