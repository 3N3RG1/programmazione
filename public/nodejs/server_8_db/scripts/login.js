import axios from 'axios'

async function login() {
    const res = await axios.post('http://localhost:3000/users/session', {
        username: 'energy',
        password: '331'
    })
    console.log(res.status, res.data)
    console.log(res.headers['set-cookie'][0].split(';')[0])
}
// login()

async function signup() {
    const res = await axios.post('http://localhost:3000/users/signup', {
        username: 'energy',
        password: '331'
    })
    console.log(res.status, res.data)
}
signup()