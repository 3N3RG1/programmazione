import axios from 'axios'

async function call() {
    const res = await axios.post('http://localhost:3000/case-cinematografiche', {
        name: "Universal Pictures",
        fondazione: 1990,
        stato: "Stati Uniti"
    })
    console.log(res.status)
}
call()

// per eseguirlo: node scripts/post.js

async function call() {
    const res = await fetch('http://localhost:3000/case-cinematografiche', {
        method: 'POST',
        body: JSON.stringify({
            name: "Universal Pictures",
            fondazione: 1990,
            stato: "Stati Uniti"
        })
    })
    return await res.json()
}
call()