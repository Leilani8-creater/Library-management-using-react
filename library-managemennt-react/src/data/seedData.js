// starting books (all IT related, you can change these)
export const seedBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", genre: "Programming", isbn: "9780132350884", quantity: 5 },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", genre: "Programming", isbn: "9780135957059", quantity: 3 },
  { id: 3, title: "Introduction to Algorithms", author: "Thomas H. Cormen", genre: "Algorithms", isbn: "9780262046305", quantity: 2 },
  { id: 4, title: "Design Patterns", author: "Erich Gamma", genre: "Software Design", isbn: "9780201633610", quantity: 1 },
  { id: 5, title: "Computer Networking: A Top-Down Approach", author: "James Kurose", genre: "Networking", isbn: "9780136681557", quantity: 4 },
  { id: 6, title: "Operating System Concepts", author: "Abraham Silberschatz", genre: "Operating Systems", isbn: "9781119800361", quantity: 3 },
  { id: 7, title: "Database System Concepts", author: "Abraham Silberschatz", genre: "Databases", isbn: "9780078022159", quantity: 1 },
  { id: 8, title: "Eloquent JavaScript", author: "Marijn Haverbeke", genre: "Web Development", isbn: "9781593279509", quantity: 6 },
  { id: 9, title: "Learning React", author: "Alex Banks & Eve Porcello", genre: "Web Development", isbn: "9781492051725", quantity: 4 },
  { id: 10, title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell", genre: "Algorithms", isbn: "9780984782857", quantity: 0 },
  { id: 11, title: "Hacking: The Art of Exploitation", author: "Jon Erickson", genre: "Cybersecurity", isbn: "9781593271442", quantity: 2 }
]

// starting user so you can log in the first time
export const seedUsers = [
  { id: 1, name: "Admin", membershipId: "ADMIN01", role: "librarian" }
]