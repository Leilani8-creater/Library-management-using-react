function BookForm({ newBook , onChange, onAdd}) {
    return(
        <div>
        <input name="title" value={newBook.title} onChange={onChange} placeholder="Title" />
        <input name= "author" value= {newBook.author} onChange={onChange} placeholder = "Author"></input>
        <input name= "genre" value= {newBook.genre} onChange= {onChange} placeholder = "Genre"></input>
        <input name= "isbn" value= {newBook.isbn} onChange= {onChange} placeholder = "ISBN"></input>
        <input name="quantity" type="number" min="0" step="1" value={newBook.quantity} onChange={onChange} placeholder="Quantity" />
        <button onClick = {onAdd}>Add Book</button>
        </div>
    )
}

export default BookForm;