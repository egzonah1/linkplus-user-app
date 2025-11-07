import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function UserDetails({ users }) {
  const { id } = useParams()
  const user = users.find(u => String(u.id) === String(id))

  if (!user) {
    return (
      <div>
        <p>User not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    )
  }

  const { address = {}, phone, website } = user

  return (
    <div className="details">
      <h2>{user.name}</h2>

      <div style={{display:'flex', gap:18, alignItems:'center', marginTop:8, flexWrap:'wrap'}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div style={{
            width:72, height:72, borderRadius:12,
            background:'linear-gradient(135deg,#d9c5b0,#ac967e)',
            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:22
          }}>
            {user.name ? user.name.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase() : 'U'}
          </div>

          <div>
            <div style={{fontSize:14, color:'#5a4b3f'}}><strong>Phone:</strong> {phone || '—'}</div>
            <div style={{fontSize:14, color:'#5a4b3f'}}><strong>Website:</strong> {website || '—'}</div>
          </div>
        </div>
      </div>

      <div style={{marginTop:16}}>
        <h3 style={{marginTop:0}}>Address</h3>
        {address.street ? (
          <p style={{margin:0}}>{address.street}, {address.suite || ''} {address.city} {address.zipcode}</p>
        ) : <p style={{margin:0, color:'var(--muted)'}}>No address provided</p>}
      </div>

      <div style={{marginTop:18}}>
        <Link to="/" style={{textDecoration:'none'}}><button className="btn ghost">← Back to users</button></Link>
      </div>
    </div>
  )
}
