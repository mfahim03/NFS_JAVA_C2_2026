import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Admin@12345')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const previousLocation = location.state?.from
  const redirectTo = previousLocation
    ? `${previousLocation.pathname}${previousLocation.search}${previousLocation.hash}`
    : '/app/dashboard'

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace /> //Existing user is already logged in, redirect to the previous page or dashboard.
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(email, password)
      navigate(redirectTo, { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="route-page">
      <section className="route-card">
        <p className="eyebrow">Support Desk</p>
        <h1>Login</h1>
        <p>Sign in to access the support desk workspace.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
