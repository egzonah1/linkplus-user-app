import React, { useState } from 'react'

export default function AddUserForm({ onAdd }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (e) => {
    return /\S+@\S+\.\S+/.test(e)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email.')
      return
    }
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      company: { name: company.trim() || 'Independent' },
      address: {},
      website: ''
    }
    onAdd(newUser)
    setName('')
    setEmail('')
    setCompany('')
    setError('')
  }

  return (
    <form onSubmit={submit} className="add-user-form" style={{alignItems:'center'}}>
      <input placeholder="Name (required)" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email (required)" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Company (optional)" value={company} onChange={e => setCompany(e.target.value)} />
      <button type="submit" className="btn ghost">Add User</button>
      {error && <div className="form-error">{error}</div>}
    </form>
  )
}
