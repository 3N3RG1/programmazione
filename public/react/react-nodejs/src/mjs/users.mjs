import express from 'express'
const app = express()
app.use(express.json())

import cors from 'cors'
app.use(cors())

import user from '../db/users.json'

app.get('/', (req, res) => {
    res
        .status(200)
        .send(user)
})

app.listen(8000, () => {
    console.log(`Example app listening on port ${port}`)
})