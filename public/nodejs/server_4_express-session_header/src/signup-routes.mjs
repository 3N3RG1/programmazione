import fs from 'node:fs/promises'
import signup from '../db/signup.json' assert { type: 'json' }

const DB_PATH = './db/signup.json'

let NEXT = Object
    .keys(signup)
    .reduce((biggest, id) => biggest > id ? biggest : parseInt(id, 10), 0)

export const search = (req, res) => {
    const array = Object.keys(signup)
    for(let i = 0; i < array.length; i++) {
        if(signup[array[i]].user === req.params.name) {
            const message = req.session.mySessionData ?
                {user: signup[array[i]].user, password: signup[array[i]].password} :
                {message: 'You are no longer logged in'}
            return res
                .status(200)
                .send(message)
        }
    }
    res
        .status(400)
        .send({ message: 'user not found' })
}

export const create = async (req, res) => {
    if(!req.body.user || !req.body.password) {
        return res.status(400).send({ message: 'missing information'})
    }

    req.session.mySessionData = 'session started'
    signup[++NEXT] = {
        user: req.body.user,
        password: req.body.password,
    }
    await fs.writeFile(DB_PATH, JSON.stringify(signup, null, '  '))
    res
        .status(201)
        .send({ message: 'user registered' })
}

export const signin = async (req, res) => {
    if(!req.body.user || !req.body.password) {
        return res.status(400).send({ message: 'missing information'})
    }

    const array = Object.keys(signup)
    for(let i = 0; i < array.length; i++) {
        if(signup[array[i]].user === req.body.user && signup[array[i]].password === req.body.password) {
            req.session.mySessionData = 'session started'
            return res
                .status(200)
                .send({ message: 'you are now logged' })
        }
    }
    res
        .status(400)
        .send({ message: 'user not found' })
}