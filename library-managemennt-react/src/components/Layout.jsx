import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

// sidebar on the left, the current page on the right
function Layout({ currentUser, onLogout }) {
  return (
    <div className="app-shell">
      <Sidebar currentUser={currentUser} onLogout={onLogout} />
      <main className="content">
        {/* the page for the current url shows up here */}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout