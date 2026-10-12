import { useState } from 'react'
import BookCard from '../components/BookCard'
import BookForm from '../components/BookForm'

// an empty form
const emptyBook = { title: "", author: "", genre: "", isbn: "", quantity: "" }

function Books({ books, setBooks }) {
  const [formData, setFormData] = useState(emptyBook)
  const [editingId, setEditingId] = useState(null) // null means we are adding a new book
  const [search, setSearch] = useState("")
  const [genreFilter, setGenreFilter] = useState("All")

  // runs when the user types in the form
  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // clear the form and go back to add mode
  function resetForm() {
    setFormData(emptyBook)
    setEditingId(null)
  }

  // runs when the form is submitted (add or update)
  function handleSubmit(e) {
    e.preventDefault() // stop the page from reloading

    // validation
    if (formData.title.trim() === "") {
      alert("Title is required.")
      return
    }
    if (formData.author.trim() === "") {
      alert("Author is required.")
      return
    }
    if (formData.genre.trim() === "") {
      alert("Genre is required.")
      return
    }
    if (formData.isbn.trim() === "") {
      alert("ISBN is required.")
      return
    }
    if (formData.quantity === "") {
      alert("Quantity is required.")
      return
    }
    if (Number(formData.quantity) < 0) {
      alert("Quantity cannot be negative.")
      return
    }
    if (!Number.isInteger(Number(formData.quantity))) {
      alert("Quantity must be a whole number.")
      return
    }

    // no two books can share an ISBN (ignore the book we are editing)
    const duplicate = books.find(
      (book) => book.isbn === formData.isbn.trim() && book.id !== editingId
    )
    if (duplicate) {
      alert("A book with this ISBN already exists.")
      return
    }

    // clean version of the form data
    const cleanBook = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      isbn: formData.isbn.trim(),
      quantity: Number(formData.quantity)
    }

    if (editingId === null) {
      // add: give the new book its own id
      setBooks([...books, { ...cleanBook, id: Date.now() }])
    } else {
      // update: change only the book we are editing
      setBooks(books.map((book) => (book.id === editingId ? { ...book, ...cleanBook } : book)))
    }

    resetForm()
  }

  // fill the form with the book we want to update
  function startEdit(book) {
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      quantity: book.quantity
    })
    setEditingId(book.id)
    window.scrollTo({ top: 0, behavior: "smooth" }) // go up to the form
  }

  // remove a book after asking
  function deleteBook(id) {
    if (window.confirm("Delete this book?")) {
      setBooks(books.filter((book) => book.id !== id))
      if (editingId === id) {
        resetForm() // we were editing this book
      }
    }
  }

  // list of genres for the dropdown (Set removes duplicates)
  const genres = ["All", ...new Set(books.map((book) => book.genre))]

  // books that match the search box and the genre dropdown
  const visibleBooks = books.filter((book) => {
    const text = (book.title + " " + book.author + " " + book.isbn).toLowerCase()
    const matchesSearch = text.includes(search.toLowerCase())
    const matchesGenre = genreFilter === "All" ? true : book.genre === genreFilter
    return matchesSearch && matchesGenre
  })

  return (
    <div>
      <div className="page-header">
        <h1>Books</h1>
        <p className="muted">Browse and manage library books</p>
      </div>

      <BookForm
        formData={formData}
        editing={editingId !== null}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {/* search and filter */}
      <div className="toolbar">
        <input
          className="search"
          placeholder="Search by title, author or ISBN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* book cards */}
      {visibleBooks.length === 0 ? (
        <p className="empty">No books found.</p>
      ) : (
        <div className="book-grid">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} onEdit={startEdit} onDelete={deleteBook} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Books