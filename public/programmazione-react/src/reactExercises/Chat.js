import { useState } from 'react';
import './chat.css'

export default function Chat() {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [array, setArray] = useState([])
  return (
    <div className="page">
      <div className="chat">
        {array.map((u, i) => {
          if(i-1 >= 0 && u.username === array[i-1].username)
            return <div key={i} className="message">{u.message}</div>
          return (
            <div key={i}>
              <div className="username">{u.username}</div>
              <div className="message">{u.message}</div>
            </div>
          )
        })}
      </div>
      <div className="action"> {/* come mai al cambiamento di username e message l'array.map non viene eseguito */}
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="message"/>
        <button
          onClick={() => {
            if(!message || (!username && !array.length)) return
            let un = username
            if(!un) un = array[array.length-1].username
            // if(!username) setUsername(array[array.length-1].username) NON FUNZIONA
            let obj = {'username': un, 'message': message}
            let arr = [...array]
            arr.push(obj)
            setArray(arr)
            setUsername('')
            setMessage('')
          }}>Invio</button>
      </div>
    </div>
  )
}