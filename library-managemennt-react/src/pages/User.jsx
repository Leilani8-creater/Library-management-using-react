import { useState } from 'react'

// an empty form
const emptyUser = { name: "", membershipId: "", role: "member" }

function Users({ users, setUsers, currentUser, setCurrentUser }) {
  const [formData, setFormData] = useState(emptyUser)
  const [editingId, setEditingId] = useState(null) // null means we are adding a new user

  // only librarians can add, update or delete users
  const isAdmin = currentUser.role === "librarian"

  // runs when the user types in the form
  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // clear the form and go back to add mode
  function resetForm() {
    setFormData(emptyUser)
    setEditingId(null)
  }

  // runs when the form is submitted (add or update)
  function handleSubmit(e) {
    e.preventDefault() // stop the page from reloading

    // validation
    if (formData.name.trim() === "") {
      alert("Name is required.")
      return
    }
    if (formData.membershipId.trim() === "") {
      alert("Membership ID is required.")
      return
    }

    // membership id must be unique (ignore the user we are editing)
    const duplicate = users.find(
      (user) =>
        user.membershipId.toLowerCase() === formData.membershipId.trim().toLowerCase() &&
        user.id !== editingId
    )
    if (duplicate) {
      alert("This membership ID is already used.")
      return
    }

    // stop a librarian from removing their own librarian role
    if (editingId === currentUser.id && formData.role !== "librarian") {
      alert("You cannot change your own role.")
      return
    }

    // clean version of the form data
    const cleanUser = {
      name: formData.name.trim(),
      membershipId: formData.membershipId.trim(),
      role: formData.role
    }

    if (editingId === null) {
      // add: give the new user their own id
      setUsers([...users, { ...cleanUser, id: Date.now() }])
    } else {
      // update: change only the user we are editing
      setUsers(users.map((user) => (user.id === editingId ? { ...user, ...cleanUser } : user)))

      // if we edited the logged in user, refresh their details too
      if (editingId === currentUser.id) {
        setCurrentUser({ ...currentUser, ...cleanUser })
      }
    }

    resetForm()
  }

  // fill the form with the user we want to update
  function startEdit(user) {
    setFormData({ name: user.name, membershipId: user.membershipId, role: user.role })
    setEditingId(user.id)
    window.scrollTo({ top: 0, behavior: "smooth" }) // go up to the form
  }

  // remove a user after asking
  function deleteUser(user) {
    // you cannot delete yourself
    if (user.id === currentUser.id) {
      alert("You cannot delete the account you are logged in with.")
      return
    }

    if (window.confirm("Delete " + user.name + "?")) {
      setUsers(users.filter((item) => item.id !== user.id))
      if (editingId === user.id) {
        resetForm() // we were editing this user
      }
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Users</h1>
        <p className="muted">Manage library members</p>
      </div>

      {/* form only for librarians */}
      {isAdmin ? (
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2>{editingId === null ? "Add New User" : "Update User"}</h2>

          <div className="form-grid">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
            <input name="membershipId" value={formData.membershipId} onChange={handleChange} placeholder="Membership ID" />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="member">Member</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit">{editingId === null ? "Add User" : "Save Changes"}</button>
            {editingId !== null && (
              <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      ) : (
        <p className="card form-card muted">Only librarians can add, update or delete users.</p>
      )}

      {/* users table */}
      <div className="card">
        <h2>All Users</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Membership ID</th>
                <th>Role</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.membershipId}</td>
                  <td>
                    <span className={user.role === "librarian" ? "pill purple" : "pill blue"}>
                      {user.role}
                    </span>
                  </td>
                  {isAdmin && (
                    <td>
                      <div className="card-actions">
                        <button className="btn-small" onClick={() => startEdit(user)}>Update</button>
                        <button className="btn-small btn-danger" onClick={() => deleteUser(user)}>Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users