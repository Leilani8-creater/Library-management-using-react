import {useEffect, useState} from 'react'


function User(){
    const [user, setUser] = useState(() => {
        const saved=localStorage.getItem("user")
        return saved ? JSON.parse(saved) : []

    })
    useEffect(() => {
        localStorage.setItem("user" , JSON.stringify(user))
    }, [user])
    const [newUser, setNewUser] = useState({name: "", membershipId: "" ,role: "member"})
    const [loginName, setLoginName] = useState("")
    const [loginId, setLoginId] = useState("")
    const [loggedInUser, setLoggedInUser] = useState(null)

    function handleUserChange(e){
        const {name, value} = e.target
        setNewUser({...newUser, [name]: value })
    }

    function addUser(){
        if (newUser.name.trim() === ""){
            alert("Name is required.")
            return
        }
        setUser([...user, newUser])
        setNewUser({name:"", membershipId: "", role: "member"})
    }

    function handleLogin(){
        const found = user.find(
            (user) => user.name === loginName && user.membershipId === loginId
        )
        if (found){
            setLoggedInUser(found)
        }
        else{
            alert("No matching user found.")
        }
    }

    function deleteUser(index){
        setUser(user.filter((_, userIndex) => userIndex !== index))
    }


    return (
        <div>
            <h1>Users</h1>
            <h2>Login</h2>
            <input value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder='Name' />
            <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Membership ID" />
            <button onClick={handleLogin}>Login</button>
            {loggedInUser && <p>Logged in as: {loggedInUser.name} ({loggedInUser.role})</p>}

            <h2>Add New User</h2>
            <input name="name" value={newUser.name} onChange={handleUserChange} placeholder="Full Name" />
            <input name="membershipId" value={newUser.membershipId} onChange={handleUserChange} placeholder="Membership ID" />
            <select name="role" value={newUser.role} onChange={handleUserChange}>
                <option value="member">Member</option>
                <option value= "librarian">Librarian</option>

            </select>
            <button onClick={addUser}>Add User</button>
            <h2>All Users</h2>
            <ul>
                {user.map((user, index) => (
                    <li key ={index}>
                        {user.name} - {user.membershipId} - {user.role}{" "}
                        <button onClick={() => deleteUser(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default User