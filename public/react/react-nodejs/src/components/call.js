import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Call() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function call() {
            let res = await fetch('https://localhost:8000', {
                method: "GET"
            })
            let json = await res.json()
            setUsers(json)
        }
        call()
    }, [])

    return (
        <div style={{display: "flex", flexDirection: "column", gap: 30}}>
            {users.map((user, i) => {
                <div style={{display: "flex", gap: 10}} key={i}>
                    <div>{user.name}</div>
                    <div>{user.surname}</div>
                    <div>{user.secret}</div>
                </div>
            })}
        </div>
    )
}