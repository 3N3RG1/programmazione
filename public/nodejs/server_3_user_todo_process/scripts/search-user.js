import axios from 'axios'

async function search(params) {
    // caso limite params lungo 1 -> abbiamo sbagliato, è il caso per tutte le lunghezze dispari
    if (params.length % 2 == 1) {
        return console.log('params should be even')
    }

    let path = 'http://localhost:3000/users/search?'
    let separator = ''
    for (let i = 0; i < params.length; i+=2) {
        path += `${separator}${params[i]}=${params[i+1]}`
        separator = '&'
    }

    let res = await axios.get(path)
    console.log(res.data)
}

let [a, b, ...params] = process.argv // decostructoring?
// let params = process.argv.splice(2)

search(params) // come viene preso in ingresso?