import express from 'express'
const app = express()
app.use(express.json())

import * as students from "./studentsRoutes.mjs"

app.get('/', (req, res) => {
    res.send('server_6_groups')
})

app.get("/digitazon/2023/02/group/1/students", students.getGroupStudents)
app.get("/digitazon/2023/02/students", students.getAllStudents)
app.get("/key", students.key)

app.listen(3000, () => {
    console.log(`Example app listening on port ${port}`)
})