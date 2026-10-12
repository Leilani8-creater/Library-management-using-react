import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Transactions from './pages/Transactions'
import User from './pages/User'
import './App.css'

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
  }, [books])

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>{" "}
        <Link to="/books">Books</Link>{" "}
        <Link to="/transactions">Transactions</Link>{" "}
        <Link to="/user">User</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard books={books} />} />
        <Route path="/books" element={<Books books={books} setBooks={setBooks} />} />
        <Route path="/transactions" element={<Transactions books={books} setBooks={setBooks} />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App