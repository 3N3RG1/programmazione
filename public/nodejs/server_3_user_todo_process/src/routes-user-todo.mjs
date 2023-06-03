import fs from 'node:fs/promises'
import todos from '../db/todos.json' assert { type: 'json' }
import users from '../db/users.json' assert { type: 'json' }
import todoUsers from '../db/todos-users.json' assert { type: 'json' }
const DB_PATH = './db/todos-users.json'

function getId(idu, idt){
    return `${idu}-${idt}`
}

export const create = async (req, res) => {
    let todo =  todos[req.params.idt]
    let user = users[req.params.idu]

    if(!todo){
        res
        .status(200)
        .send({
            data: {},
            error : true,
            message : "todo not found"
        })
        return
    }

    if(!user){
        res
        .status(200)
        .send({
            data:{},
            error: true,
            message : "user not found"
        })
        return
    }

    let id = `${req.params.idu}-${req.params.idt}`

    todoUsers[id] = {
        idu: req.params.idu,
        idt: req.params.idt
    }
    await fs.writeFile(DB_PATH, JSON.stringify(todoUsers, null, '  '))
    res
        .status(201)
        .send({
            message : "todoUsers created"
    })
}

export const remove = async (req, res) => {
    let id = getId(req.params.idu, req.params.idt)
    delete todoUsers[id]
    await fs.writeFile(DB_PATH, JSON.stringify(todoUsers, null, '  '))
    res 
        .status(200)
        .send({
            message : "todoUser deleted"
        })
}

export const completed = async (req, res)=>{
    let id = getId(req.params.idu, req.params.idt)
    todoUsers[id].completed = true
    await fs.writeFile(DB_PATH, JSON.stringify(todoUsers, null, '  '))
    res.status(200).end()
}