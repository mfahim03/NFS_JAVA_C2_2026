import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'

// Prevent logged-out users from viewing ticket pages.
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
