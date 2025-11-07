import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AddUserForm from '../components/AddUserForm'

function initials(name = '') {
  return name.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase()
}

export default function UsersPage({ users, addUserLocal }) {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = users.filter(u => {
      const name = (u.name || '').toLowerCase()
      const email = (u.email || '').toLowerCase()
      return !q || name.includes(q) || email.includes(q)
    })
    if (sortBy === 'name') {
      list = list.slice().sort((a,b) => (a.name || '').localeCompare(b.name || ''))
    } else if (sortBy === 'email') {
      list = list.slice().sort((a,b) => (a.email || '').localeCompare(b.email || ''))
    }
    return list
  }, [users, query, sortBy])

  return (
    <div className="page">
      
      <div className="title-card" role="banner">
        <div className="logo-pill">LP</div>
        <div className="title-block">
          <h1>LinkPlus - User Management</h1>
          <p>Browse users, search, add new users locally, and inspect details.</p>
        </div>
      </div>

     
      <div className="controls-row">
        <div className="search-card" aria-label="search">
          <input
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn ghost"
            onClick={() => setSortBy(sortBy === 'name' ? null : 'name')}
            title="Toggle sort by name"
          >
            Sort name {sortBy === 'name' ? '▲' : ''}
          </button>
          <button
            className="btn ghost"
            onClick={() => setSortBy(sortBy === 'email' ? null : 'email')}
            title="Toggle sort by email"
          >
            Sort email {sortBy === 'email' ? '▲' : ''}
          </button>
        </div>

        <div className="add-panel" aria-label="add user panel">
          <h4>Add new user</h4>
          <AddUserForm onAdd={addUserLocal} />
        </div>
      </div>

 
      <div className="users-grid">
        {filtered.length === 0 && <p>No users found</p>}
        {filtered.map(user => (
          <div key={user.id} className="user-card" role="article">
            <div className="avatar">{initials(user.name || user.email)}</div>

            <div className="user-meta">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>

            
              <p style={{ marginTop: 8 }}><strong>Company:</strong> {user.company?.name || '—'}</p>

              <div style={{marginTop:12, display:'flex', justifyContent:'flex-end'}}>
                <Link to={`/user/${user.id}`} style={{ textDecoration:'none' }}>
                  <button className="btn ghost">View details →</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
