const port = 3000
import express from 'express'
const app = express()
import bodyParser from 'body-parser'
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('server_?')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// import fs from 'node:fs/promises'