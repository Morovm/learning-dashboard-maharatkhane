
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  username: string
  fullName: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  register: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Pre-allowed users
const preAllowedUsers: User[] = [
  { username: 'Mahdi Morovati', password: '1', fullName: 'Mahdi Morovati', email: '' },
  { username: 'Parsa Esmaili', password: '1', fullName: 'Parsa Esmaili', email: '' },
  { username: 'Amirhossein salek', password: '1', fullName: 'Amirhossein salek', email: '' },
  { username: 'Erfan Mohammadian', password: '1', fullName: 'Erfan Mohammadian', email: '' }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }

    // Initialize users in localStorage if not exists
    const existingUsers = localStorage.getItem('users')
    if (!existingUsers) {
      localStorage.setItem('users', JSON.stringify(preAllowedUsers))
    } else {
      // Merge pre-allowed users with existing ones
      const users = JSON.parse(existingUsers)
      const mergedUsers = [...preAllowedUsers]
      
      users.forEach((user: User) => {
        if (!preAllowedUsers.find(u => u.username === user.username)) {
          mergedUsers.push(user)
        }
      })
      
      localStorage.setItem('users', JSON.stringify(mergedUsers))
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find((u: User) => u.username === username && u.password === password)
    
    if (foundUser) {
      setUser(foundUser)
      setIsAuthenticated(true)
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const register = (userData: User) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))
    
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
