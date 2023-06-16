import albums from '../db/album_fotografici.json' assert { type: 'json' }
import fs from 'fs/promises'
const DB_ALBUMS = './db/album_fotografici.json'

const ids = Object.keys(albums)

export async function createPhoto(req, res) {
    for(let i = 0; i < ids.length; i++) {
        if(req.params.name === albums[ids[i]].nome) {
            for(let j = 0; j < albums[ids[i]].fotografie.length; j++) {
                if(req.body.nome === albums[ids[i]].fotografie[j].nome) {
                    return res
                        .status(200)
                        .send({
                            message: 'esiste già una fotografia con il seguente nome: ' + req.body.nome
                        })
                }
            }
            const date = new Date()
            const newPhoto = { ...req.body, creazione: date, ultimaModifica: date }
            albums[ids[i]].fotografie.push(newPhoto)
            albums[ids[i]].ultimaModifica = date
            try {
                await fs.writeFile(DB_ALBUMS, JSON.stringify(albums, null, '  '))
                return res
                    .status(201)
                    .send({
                        message: 'fotografia: ' + req.body.nome + " aggiunta all'album: " + albums[ids[i]].nome + ' con successo'
                    })
            } catch (err) {
                return res.status(err)
            }
        }
    }
    res
        .status(200)
        .send({
            message: 'non esiste ancora un album con il seguente nome: ' + req.params.name
        })
}

export async function deletePhoto(req, res) {
    for(let i = 0; i < ids.length; i++) {
        if(req.params.name === albums[ids[i]].nome) {
            for(let j = 0; j < albums[ids[i]].fotografie.length; j++) {
                if(albums[ids[i]].fotografie[j].nome === req.body.nome) {
                    albums[ids[i]].fotografie.splice(j, 1)
                    albums[ids[i]].ultimaModifica = new Date()
                    try {
                        await fs.writeFile(DB_ALBUMS, JSON.stringify(albums, null, '  '))
                        return res
                            .status(201)
                            .send({
                                message: 'fotografia: ' + req.body.nome + " eliminata dall'album: " + albums[ids[i]].nome + ' con successo'
                            })
                    } catch (err) {
                        return res.status(err)
                    }
                }
            }
            return res
                .status(200)
                .send({
                    message: 'non esiste ancora una fotografia con il seguente nome: ' + req.body.nome
                })
        }
    }
    res
        .status(200)
        .send({
            message: 'non esiste ancora un album con il seguente nome: ' + req.params.name
        })
}

export function getPhotos(req, res) {
    for(let i = 0; i < ids.length; i++) {
        if(req.params.name === albums[ids[i]].nome) {
            return res
                .status(200)
                .send(albums[ids[i]].fotografie)
        }
    }
    res
        .status(200)
        .send({
            message: 'non esiste ancora un album con il seguente nome: ' + req.params.name
        })
}

export function getPhoto(req, res) {
    for(let i = 0; i < ids.length; i++) {
        if(req.query.album === albums[ids[i]].nome) {
            for(let j = 0; j < albums[ids[i]].fotografie.length; j++) {
                if(req.query.photo === albums[ids[i]].fotografie[j].nome) {
                    return res
                        .status(200)
                        .send(albums[ids[i]].fotografie[j])
                }
            }
            return res
                .status(200)
                .send({
                    message: "non esiste ancora la seguente foto nell'album: " + req.query.album
                })
        }
    }
    res
        .status(200)
        .send({
            message: 'non esiste ancora un album con il seguente nome: ' + req.query.album
        })
}