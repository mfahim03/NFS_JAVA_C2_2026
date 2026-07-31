import AppHeader from './AppHeader'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main>{children}</main>
    </div>
  )
}

export default Layout
