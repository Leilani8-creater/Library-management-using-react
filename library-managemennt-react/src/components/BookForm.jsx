// form used for adding AND updating a book
function BookForm({ formData, editing, onChange, onSubmit, onCancel }) {
  return (
    <form className="card form-card" onSubmit={onSubmit}>
      <h2>{editing ? "Update Book" : "Add New Book"}</h2>

      <div className="form-grid">
        <input name="title" value={formData.title} onChange={onChange} placeholder="Title" />
        <input name="author" value={formData.author} onChange={onChange} placeholder="Author" />
        <input name="genre" value={formData.genre} onChange={onChange} placeholder="Genre" />
        <input name="isbn" value={formData.isbn} onChange={onChange} placeholder="ISBN" />
        <input name="quantity" type="number" min="0" value={formData.quantity} onChange={onChange} placeholder="Quantity" />
      </div>

      <div className="form-actions">
        <button type="submit">{editing ? "Save Changes" : "Add Book"}</button>

        {/* cancel only shows while updating */}
        {editing && (
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  )
}

export default BookForm