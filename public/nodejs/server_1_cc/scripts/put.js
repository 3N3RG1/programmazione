import axios from 'axios' // posso utilizzare anche la fetch, axos mi semplifica un pò la vita e ha determinati vantaggi ma anche svantaggi(controllo)

async function call() {
    const res = await axios.put('http://localhost:3000/case-cinematografiche/8', {
        fondazione: 2000
    })
    console.log(res.status)
}
call()

// let cane = { nome: 'Sally', cognome: 'Qualcosa' }
// console.log({ ...cane, ...{ nome: 'Commisario Rex' } })

// per eseguirlo: node scripts/post.js