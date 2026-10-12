import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'
import { seedBooks, seedUsers } from './data/seedData'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Transactions from './pages/Transactions'
import Users from './pages/Users'
import './App.css'

function App() {
  // all the data lives here and is saved to localStorage
  const [books, setBooks] = useLocalStorage("libraryBooks", seedBooks)
  const [users, setUsers] = useLocalStorage("libraryUsers", seedUsers)
  const [transactions, setTransactions] = useLocalStorage("libraryTransactions", [])
  const [currentUser, setCurrentUser] = useLocalStorage("libraryCurrentUser", null)

  // if no one logged in, show only the login page
  if (currentUser === null) {
    return <Login users={users} onLogin={setCurrentUser} />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout puts the sidebar around every page */}
        <Route element={<Layout currentUser={currentUser} onLogout={() => setCurrentUser(null)} />}>
          <Route
            path="/"
            element={<Dashboard books={books} users={users} transactions={transactions} currentUser={currentUser} />}
          />
          <Route
            path="/books"
            element={<Books books={books} setBooks={setBooks} />}
          />
          <Route
            path="/transactions"
            element={
              <Transactions
                books={books}
                setBooks={setBooks}
                users={users}
                transactions={transactions}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/users"
            element={
              <Users
                users={users}
                setUsers={setUsers}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App