import React, { useState } from 'react'
import './joinpage.scss'
export const JoinPage = ({ onJoin }) => {
    const [username, setusername] = useState('')
    const onInputChange = (e) => {
        setusername(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (username) {
            localStorage.setItem('username', username)
            onJoin(1)
        }
    }
    return (
        <div className="log-form">
            <h2>Join As Agent</h2>
            <form onSubmit={onSubmit}>
                <input value={username} onChange={onInputChange} type="text" title="username" placeholder="username" />
                <button type="submit" class="btn">Join</button>
            </form>
        </div>
    )
}
