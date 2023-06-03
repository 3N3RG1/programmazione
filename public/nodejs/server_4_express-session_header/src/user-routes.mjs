import fs from 'node:fs/promises'
import users from '../db/users.json' assert { type: 'json' }
import axios from 'axios'

const DB_PATH = './db/users.json'

let NEXT = Object
    .keys(users)
    .reduce((biggest, id) => biggest > id ? biggest : parseInt(id, 10), 0)

export const getAll = (req, res) => {
    res.send(users)
}

export const search = (req, res) => {
    const query = req.query
    let filtered = Object.values(users)
        .filter(u => u.name === query.name || u.surname === query.surname)
    res.send(filtered)
}

export const get = (req, res) => {
    let user = users[req.params.id]
    if (user) {
        res.send({ data: user })
    } else {
        res
            .status(200)
            .send({
                data: {},
                error: true,
                message: 'user not found'
            })
    }
}

export const update = async (req, res) => {
    let user = users[req.params.id]
    if (user) {
        let newUser = { ...user, ...req.body }
        users[req.params.id] = newUser
        await fs.writeFile(DB_PATH, JSON.stringify(users, null, '  '))
        res.send(newUser)
    } else {
        res
            .status(200)
            .send({
                data: {},
                error: true,
                message: 'user not found'
            })
    }
}

export const remove = async (req, res) => {
    if(req.headers.key !== 'token') { // header -> passiamo un header nella chiamata che contiene {"key": "token"}
        res
            .status(404)
            .send({ message: 'unexpected key' })
    } else {
        if(!users[req.params.id]) {
            res
                .status(404)
                .send({
                    data: {},
                    error: true,
                    message: 'user not found'
                })
        } else {
            delete users[req.params.id]
            await fs.writeFile(DB_PATH, JSON.stringify(users, null, '  '))
            res
                .status(200)
                .send({ message: 'user deleted' })
        }
    }
}

export const create = async (req, res) => {
    const response = await axios.get('https://fakestoreapi.com/users/'+(++NEXT))
    users[NEXT] = response.data ? response.data : req.body
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, '  '))
    res
        .status(201)
        .send({ message: 'user created' })
}