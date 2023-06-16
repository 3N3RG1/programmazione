import express from 'express'
const app = express()
app.use(express.json())

// express-session
import session from 'express-session'
app.use(session({
    secret: 'super-secret',
    resave: false,
    cookie: { maxAge: 60000 }
}))

// npm install dotenv: per supportare file che contengono variabili d'ambiente
// importiamo la possibilità di supportare questi file che non node non sarebbe in grado di leggere (.env)
// stiamo importando ciò che viene esportato dal modulo config dentro la cartella dotenv
import 'dotenv/config'
import { insertUser } from './mongodb.mjs'

// per leggere la rotta relativa all'html
// app.use(bodyParser.urlencoded({ extended: false }))

/*
    la sessione è il range di tempo nel quale o si è autenticati
    autenticati: il server verifica l'esistenza di quell'utente e restituisce un token di accesso univoco
                 Finchè questo token è "vivo" allora l'utente significa che è ancora loggato
                 Utente e server continuano a scambiarsi tra le chiamate il token in modo che il server identifichi ogni volta l'utente
    autorizzati: ad esempio quando un utente chiede la delete di un post, può solamente eliminare i post relativi al proprio account
                 Quindi è autorizzato ad eleminare i propri post ma non è autorizzato ad eliminare i post degli altri utenti
    L'autorizzaziona ha un valore maggiore rispetto all'autenticazione, è come se fosse un gradino sopra infatti se è autorizzati solo se si è anche autenticati
*/

// middleware che verifica se l'utente è loggato oppure no controllando la sessione
function sessionChecked(req, res, next) {
    console.log(req.session.user)
    if(req.session.user) {
        next()
    } else {
        res
        .status(403)
        .send({
            message: 'not authorized'
        })
    }
}

app.get('/', (req, res) => {
    res.send('server_8_db')
})

// signup
app.post('/users/signup', (req, res) => {
    let user = req.body
    insertUser(user)
    res.status(201)
})

// login
app.post('/users/session', (req, res) => {
    if(req.body.username === 'energy' && req.body.password === '331' ){
        req.session.user = req.body.username
        res.send({
            message: 'user authenticated'
        })
    } else {
        res
        .status(403)
        .send({
            message: 'user not found'
        })
    }
})

// richiesta da parte dell'utente che viene esaudita solo se è loggato
app.get('/users', sessionChecked, (req, res) => {
    res.send('users')
})

// logout
app.delete('/users/session', (req, res) => {
    req.session.destroy(err => {
        res.send({
            message: 'user has logged out'
        }) 
    })
})

app.listen(3000, () => {
    console.log(`Example app listening on port`)
})