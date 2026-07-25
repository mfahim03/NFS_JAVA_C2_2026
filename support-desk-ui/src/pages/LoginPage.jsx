import { Link } from 'react-router'

function LoginPage() {
  return (
    <main className="route-page">
      <section className="route-card">
        <p className="eyebrow">Support Desk</p>
        <h1>Login</h1>
        <p>Sign in to access the support desk workspace.</p>
        <Link className="route-link" to="/app/dashboard">
          Continue to dashboard
        </Link>
      </section>
    </main>
  )
}

export default LoginPage
