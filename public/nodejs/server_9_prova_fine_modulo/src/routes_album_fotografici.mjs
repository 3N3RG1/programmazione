import albums from '../db/album_fotografici.json' assert { type: 'json' }
import fs from 'fs/promises'
const DB_ALBUMS = './db/album_fotografici.json'

const ids = Object.keys(albums)
let nextId = ids
    .reduce((biggest, id) => biggest > id ? biggest : parseInt(id, 10), 0)

export async function createAlbum(req, res) {
    for(let i = 0; i < ids.length; i++) {
        if(albums[ids[i]].nome === req.body.nome) {
            return res
                .status(200)
                .send({
                    message: 'esiste già un album con il seguente nome: ' + req.body.nome
                })
        }
    }
    const date = new Date()
    const newAlbum = { ...req.body, creazione: date, ultimaModifica: date }
    if(!newAlbum.fotografie)
        newAlbum.fotografie = []
    for(let i = 0; i < newAlbum.fotografie.length; i++) {
        newAlbum.fotografie[i].creazione = date
        newAlbum.fotografie[i].ultimaModifica = date
    }
    const allAlbums = {...albums, [++nextId]: newAlbum}
    try {
        await fs.writeFile(DB_ALBUMS, JSON.stringify(allAlbums, null, '  '))
        res
            .status(201)
            .send({
                message: 'album ' + req.body.nome + ' aggiunto alla collezione'
            })
    } catch (err) {
        res.status(err)
    }
}

export async function deleteAlbum(req, res) {
    for(let i = 0; i < ids.length; i++) {
        if(req.body.nome === albums[ids[i]].nome) {
            delete albums[ids[i]]
            try {
                await fs.writeFile(DB_ALBUMS, JSON.stringify(albums, null, '  '))
                return res
                    .status(200)
                    .send({
                        message: 'album: ' + req.body.nome + ' eliminato con successo'
                    })
            } catch (err) {
                return res.status(err)
            }
        }
    }
    res
        .status(200)
        .send({
            message: 'non esiste ancora un album con il seguente nome: ' + req.body.nome
        })
}

export function getAlbum(req, res) {
    for(let i = 0; i < ids.length; i++) {
        if(req.params.name === albums[ids[i]].nome) {
            const fotografie = albums[ids[i]].fotografie.length
            const album = {...albums[ids[i]], fotografie}
            return res
                .status(200)
                .send(album)
        }
    }
    return res
        .status(200)
        .send({
            data: {},
            error: true,
            message: 'non esiste ancora un album con il seguente nome: ' + req.params.name
        })
}

export async function updateAlbum(req, res) {
    for(let i = 0; i < ids.length; i++) {
        if(req.params.name === albums[ids[i]].nome) {
            albums[ids[i]].nome = req.body.nome
            albums[ids[i]].ultimaModifica = new Date()
            try {
                await fs.writeFile(DB_ALBUMS, JSON.stringify(albums, null, '  '))
                return res
                    .status(200)
                    .send({
                        message: 'album: ' + req.body.nome + ' aggiornato con successo'
                    })
                    .redirect('/albums/' + req.body.nome)
            } catch (err) {
                return res.status(err)
            }
        }
    }
    return res
        .status(200)
        .send({
            message: 'non esiste ancora un album con il seguente nome: ' + req.params.name
        })
}