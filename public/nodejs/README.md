# Node.js ^20.2.0 / [download](https://nodejs.org/it/download/current)
Node.js è un **runtime** Javascript ovvero un **ambiente di esecuzione** che permette di eseguire codice javascript.

Lavora in **single-threaded**, inviando la risposta ai relativi client in maniera **sincrona** ovvero in successione, ma ciò non significa che non sia in grado di lavorare su più risposte simultaneamente.

Infatti javascript utilizza una **programmazione asincrona** che permettte di eseguire determinate funzioni al di fuori del single-threaded evitando così blocchi dovuti ad elaborazinoi lunghe.

## Inizia con il tuo primo server
### 1. package.json
Creiamo un `package.json` che contiene sia i metadata relativi al progetto utili allo sviluppatore sia i metadata funzionali come le dipendenze che necessita l'applicazione per funzionare.
```
npm init
```
> Oggetto presente nel file package.json :
```json
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
```

### 2. express
Installiamo il framework [`express`](https://expressjs.com/en/starter/installing.html) che fornisce una serie di strumenti che ci semplificano le realizzazione di applicazioni basate su node.js, in particolar modo semplifica il lavoro di mapping tra i metodi HTTP (post, get, put e delete) e le operazioni CRUD (Create, Read, Update, Delete).
```
npm install express
```
> Proprietà dependencies e dipendenza express aggiunta all'oggetto presente nel file package.json :
```json
"dependencies": {
    "express": "^4.18.2"
}
```
In seguito dobbiamo importare express e renderlo adoperabile* all'interno del nostro file index.js che andremo a configurare successivamente:<br>
<sub>* Invochiamo la funzione express() che ritorna come assegnameto della variabile app una reference dell'oggetto che contiene l'API di express</sub>
```js
import express from 'express'
const app = express() // *
```
Visto che abbiamo installato una dependence andranno a crearsi in maniera automatica anche il [`package-lock.json`](https://github.com/3N3RG1/programmazione/blob/main/public/nodejs/README.md#package-lockjson) e i [`node_modules`](https://github.com/3N3RG1/programmazione/blob/main/public/nodejs/README.md#node_modules)

### 3. body-parser
[`body-parser`](https://expressjs.com/it/api.html) è una libreria che ci permette di parsare nel formato json il body delle chiamate post e update, che ci forniscono un payload, senza la quale al server arriverebbe un messaggio che non è in grado di "leggere".<br>
In particolar modo presenta 4 middleware che sono funzioni che elaborano le richieste in arrivo prima che raggiungano il server di destinazione.

- Per quanto guarda le versioni `precedenti alla v4.16.0` di express è necessario installare la libreria body-parser.
```
npm install body-parser
```
> Proprietà body-parser aggiunta alla proprietà dependencies dell'oggetto presente nel file package.json :
```json
"dependencies": {
    "body-parser": "^1.20.2",
    "express": "^4.18.2"
}
```
In seguito dobbiamo importarla e definire nel nostro file index.js, che andremo a configurare successivamente, che deve parsare il body in ingresso:
```js
import bodyParser from 'body-parser'
app.use(bodyParser.json())
```

- Per quanto riguarda invece le versioni di express `a partire dalla v4.16.0` non è necessario installare la libreria body-parser perchè è stata implementata direttamente da express.<br>
In questo caso quindi ci basterà definire che deve parsare il body in ingresso:
```
app.use(express.json())
```

### 4. nodemon
Installiamo il tool [`nodemon`](https://www.npmjs.com/package/nodemon?activeTab=readme) che ci permette ad ogni salvataggio di non dover rirunnare il server perchè lo fa pr noi in maniera automatica.
```
npm install --save-dev nodemon
```
> Proprietà devDependencies e dipendenza nodemon aggiunta all'oggetto presente nel file package.json :
```json
"devDependencies": {
    "nodemon": "^2.0.22"
}
```
Utilizziamo il flag `--save--dev` perchè non vogliamo installare nodemon come dipendenza di funzionamento ma come dev dipendenza ovvero come dipendenza utile allo sviluppatore solo in fase di sviluppo.<br>
In aggiunta inseriamo all'interno dell'oggetto scripts del file package.json le proprietà:
```json
"start": "node src/index.js",
"dev": "nodemon -w src src/index.js"
```
> **star**t: ci permette di runnare il server nella modalità di default<br>
> **dev**: ci permette di runnare il server in modalità nodemon.<br>
Normalmente quando salviamo un qualsiasi file nodemon rirunna il server in autonomia ma utilizzando il flag `-w src` definiamo che nodemon deve prendere in considerazione solo i file presenti nella cartella src.

### 5. import
Abbiamo deciso di utilizzare l'`import` di ECMAScript-6 (ES6) quindi dobbiamo aggiungere sopra l'oggetto scripts di package.json la proprietà:
```
"type": "module",
```

### 6. gitignore
Creiamo il file `.gitignore` e inseriamo al suo interno:
```
node_modules
```
In questo modo quando andremo a committare e pushare il nostro progetto, git ignorerà la cartella node_modules.
<sub>Perchè è estremamente importante che git ignori i [node_modules](https://github.com/3N3RG1/programmazione/blob/main/public/nodejs/README.md#node_modules) ?</sub>

### 7. index.js
Creiamo la cartella `src` che server a contenere tutti i file relativi a routes e creiamo al suo interno il file `index.js` nel quale inseriamo di default lo script:
```js
const port = 3000  // porta nella quale hosto localmente il server
import express from 'express'
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('server_?')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
## Elementi aggiuntivi in un contesto locale

### 8. file system
Il modulo `fs` di node.js ci permette di interagire con file system e quindi sovrascrivere i nostri file locali (database).<br>
Facendo già parte di node.js necessita solamente di essere importato:
```
import fs from 'fs'
```

Questo modulo presenta due funzioni per sovrascrivere i dati:
- **`writeFile`**: di natura asincrona
1. non restiruisce una promise - la risposta avviene prima del completamento di fs
```js
fs.writeFile(path, JSON.stringify(pathName, null, '  '))
res.status(...)
```
2. non restituisce una promise - la risposta (call-back) avviene dopo il completamento di fs
```js
fs.writeFile(path, JSON.stringify(pathName, null, '  '), () => {
    res.status(...)
})
```
Per la natura stessa di node.js e da come si può notare nelle didascalie precedenti le funzioni di natura asincrona non restituiscono una promise.
Ciò significa che non è possibile convertire il funzionamento asincrono di una funzione in un funzionamento sincrono.
L'unico modo per farlo è convertendo completamente la natura delle funzioni da asincrona a sincrona utilizzando la seconda funzione del modulo fs.

- **`writeFileSync`**: di natura sincrona
3. Sync blocca l'esecuzioni di js finchè non termina la chiamata
```js
fs.writeFileSync(path, JSON.stringify(pathName, null, '  '))
res.status(...)
```

Per risolvere questa situazione, e quindi permettere alle funzioni asincrone di restituire una promise, bisogna importare il modulo `fs/promises` invece di quello precedente:
```
import fs from 'fs/promises'
```
4. asincrona ma con un funzionamento sincrono - blocca l'esecuzioni di js finchè non termina la chiamata
```js
await fs.writeFile(path, JSON.stringify(pathName, null, '  '))
res.status(...)
```

Perchè preferire async - await se la stessa cosa possiamo farla con Sync ?

### 9. axios
Per poter fare la [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) di un endpoint possiamo utilizzare tutto quello che javascript già presenta:
```js
// esempio di una post che a sua volta richiede informazioni con una get ad un endpoint
const post = async (req, res) => {
    const response = await fetch(URL, {
        method: 'GET'
        body: JSON.stringify()
        // ulteriori informazioni
    })
    const json = response.json()
    ...
}
```
Oppure possiamo usufruire di [`axios`](https://axios-http.com/) che è una libreria che permette di semplificare leggermente la sintassi anche se presenta determinati vantaggi-svantaggi:
```
npm install axios
```
Una volta installato basta importarlo nei file dove ne necessitiamo:
```
import axios from 'axios'
```
E utilizzarlo nel seguente modo:
```js
// esempio di una post che a sua volta richiede informazioni con una get ad un endpoint
const post = async (req, res) => {
    const response = await axios.get(URL, {
        // ulteriori informazioni
    })
    ...
}
```

## Informazioni aggiuntive

### [package-lock.json](https://www.atatus.com/blog/package-json-vs-package-lock-json/)
Registra la versione esatta di ogni dipendenza installata, incluse le sue sotto-dipendenze e le loro versioni.<br>
Lo scopo è garantire che le stesse dipendenze vengano installate in modo coerente in ambienti diversi, ad esempio ambienti di sviluppo e produzione.<br>
Aiuta anche a prevenire problemi con l'installazione di diverse versioni del pacchetto, che possono portare a conflitti ed errori, infatti blocca la versione specifica di ciascuna dipendenza.<br>
Ad esempio nel momento di produzione quando uno sviluppatore clona il repository di un altro sviluppatore il package-lock.json evita che vengano copiate versioni di dipendeze superiori a quelle originali evitando così problemi di conflitto.

### node_modules
La cartella node_modules è come una cache per i moduli esterni da cui dipende il tuo progetto (librerie).<br>
Qunado fai npm install vengono scaricati dal Web e copiati nella cartella node_modules.<br>
Il motivo per il quale non ha senso committare i node_modules è perchè tutte le versioni relative alle dipendenze sono già presenti nel package-lock.json e chunque in qualsiasi momento può installare i node_modules che dipendono direttamente dalle versioni delle dipendenze quindi committarli sarebbe come avere la copia di qualcosa che si ha già, inoltre complicherebbe anche l'aggiornamento ad una versione più recente di tutti i moduli nel caso volessimo aggiornare la nostra applicazione.