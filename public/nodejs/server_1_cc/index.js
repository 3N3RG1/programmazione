import { server, ccGet, ccRicercaTermineGet, ccIdGet, ccIdDelete, ccIdPut, ccPost } from './routesCC.mjs'
import { ccFilmsGet, fGet } from './routesFilm.mjs'

import express from 'express' // ci permette di utilizzare le key word di express associate al crud e semplificare la struttura e scrittura del nostro codice (anche send e stauts e molte altre cose)
const app = express()
const port = 3000
import bodyParser from 'body-parser' // serve a prendere e gestire il body di una request put(update) e post(create) -> link: https://expressjs.com/en/5x/api.html#req.body
app.use(bodyParser.json()) // una volta preso il body ce lo restituisce secondo il costrutto json


app.get('/', server)

app.get('/case-cinematografiche', ccGet)
app.get('/case-cinematografiche/ricerca/:termine', ccRicercaTermineGet)
app.get('/case-cinematografiche/:id', ccIdGet)
app.delete('/case-cinematografiche/:id', ccIdDelete)
app.put('/case-cinematografiche/:id', ccIdPut)
app.post("/case-cinematografiche", ccPost)

app.get('/case-cinematografiche/:id/films', ccFilmsGet)
app.get('/films', fGet)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

