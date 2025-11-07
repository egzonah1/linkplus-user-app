import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import UserDetails from './pages/UserDetails'
import './index.css'

export default function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        console.error('Failed to fetch users', err)
      }
    }
    fetchUsers()
  }, [])

  const addUserLocal = (newUser) => {
    setUsers(prev => [{ id: `local-${Date.now()}`, ...newUser }, ...prev])
  }

  return (
    <div className="app-container">
      <header>
    
      </header>

      <main>
        <Routes>
          <Route path="/" element={<UsersPage users={users} addUserLocal={addUserLocal} />} />
          <Route path="/user/:id" element={<UserDetails users={users} />} />
        </Routes>
      </main>

      
      <footer style={{height:14}}></footer>
    </div>
  )
}
