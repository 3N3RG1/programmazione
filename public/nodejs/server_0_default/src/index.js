import express from 'express'
const app = express()
const port = 3000

import bodyParser from 'body-parser'
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('server_0_default')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})