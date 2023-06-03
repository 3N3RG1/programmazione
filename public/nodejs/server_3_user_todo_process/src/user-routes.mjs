import fs from 'node:fs/promises'
import users from '../db/users.json' assert { type: 'json' }
import todoUsers from '../db/todos-users.json' assert { type: 'json' }
const DB_PATH = './db/users.json'
const DB_PATH_TODOS_USERS = './db/todos-users.json'

let NEXT = Object
    .keys(users)
    .reduce((biggest, id) => biggest > id ? biggest : id, 0)

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
    let user = users[req.params.id] // undefined
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
    let user = users[req.params.id]

    if (user) {

        delete users[req.params.id]
        await fs.writeFile(DB_PATH, JSON.stringify(users, null, '  '))

        Object.keys(todoUsers).forEach(idut => {
            let split = idut.split('-')
            if (split[0] == req.params.id) {
                delete todoUsers[idut]
            }
        })
        await fs.writeFile(DB_PATH_TODOS_USERS, JSON.stringify(todoUsers, null, '  '))
        
        res.status(200).end()
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

export const create = async (req, res) => {
    users[++NEXT] = req.body

    await fs.writeFile(DB_PATH, JSON.stringify(users, null, '  '))
    res
        .status(201)
        .send({
            message: 'user created'
        })
}