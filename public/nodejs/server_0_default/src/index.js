const port = 3000
import express from 'express'
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('server_0_default')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})