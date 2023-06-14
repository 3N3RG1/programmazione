import axios from 'axios'

// posso usare i codici ASCII
// const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let tesoro = false
async function treasure(key = 'a0b1c2d3e4f5') {
    /*
    let letter = 0, number = 0, count = 0
    const map = new Map()
    let treasure = ''
    while (true) {
        let key = ''
        for(let i = 0; i < 6; i++) {
            key += arr[letter]+number
            letter++
            number++
            if(letter == 26) letter = 0
            if(number == 10) number = 0
        }
        await wait()
        const res = await axios.get('https://6ae9-2-44-90-143.ngrok-free.app/keys/'+key)
        if(map.has(key)) {
            return console.log(count + ' - ' + treasure + ': ' + map.get(treasure))
        } else {
            count++
            map.set(key, count)
            console.log(count + ': ' + key)
            if(res.data.treasure) treasure = key
        }
    }
    */
    // --------------------------- //
    // RECURSIVA
    const res = await axios.get('https://27f6-2-44-90-143.ngrok-free.app/keys/'+key)
    if(res.data.treasure) {
        console.table(res.data)
        tesoro = true
        return
    }
    else if(res.data.children.length > 0) {
        for(let i = 0; i < res.data.children.length; i++) {
            await treasure(res.data.children[i].key)
            if(tesoro) return
        }
    }
}
treasure()

// async function wait() {
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve()
//         }, 200)
//     })
// }