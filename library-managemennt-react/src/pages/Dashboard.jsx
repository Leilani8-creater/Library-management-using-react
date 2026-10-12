function Dashboard({ books }){
    return (
        <div>
            <h1>Dashboard</h1>
            <table border ="1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Quantity</th>
        
                    </tr>
                </thead>
                <tbody>
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan="4">No books have been added yet.</td>
                        </tr>
                    ) : books.map((book,index) => (
                        <tr key={index} style={{backgroundColor: Number(book.quantity) < 2 ? "salmon" : "white" }}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Dashboard