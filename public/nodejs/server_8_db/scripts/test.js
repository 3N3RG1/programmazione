import axios from 'axios'

axios.defaults.validateStatus = status => true

async function login() {
    let res = await axios.post('http://localhost:3000/users/session', {
        username: 'chandraSaur',
        password: 'ciao123'
    })
    const cookie = res.headers['set-cookie'][0].split(';')[0]

    res = await axios.get('http://localhost:3000/users')
    console.log(`Questo deve essere un errore: ${res.status}`)

    res = await axios.get('http://localhost:3000/users', {
        headers: {
            Cookie: cookie
        }
    })
    console.log(`Questo NON deve essere un errore: ${res.status}`)

    res = await axios.delete('http://localhost:3000/users/session')
    console.log(res.status);

}
login()