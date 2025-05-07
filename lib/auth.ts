// This file simulates a database connection
// In a real application, you would connect to a database

interface User {
  id: string
  username: string
  password: string
}

// In a real application, this would be stored in a database
// For this example, we're using a simple array to simulate a database
const users: User[] = [
  {
    id: "1",
    username: "LyfUser",
    password: "pass123", // In a real app, this would be hashed
  },
  {
    id: "2",
    username: "admin",
    password: "admin123",
  },
  // Add more users as needed
]

export async function getUserByCredentials(username: string, password: string): Promise<User | null> {
  // In a real application, you would query your database
  // and check the password using a secure hashing algorithm
  const user = users.find((u) => u.username === username && u.password === password)

  return user || null
}

export async function getUserById(id: string): Promise<Omit<User, "password"> | null> {
  const user = users.find((u) => u.id === id)

  if (!user) return null

  // Don't return the password
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}
