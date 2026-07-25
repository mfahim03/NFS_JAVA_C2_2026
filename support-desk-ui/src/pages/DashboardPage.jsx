import { Link } from 'react-router'

function DashboardPage() {
  return (
    <main className="route-page">
      <section className="route-card">
        <p className="eyebrow">Support Desk</p>
        <h1>Dashboard</h1>
        <p>Welcome to the support desk dashboard.</p>
        <Link className="route-link" to="/app/tickets">
          View tickets
        </Link>
      </section>
    </main>
  )
}

export default DashboardPage
