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