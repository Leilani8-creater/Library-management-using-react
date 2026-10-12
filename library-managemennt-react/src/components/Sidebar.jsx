import { NavLink } from 'react-router-dom'

function Sidebar({ currentUser, onLogout }) {
  return (
    <aside className="sidebar">
      {/* logo */}
      <div className="brand">
        <span className="brand-icon"></span>
        <span>LibraryMS</span>
      </div>

      {/* links - NavLink adds "active" to the page we are on */}
      <nav className="side-nav">
        <NavLink to="/" end> Dashboard</NavLink>
        <NavLink to="/books"> Books</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/users"> Users</NavLink>
      </nav>

      {/* who is logged in + logout button */}
      <div className="user-box">
        <div className="user-row">
          <div className="avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <strong>{currentUser.name}</strong>
            <small>{currentUser.role}</small>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </aside>
  )
}

export default Sidebar