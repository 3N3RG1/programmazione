import impiccato from '../db/impiccato.json' assert { type: 'json' }
import fs from 'node:fs/promises'

const DB_PATH = './db/impiccato.json'
const arr = Object.keys(impiccato)

export const session = async (req, res) => {
    let biggest = 0
    for(let i = 0; i < arr.length; i++) {
        if(impiccato[arr[i]].initialPhase.user.name === req.body.user.name &&
            impiccato[arr[i]].initialPhase.user.surname === req.body.user.surname) {
                return res
                    .status(403)
                    .send({
                        message: 'You have already created a session',
                        session: impiccato[arr[i]].initialPhase.session
                    })
        }
        biggest = biggest > arr[i] ? biggest : parseInt(arr[i], 10)
    }
    impiccato[++biggest] = {
        initialPhase: req.body,
        phases: {},
        end: {
            error: 0,
            word: ''.padStart(req.body.word.length, '-')
        }
    }
    await fs.writeFile(DB_PATH, JSON.stringify(impiccato, null, '  '))
    res
        .status(201)
        .send({ message: 'session -' + req.body.session + '- created'})
}

export const phase = async (req, res) => {
    for(let i = 0; i < arr.length; i++) {
        if(impiccato[arr[i]].initialPhase.session === req.headers.session) { // controllo se la sessione esiste

            if(impiccato[arr[i]].end.win) { // se end.win esiste allora la sessione è terminata altrimenti continuo con il resto
                return res
                    .status(200)
                    .send({ message: 'The session has already ended' })
            }

            let next = Object // calcola l'id successivo alle phases della sessione in cui l'utente ha deciso di giocare
                .keys(impiccato[arr[i]].phases)
                .reduce((biggest, id) => biggest > id ? biggest : parseInt(id, 10), 0)
            impiccato[arr[i]].phases[++next] = req.body

            if(req.body.word.length === 1) { // algoritmo dell'impiccato
                let endWord = ''
                for(let j = 0; j < impiccato[arr[i]].initialPhase.word; j++) {
                    if(impiccato[arr[i]].end.word[j] != '-') {
                        endWord += impiccato[arr[i]].end.word[j]
                    } else {
                        endWord += impiccato[arr[i]].initialPhase.word[j] === req.body.word ? req.body.word : '-'
                    }
                }
                console.log(endWord)
                if(endWord === impiccato[arr[i]].end.word) {
                    const error = impiccato[arr[i]].end.error + 1
                    impiccato[arr[i]].end.error++
                    if(error === 10) {
                        impiccato[arr[i]].end.win = false
                        await fs.writeFile(DB_PATH, JSON.stringify(impiccato, null, '  '))
                        return res
                            .status(200)
                            .send({
                                errors: impiccato[arr[i]].end.error,
                                message: 'Word was: ' + impiccato[arr[i]].initialPhase.word
                            })
                    } else {
                        await fs.writeFile(DB_PATH, JSON.stringify(impiccato, null, '  '))
                        return res
                            .status(200)
                            .send({
                                errors: impiccato[arr[i]].end.error,
                                message: 'The word at the moment is: ' + impiccato[arr[i]].end.word
                            })
                    }
                } else {
                    impiccato[arr[i]].end.word = endWord
                    if(endWord === impiccato[arr[i]].initialPhase.word) {
                        impiccato[arr[i]].end.win = true
                        await fs.writeFile(DB_PATH, JSON.stringify(impiccato, null, '  '))
                        return res
                            .status(200)
                            .send({
                                message: 'You won, the word is: ' + impiccato[arr[i]].end.word
                            })
                    } else {
                        await fs.writeFile(DB_PATH, JSON.stringify(impiccato, null, '  '))
                        return res
                            .status(200)
                            .send({
                                message: 'You guessed a letter, the word at the moment is: ' + impiccato[arr[i]].end.word
                            })
                    }
                }
            } else {
                if(req.body.word === impiccato[arr[i]].initialPhase.word) {
                    impiccato[arr[i]].end.word = req.body.word
                    impiccato[arr[i]].end.win = true
                    await fs.writeFile((DB_PATH, JSON.stringify(impiccato, null, '  ')))
                    return res
                        .status(200)
                        .send({
                            message: 'You won, the word is: ' + impiccato[arr[i]].end.word
                        })
                } else {
                    const error = impiccato[arr[i]].end.error + 1
                    impiccato[arr[i]].end.error++
                    if(error === 10) {
                        impiccato[arr[i]].end.win = false
                        await fs.writeFile(DB_PATH, JSON.stringify(impiccato, null, '  '))
                        return res
                            .status(200)
                            .send({
                                errors: impiccato[arr[i]].end.error,
                                message: 'Word was: ' + impiccato[arr[i]].initialPhase.word
                            })
                    } else {
                        await fs.writeFile(DB_PATH, JSON.stringify(impiccato, null, '  '))
                        return res
                            .status(200)
                            .send({
                                errors: impiccato[arr[i]].end.error,
                                message: 'The word at the moment is: ' + impiccato[arr[i]].end.word
                            })
                    }
                }
            }
        }
    }
    return res
        .status(404)
        .send({
            data: {},
            error: true,
            message: 'Session not found'
        })
}