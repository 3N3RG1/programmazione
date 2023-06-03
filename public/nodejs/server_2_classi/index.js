import express from 'express'
const app = express()
const port = 3000
import bodyParser from 'body-parser'
app.use(bodyParser.json())

import { cGet, cSezGet, cSezAlGet, cSezMatGet, cAlSezGet, cMatSezGet, cAlDel, cSezPut, cPost } from './routesClassi.mjs'
import { cSezInsGet, cSezMatInsGet } from './routesInsegnanti.mjs'

app.get('/', (req, res) => {
    res.send('server_2_classi')
})

// presenti - che presentano
app.get('/classi', cGet)
app.get('/classi/:sezione', cSezGet)
app.get('/classi/:sezione/alunni', cSezAlGet)
app.get('/classi/:sezione/materie', cSezMatGet)
app.get('/classi/:alunno/sezione', cAlSezGet)
app.get('/classi/:materia/sezioni', cMatSezGet) // prendimi tutte le sezioni che presentano la relativa materia
app.delete('/classi/:alunno', cAlDel)
app.put('/classi/:sezione', cSezPut) // aggiungi un alunno alla classe relativa
app.post('/classi', cPost) // aggiungi una sezione

app.get('/classi/:sezione/insegnanti', cSezInsGet) // dammi tutti gli insegnanti di una relativa sezione
// app.get('/classi/:materia/insegnanti', cMatInsGet)
app.get('/classi/:sezione/materie/insegnanti', cSezMatInsGet) // dammi tutti i possibili insegnanti che insegnano una delle materie della relativa sezione

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

