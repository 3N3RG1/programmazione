import axios from 'axios'

async function call(process) {
    let res = await axios.post('http://localhost:3000/todos', {
        title: 'Buy the milk'
    })
    console.log(res.status, res.data, process.argv[2], process.argv[3], process.argv[4])
}
call(process)