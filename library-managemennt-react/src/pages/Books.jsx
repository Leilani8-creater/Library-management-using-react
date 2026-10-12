import {useState} from 'react'
import BookForm from '../bookform'
import Booklist from '../booklist'

function Books({books, setBooks}){
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        quantity: "0"
    })

    function handleChange(e) {
        const {name, value} = e.target
        setNewBook({...newBook, [name]: value})
    }

    function addBook(){
        if (newBook.title.trim() === ""){
            alert("Title is required.")
            return
        }
        if (newBook.author.trim() === ""){
            alert("Author is required.")
            return
        }
        const quantity = Number(newBook.quantity)
        if (!Number.isInteger(quantity) || quantity < 0){
            alert("Quantity must be a whole number of 0 or more.")
            return
        }

        setBooks([...books, {...newBook, quantity}])
        setNewBook({title:"",
            author:"",
            genre:"",
            isbn:"",
            quantity: "0"
        })
    }

    return (
        <div>
            <h1>Book Management</h1>
            <BookForm newBook={newBook} onChange={handleChange} onAdd={addBook} />
            <Booklist books={books}/>
        </div>
    )
}

export default Books