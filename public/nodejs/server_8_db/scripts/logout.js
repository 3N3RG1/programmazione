import axios from 'axios'

async function logout() {
    const res = await axios.delete('http://localhost:3000/users/session')
    console.log(res.status, res.data)
}
logout()