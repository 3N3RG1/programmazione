import axios from 'axios'

async function getUsers() {
    const res = await axios.get('http://localhost:3000/users', {
        headers: {
            Cookie: 'connect.sid=s%3AOPPctPeTMwbQXWc7XY8Lowylw0QGDzEG.LMAGR12Q6gh1bqiGBDfSY8%2FeoqcJuCXGVIARlQ%2BJEVc'
        }
    })
    console.log(res.status, res.data);
}
getUsers()