1. Creo una cartella che conterrà il mio progetto

2. Creo un package.json che contiene sia i metadata relativi al progetto utili agli sviluppatori, sia i metadata funzionali come le dipendenze che necessita l'applicazione per funzionare.
```
npm init
```
{
    "name": "server_default",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
}

3. Installo la dipendenza express che mi servirà per poter utilizzare express che mi semplifica il lavoro del CRUD che sarebbe molto più complicato da scrivere in node.js (default).
```
npm install express
```
"dependencies": {
    "express": "^4.18.2"
}
Questo mi andrà a creare anche i node_modules e il package-lock.json

4. Installo la dipendenza body-parser che mi serve per parsare il req.body delle chiamate post e update che ci forniscono un payload (body) in json, senza il parse al server arriverebbe un messaggio che non è in grado di leggere.
```
npm install body-parser
```
"dependencies": {
    "body-parser": "^1.20.2",
    "express": "^4.18.2"
}

5. Installo la dipendenza nodemon che mi permetterà ad ogni salvataggio di non dover rirunnare il server perchè lo fa in automatico.
```
npm install --save-dev nodemon
```
"devDependencies": {
    "nodemon": "^2.0.22"
}
Utilizzo il flag --save--dev perchè non voglio installare nodemon come dipendenza di funzionamento, le quali servono al server per rispndere in maniera corretta alle chiamate, ma lo installo come dev dipendenza ovvero come dipendenza utile allo sviluppatore solo in fase di sviluppo.
In aggiunta inserisco all'interno dell'oggetto scripts di package.json le proprietà:
```
"start": "node src/index.js",
"dev": "nodemon -w src src/index.js"
```
start: mi permette di runnare il server nella modalità normale
dev: mi permette di runnare il server in modalità nodemon. Utilizzo '-w src' perchè normalmente qualsiasi file salvo, anche al di fuori della cartella stessa del server nodemon mi rirunna il server mentre con questo tag solo ciò che salvo dentro la cartella src mi farà attivare nodemon e quindi rirunnare il server in maniera automatica.

6. Ho deciso di utilizzare l'import di ECMAScript-6 (ES6) quindi devo aggiungere sopra l'oggetto scripts di package.json la proprietà:
```
"type": "module",
```

7. Creo il file .gitignore e inserisco al suo interno:
```
node_modules
```
In questo modo quando andrò a committare e pushare il mio progetto, git ignorerà il file.

8. Creo la cartella src che server a contenere tutti i file relativi a routes e creo al suo interno il file index.js nel quale scrivo di default:
```
const port = 3000 // porta nella quale hosto localmente il server
import express from 'express' // importo express per poterlo utilizzare
const app = express() // in questo modo posso utilizzare il crud
import bodyParser from 'body-parser' // importo body-parser per poterlo utilizzare
app.use(bodyParser.json()) // in questo modo il body dei payload verrà convertito in json in automatico

app.get('/', (req, res) => {
    res.send('Server_?')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

A questo punto ho tutto il necessario per poter lavorare ma posso necessitare ancora di due elementi molto utili ai file routes:

9. Inserisco nei mei file routes per poter utilizzare async e await:
```
import fs from 'node:fs/promises'
```
'fs' è una libreria che non necessita di essere installata perchè fa già parte di Node.js, infatti hanno notato nel corso degli anni che era talmente utile che invece di costringere gli utenti ad installarla per ogni progetto l'hanno integrata direttamente.
Ma perchè necessito async e await?
In Nodejs nulla restituisce una promise, pensiamo ad una chiamata ad un database esterno che ha una natura asincrona, ecco questa non restituirà una promise ovvero la promessa che qulcosa arriverà.
Pensiamo anche alla dicitura fs.writeFile(path, JSON.stringify(pathName, null, '  ')) che mi permette di sovrascrivere i dati relativi ad un database.
Questa operazione ha una natura asincrona ma non mi restituisce una promise ciò significa che non possiamo trattarla secondo un funzionamento sincrono ma dobbiamo convertire la sua natura asincrona in sincrona attraverso la dicitura fs.writeFileSync

1 -> natura asincrona - non restiruisce una promise: la risposta avviene prima del completamento di fs
fs.writeFile(path, JSON.stringify(pathName, null, '  '))
res.status(...)

2 -> natura asincrona - non restituisce una promise: la risposta (call-back) avviene dopo il completamento di fs
fs.writeFile(path, JSON.stringify(pathName, null, '  '), () => {
    res.status(...)
})

3 -> natura sincrona - non restituisce una promise in quanto ha natura asincrona e non per via di node.js: Sync blocca l'esecuzioni di js finchè non termina la chiamata
fs.writeFileSync(path, JSON.stringify(pathName, null, '  '))
res.status(...)

L'unico modo per evitare questo è permettere a Node.js di restituire delle promise attraverso la libreria.
Questo ci permetterà di utilizzare aync e await che sono utilizzabili solo quando una chiamata restituisce una promise.

4 -> asincrona ma con un funzionamento sincrono - restituisce una promise: blocca l'esecuzioni di js finchè non termina la chiamata
await fs.writeFile(path, JSON.stringify(pathName, null, '  '))
res.status(...)

10. Per poter fare la fetch di un URL ad esempio per i nostri scripts locali o per le chiamate a server esterni possiamo farlo direttamente attraverso javascript oppure anche tramite la libreria axios che ci permette di semplificare molto il lavoro anche se presenta determinati vantaggi-svantaggi:
```
npm install axios
```