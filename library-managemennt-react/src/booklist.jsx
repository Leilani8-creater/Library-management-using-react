function Booklist({ books}){
    return (
        <ul>
            {books.map((book, index) => (
                <li key = {index}>{book.title} by {book.author} - {book.genre} ({book.isbn}) - Qty: {book.quantity}</li>
            ))}
        </ul>
    )
}

export default Booklist