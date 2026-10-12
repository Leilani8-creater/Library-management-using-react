import { useState } from 'react'
import StatCard from '../components/StatCard'
import StatusPill from '../components/StatusPill'

function Dashboard({ books, users, transactions, currentUser }) {
  // greeting depends on the time of day
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  })

  // numbers for the boxes
  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0) // adds up all quantities
  const lowStock = books.filter((book) => book.quantity < 2).length

  // newest transaction is first in the list, so take the first 5
  const recent = transactions.slice(0, 5)

  return (
    <div>
      <div className="page-header">
        <h1>{greeting}, {currentUser.name}</h1>
        <p className="muted">Here is what is happening at your library today.</p>
      </div>

      {/* the four boxes */}
      <div className="stat-grid">
        <StatCard  label="Total Titles" value={books.length} color="blue" />
        <StatCard label="Total Copies" value={totalCopies} color="green" />
        <StatCard  label="Low Stock" value={lowStock} color="orange" />
        <StatCard  label="Members" value={users.length} color="purple" />
      </div>

      <div className="dash-grid">
        {/* availability table */}
        <div className="card">
          <h2>Book Availability</h2>
          <div className="table-wrap scroll">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Copies</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  // low stock rows get a highlight colour
                  <tr key={book.id} className={book.quantity < 2 ? "low-row" : ""}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.quantity}</td>
                    <td><StatusPill quantity={book.quantity} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* recent transactions */}
        <div className="card">
          <h2>Recent Transactions</h2>

          {recent.length === 0 ? (
            <p className="muted">No transactions yet.</p>
          ) : (
            <ul className="activity">
              {recent.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.bookTitle}</strong>
                    <small>{item.date}</small>
                  </div>
                  <span className={item.type === "add" ? "pill green" : "pill blue"}>
                    {item.type === "add" ? "+" : "-"}{item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard