import express from 'express'
import session from 'express-session' // npm install express-session
const app = express()
app.use(
    session({
        // It holds the secret key for session
        secret: "How the fuck it works",
        // Forces the session to be saved (if true) back to the session store
        resave: false,
        // Forces a session that is "uninitialized" to be saved to the store
        saveUninitialized: false,
        cookie: {
            // Session expires after 1 min of inactivity
            expires: 15000
        }
    })
)
const port = 3000

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import * as user from './user-routes.mjs'
import * as signup from './signup-routes.mjs'


app.get('/', (req, res) => {
    res.send('server_4_express-session_header')
})

// HEADER
// Quando viene creato un utente tramite POST si deve fare una GET a questo indirizzo https://fakestoreapi.com/users, utilizzando l'id corretto, e completare tutti i campi dell'oggetto utente con cio' che si trova nella risposta dell'API.
// Se l'utente con quell'id non c'e' nelle fakestoreapi semplicemente lo lasciate con i dati che ha POSTato l'utente
// Proteggere le chiamate PUT e DELETE con un token che va specificato negli header, questo token deve contenere un "segreto" che e' specificato nel server
// Quindi il token deve essere controllato nel server: controllarlo vuol dire verificare che nel server sia uguale a quanto specificato nel client
app.get('/users', user.getAll)
app.get('/users/search', user.search)
app.get('/users/:id', user.get)
app.put('/users/:id', user.update)
app.delete('/users/:id', user.remove)
app.post('/users', user.create)

// EXPRESS-SESSION
// creare un endpoint di registrazione al quale sia possibile registrare una coppia utente / password
// creare un endpoint di login al quale sia possibile loggarsi sul server
// creare un endpoint /session che ritorna i dettagli dell'utente se loggato, dopo 60 secondi che utente e' loggato viene automaticamente sloggato dal server
app.get('/signup/:name', signup.search)
app.post('/signup', signup.create)
app.put('/signup', signup.signin)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})