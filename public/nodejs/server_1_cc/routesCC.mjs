import caseCinematografiche from "./database/case_cinematografiche.json" assert { type: 'json' }
import film from './database/film.json' assert { type: 'json' }

// devo fornire al server l'informazione dell'id piu' grande esistente all'interno di case-cinematografiche.json perche' abbiamo bisogno di tenerne traccia per via delle POST
// non lo faccio cosi perche' e' "debole" come implementazione e potrebbe succedere che non c'e' un legame diretto tra posizione dell'i-esimo elemento e suo id
// const id = caseCinematografiche[caseCinematografiche.length - 1].id
let NEXT_ID = caseCinematografiche.reduce((bigger, c) => c.id > bigger ? c.id : bigger, -1)

export const server = (req, res) => {
    res.send('server_1_cc')
}

export const ccGet = (req, res) => {
    res.send(caseCinematografiche)
}

export const ccRicercaTermineGet = (req, res) => {
    const caseFiltrate = []
    for (let i = 0; i < caseCinematografiche.length; i++)
        if (caseCinematografiche[i].nome.includes(req.params.termine))
            caseFiltrate.push(caseCinematografiche[i])
    res.send(caseFiltrate)
}

export const ccIdGet = (req, res) => {
    for (let i = 0; i < caseCinematografiche.length; i++) {
        if (caseCinematografiche[i].id == req.params.id) {
            return res.send(caseCinematografiche[i]);
        }
    }
    res.status(404).end()
}

export const ccIdDelete = (req, res) => {
    for (let i = 0; i < caseCinematografiche.length; i++) {
        if (caseCinematografiche[i].id == req.params.id) {
            caseCinematografiche.splice(i, 1)
            for(let j = 0; j < film.length; j++) { // non funziona
                if(film[j].casaProduzione == req.params.id)
                    film.splice(j, 1)
            }
            return res.status(200).end()
        }
    }
    res.status(404).end()
}

export const ccIdPut = (req, res) => { // update
    for (let i = 0; i < caseCinematografiche.length; i++) {
        if (caseCinematografiche[i].id == req.params.id) {
            caseCinematografiche[i] = { ...caseCinematografiche[i], ...req.body }
            return res.status(200).end()
        }
    }
    res.status(404).end()
}

export const ccPost = (req, res) => { // create
    caseCinematografiche.push({ ...req.body, id: ++NEXT_ID })
    res.status(200).end()
}