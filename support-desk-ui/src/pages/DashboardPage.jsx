import { Link } from 'react-router'

function DashboardPage() {
  return (
    <section className="page-card">
      <p className="eyebrow">Overview</p>
      <h2>Dashboard</h2>
      <p>Welcome to the support desk dashboard.</p>
      <Link className="route-link" to="/app/tickets">
        View tickets
      </Link>
    </section>
  )
}

export default DashboardPage
