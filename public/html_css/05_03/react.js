let ar1 = 1
let ar2 = 2
let ar3 = 3
function a(...b) {
    let stamp = 0
    for(let i = 0; i < b.length; i++) stamp += b[i]
    return stamp
}
console.log(a(ar1, ar2, ar3))

const b1 = true
const b2 = true
const b3 = 'ciao'
const b4 = 0
const b5 = false
const b6 = 'hello'
function and(...arg) {
    return arg.reduce((x, y) => x && y, arg[0])
}
console.log(and(b1,b2,b3,b4,b5,b6))

function and(...bool) {
    for (let i = 0; i < bool.length; i++) {
        if (!bool[i]) {
            return bool[i]
        }
    }
    return true
}

/*
Scrivere una funzione che prende in ingresso un oggetto, si devono stampare solo le seguenti chiavi:
 * "chiave1"
 * "chiave2"
a prescindere da quante ce ne siano nell'oggetto.
Non si possono utilizzare if, non si puo' utilizzare l'operatore punto (.) o le quadre [], cercate di utilizzare lo spread operator
*/

const obj = {
    'key1': 1,
    'key2': 2,
    'key3': 3,
    'key4': 4
}

function key(object) {
    let {key1, key2} = object
    console.log(key1, key2)
}
key(obj)

function key2({key1, key2}) {
    console.log(key1, key2)
}
key2(obj)

function key3({key1, key2}) {
    return {key1, key2}
}
console.log(key3(obj))

// function print({chiave1, chiave2}) {
//     console.log(chiave1, chiave2)
// }

// function print2(obj) {
//     let { chiave1, chiave2 } = obj
//     console.log(chiave1, chiave2)
// }

// let obj = {chiave1: 1, chiave2: 2, chiave3: 3, chiave4: 4}
// print(obj)
// print2(obj)

// import {MyQualcosa} from './qualcosa'

  