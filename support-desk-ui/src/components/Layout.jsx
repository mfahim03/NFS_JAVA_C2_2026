import AppHeader from './AppHeader'

function Layout({ children }) {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
    </div>
  )
}

export default Layout
