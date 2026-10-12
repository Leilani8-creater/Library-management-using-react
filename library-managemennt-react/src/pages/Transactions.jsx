import { useState } from "react"


function Transactions({books, setBooks}){
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [quantity, setQuantity] = useState("")
    const [type, setType] = useState("add")
    const [log,setLog] = useState([])

    function handleConfirm(){
        if (books.length === 0){
            alert("Add a book before recording a transaction.")
            return
        }
        const changeQty = Number(quantity)
        if (!Number.isInteger(changeQty) || changeQty <= 0){
            alert("Quantity must be a whole number greater than 0.")
            return
        }

        const selectedBookIndex = Number(selectedIndex)
        const selectedBook = books[selectedBookIndex]
        const currentQty = Number(selectedBook.quantity)
        if (type === "deduct" && changeQty > currentQty){
            alert("Cannot deduct more than the available stock.")
            return
        }

        const updateBooks = books.map((book, index) => {
            if (index === selectedBookIndex){
                const newQty = type === "add" ? currentQty + changeQty : currentQty - changeQty
                return {...book, quantity: newQty}

            }
            return book
        })

        setBooks(updateBooks)

        const newLogEntry = {
            bookTitle: selectedBook.title,
            type: type,
            quantity: changeQty

        }
        setLog([...log, newLogEntry])
        setQuantity("")

    }
    return(
        <div>
            <h1>
                Transactions
            </h1>
            <select value={selectedIndex} onChange={(e) => setSelectedIndex(e.target.value)}>
                {books.length === 0 && <option value={0}>No books available</option>}
                {books.map((book, index) => (
                    <option key={index} value={index}>{book.title}</option>
                ))}
            </select>
            <input type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />

            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value ="add">Add Stock</option>
                <option value= "deduct">Deduct Stock</option>
            </select>

            <button onClick={handleConfirm} >Confirm</button>
            <h2>Transaction History</h2>
            <ul>
                {log.map((entry, index) => (
                    <li key={index}> {entry.type} {entry.quantity} of "{entry.bookTitle}"</li>

                ))}
            </ul>

        </div>
    )
}

export default Transactions