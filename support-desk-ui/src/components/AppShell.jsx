import { NavLink, Outlet } from 'react-router'
import AppHeader from './AppHeader'

function AppShell() {
  return (
    <div className="app-shell">
      <AppHeader />
      <nav className="app-navigation" aria-label="Main navigation">
        <NavLink to="/app/dashboard">Dashboard</NavLink>
        <NavLink to="/app/tickets">Tickets</NavLink>
        <NavLink to="/app/reports">Reports</NavLink>
      </nav>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell
