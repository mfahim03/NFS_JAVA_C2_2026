import { NavLink, Outlet, useNavigate } from 'react-router'
import AppHeader from './AppHeader'
import { useAuth } from '../context/AuthContext'

function AppShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <AppHeader />
      <div className="navigation-row">
        <nav className="app-navigation" aria-label="Main navigation">
          <NavLink to="/app/dashboard">Dashboard</NavLink>
          <NavLink to="/app/tickets">Tickets</NavLink>
          <NavLink to="/app/reports">Reports</NavLink>
        </nav>
        <div className="account-actions">
          <span>{user?.name}</span>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell
