import { createContext, useContext, useMemo, useState } from 'react'
import { loginRequest } from '../services/api'

const STORAGE_KEY = 'supportDeskAuth'
const AuthContext = createContext(null)

function readStoredAuth() {
  try {
    const storedAuth = localStorage.getItem(STORAGE_KEY)
    return storedAuth ? JSON.parse(storedAuth) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth)

  async function login(email, password) {
    const response = await loginRequest(email, password)
    const nextAuth = {
      token: response.token,
      user: {
        id: response.userId,
        name: response.name,
        email: response.email,
        role: response.role,
      },
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth))
    setAuth(nextAuth)
    return nextAuth
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setAuth(null)
  }

  const value = useMemo(
    () => ({
      token: auth?.token ?? '',
      user: auth?.user ?? null,
      isAuthenticated: Boolean(auth?.token),
      login,
      logout,
    }),
    [auth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// This hook intentionally lives beside its provider so auth has one public module.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
