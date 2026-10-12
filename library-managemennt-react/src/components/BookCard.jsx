import StatusPill from './StatusPill'

// colours for the book covers
const covers = [
  "linear-gradient(135deg, #3b82f6, #1e3a8a)",
  "linear-gradient(135deg, #8b5cf6, #4c1d95)",
  "linear-gradient(135deg, #10b981, #065f46)",
  "linear-gradient(135deg, #f59e0b, #92400e)",
  "linear-gradient(135deg, #ec4899, #831843)"
]

function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="book-card">
      {/* cover colour depends on the book id */}
      <div className="book-cover" style={{ background: covers[book.id % covers.length] }}>
        <span></span>
        <small>{book.genre}</small>
      </div>

      <h3>{book.title}</h3>
      <p className="muted">{book.author}</p>
      <p className="isbn">ISBN: {book.isbn}</p>

      <div className="book-meta">
        <span>Copies: <strong>{book.quantity}</strong></span>
        <StatusPill quantity={book.quantity} />
      </div>

      <div className="card-actions">
        <button className="btn-small" onClick={() => onEdit(book)}>Update</button>
        <button className="btn-small btn-danger" onClick={() => onDelete(book.id)}>Delete</button>
      </div>
    </div>
  )
}

export default BookCard