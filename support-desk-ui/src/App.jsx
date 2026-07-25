import { Navigate, Route, Routes } from 'react-router'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import TicketsPage from './pages/TicketsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app/dashboard" element={<DashboardPage />} />
      <Route path="/app/tickets" element={<TicketsPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
