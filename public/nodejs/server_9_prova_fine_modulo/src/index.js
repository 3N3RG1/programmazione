import express from 'express'
const app = express()
app.use(express.json())

import { createAlbum, deleteAlbum, getAlbum, updateAlbum } from './routes_album_fotografici.mjs'
import { createPhoto, deletePhoto, getPhotos, getPhoto } from './routes_fotografie.mjs'

app.get('/', (req, res) => {
    res.send('server_9_prova_fine_modulo')
})

app.post('/albums', createAlbum)
app.delete('/albums', deleteAlbum)
app.get('/albums/:name', getAlbum)
app.patch('/albums/:name', updateAlbum) // modifico il nome passando al body { nome: 'qualcosa' }

app.post('/albums/:name/photos', createPhoto)
app.delete('/albums/:name/photos', deletePhoto)
app.get('/albums/:name/photos', getPhotos)
app.get('/search', getPhoto) // /search?album=qualcosa&photo=qualcosa

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})