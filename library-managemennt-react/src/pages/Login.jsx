import { useState } from 'react'

function Login({ users, onLogin }) {
  const [name, setName] = useState("")
  const [membershipId, setMembershipId] = useState("")
  const [error, setError] = useState("")

  // runs when the login form is submitted
  function handleSubmit(e) {
    e.preventDefault() // stop the page from reloading

    // look for a user where both name and membership id match
    const found = users.find(
      (user) =>
        user.name.toLowerCase() === name.trim().toLowerCase() &&
        user.membershipId.toLowerCase() === membershipId.trim().toLowerCase()
    )

    if (found) {
      onLogin(found) // saves the user as logged in
    } else {
      setError("Wrong name or membership ID.")
    }
  }

  return (
    <div className="login-page">
      {/* left side - welcome panel */}
      <div className="login-left">
        <div className="login-logo"></div>
        <h1>Library Management System</h1>
        <p>Knowledge is a journey, let us help you find your next chapter.</p>
      </div>

      {/* right side - the form */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p className="muted">Login to your library account</p>

          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Membership ID" value={membershipId} onChange={(e) => setMembershipId(e.target.value)} />

          {/* only show the error when there is one */}
          {error !== "" && <p className="error">{error}</p>}

          <button type="submit">Login</button>

          <p className="hint">First time? Use <strong>Admin</strong> and <strong>ADMIN01</strong></p>
        </form>
      </div>
    </div>
  )
}

export default Login