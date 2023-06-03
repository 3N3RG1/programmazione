import express from 'express'
const app = express()
const port = 3000

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import * as impiccato from './impiccato-routes.mjs'

app.get('/', (req, res) => {
    res.send('server_5_impiccato')
})

app.post('/session/create', impiccato.create)
app.post('/session/phase', impiccato.phase)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// AGGIUNGI UN ARRAY DI PAROLE E LETTERE GIà PROVATE E BLOCCA SE VENGONO RIUTILIZZATE
// AGGIUNGI CHE IL CREATORE PUò SCEGLIERE QUANTI ERRORE DARE AGLI ALTRI GIOCATORI
// DOVREI CREARE ANCHE UN DB CHE è UNA SET CON TUTTE LE SESSIONI GIà CREATE E BLOCCARE UN UTENTE SE VUOLE CREARE UNA SESSIONE CHE HA LO STESSO NOME DI UNA SESSIONE GIà CREATA

/*
{
    "1": {
        "initialPhase": {
            "user": {
                "name": "Mario",
                "surname": "Rossi"
            },
            "word": "paypal",
            "session": "bella"
        }
        "phases": {
            "1": {
                "user": {
                    "name": "Luigi",
                    "surname": "Verdi"
                },
                "word": "a"
                ("session": "bella!!!") > header
            }
            "2": {
                "user": {
                    "name": "Wario"
                    "surname": "Viola"
                }
                "word": "fullWord"
            }
            "3": {
                "user": {
                    "name": "Bowser"
                    "surname": "Yellow"
                }
                "word": "paypal"
            }
            ...
        }
        "end": {
            "error": 0,
            "word": "pa-pa-",
            ("win": true)
        }
    }
}
*/