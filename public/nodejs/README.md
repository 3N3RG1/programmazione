# Node.js v20.2.0 - [download](https://nodejs.org/it/download/current)
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
Installiamo il framework [`express`](https://expressjs.com/en/starter/installing.html) che ci fornisce una serie di strumenti che ci semplificano le realizzazione di applicazioni basate su Node.js, in particolar modo ci semplifica il lavoro di mapping tra i metodi HTTP (post, get, put e delete) e le operazioni CRUD (Create, Read, Update, Delete).
```
npm install express
```
> Proprietà dependencies e dipendenza express aggiunta all'oggetto presente nel file package.json :
```json
"dependencies": {
    "express": "^4.18.2"
}
```
In seguito dobbiamo importarlo e renderlo adoperabile* all'interno del nostro file index.js che andremo a configurare successivamente:<br>
<sub>* Invochiamo la funzione express() che ci ritorna come assegnameto della variabile app una reference dell'oggetto che contiene l'API di express</sub>
```js
import express from 'express'
const app = express() // *
```
Visto che abbiamo installato una dependencie andranno a crearsi in maniera automatica anche i node_modules e il package-lock.json -> metterei i link in fondo

### 3. body-parser
[`body-parser`](https://expressjs.com/it/api.html) è una libreria che ci permette di parsare nel formato json il body delle chiamate post e update, che ci forniscono un payload.<br>
In particolar modo presenta 4 middleware che sono funzioni che elaborano le richieste in arrivo prima che raggiungano il server di destinazione, senza le quali al server arriverebbe un messaggio che non è in grado di "leggere".

- Per quanto guarda le versioni precedenti alla v4.16.0 di express è necessario installare la libreria `body-parser`.
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

- Per quanto riguarda invece le versioni di express a partire dalla v4.16.0 non è necessario installare la libreria body-parser perchè è stata implementata direttamente da express.<br>
In questo caso quindi ci basterà utilizzarla nel nostro file index.js che andremo a configurare successivamente:
```
app.use(express.json())
```

### 4. nodemon
Installiamo il tool [`nodemon`](https://www.npmjs.com/package/nodemon?activeTab=readme) che ci permetterà ad ogni salvataggio di non dover rirunnare il server perchè proprio il tool lo farà in maniera automatica.
```
npm install --save-dev nodemon
```
> Proprietà devDependencies e dipendenza nodemon aggiunta all'oggetto presente nel file package.json :
```json
"devDependencies": {
    "nodemon": "^2.0.22"
}
```
Utilizziamo il flag `--save--dev` perchè non vogliamo installare nodemon come dipendenza di funzionamento, le quali servono al server per rispndere in maniera corretta alle chiamate, ma lo installiamo come dev dipendenza ovvero come dipendenza utile allo sviluppatore solo in fase di sviluppo.<br>
In aggiunta inseriamo all'interno dell'oggetto scripts del file package.json le proprietà:
```json
"start": "node src/index.js",
"dev": "nodemon -w src src/index.js"
```
> start: ci permette di runnare il server nella modalità di default
> dev: ci permette di runnare il server in modalità nodemon.<br>
Utilizziamo `-w src` perchè normalmente qualsiasi file salviamo, anche al di fuori della cartella stessa del server, nodemon mi rirunna il server mentre con questo tag solo ciò che salvo dentro la cartella src mi farà attivare nodemon.

### 5. import
Abbiamo deciso di utilizzare l'`import` di ECMAScript-6 (ES6) quindi dobbiamo aggiungere sopra l'oggetto scripts di package.json la proprietà:
```
"type": "module",
```

### 6. .gitignore
Creiamo il file `.gitignore` e inseriamo al suo interno:
```
node_modules
```
In questo modo quando andremo a committare e pushare il nostro progetto, git ignorerà la cartella node_modules.
perchè facciamo questa procedura -> link node_modules

### 7. src & index.js
Creiamo la cartella `src` che server a contenere tutti i file relativi a routes e creiamo al suo interno il file `index.js` nel quale scriviamo di default:
```js
const port = 3000                  // porta nella quale hosto localmente il server
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
###
A questo punto ho tutto il necessario per poter lavorare ma posso necessitare ancora di due elementi molto utili ai file routes:

### 8. promise
In Node.js nulla restituisce una promise ciò significa che non è possibile utilizzre async e await per trasformare il funzionamento asincrono ad esempio di una chiamata esterna in un funzionamento sincrono.<br>
L'unico modo per farlo è trasformare la stessa natura asincrona in sincrona.<br>
Pensiamo anche alla dicitura fs.writeFile(path, JSON.stringify(pathName, null, '  ')) che mi permette di sovrascrivere i dati relativi ad un database(file).<br>
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

L'unico modo per evitare questo è permettere a Node.js di restituire delle promise importando la libreria:
```
import fs from 'node:fs/promises'
```
'fs' è una libreria che non necessita di essere installata perchè fa già parte di Node.js, infatti hanno notato nel corso degli anni che era talmente utile che invece di costringere gli utenti ad installarla per ogni progetto l'hanno integrata direttamente.

4 -> asincrona ma con un funzionamento sincrono - restituisce una promise: blocca l'esecuzioni di js finchè non termina la chiamata
await fs.writeFile(path, JSON.stringify(pathName, null, '  '))
res.status(...)

Perchè preferire async - await se la stessa cosa possiamo farla con Sync ?

### 9. axios
Per poter fare la fetch di un URL ad esempio per i nostri scripts locali o per le chiamate a server esterni possiamo farlo direttamente attraverso javascript oppure anche tramite la libreria axios che ci permette di semplificare molto il lavoro anche se presenta determinati vantaggi-svantaggi:
```
npm install axios
```
Una volta installato basta importarlo nei file attraverso la dicitura:
```
import axios from 'axios'
```
Per utilizzarlo nelle chiamate esterno o nei nostri scripts basta utilizzare la dicitura:
- await.CRUD(url)
---
INFORMAZIONI AGGIUNTIVE:

> package.json:
è un file che contiene sia i metadata relativi al progetto utili agli sviluppatori, sia i metadata funzionali come le dipendenze che necessita l'applicazione per funzionare

> package-lock.json: https://www.atatus.com/blog/package-json-vs-package-lock-json/
Registra la versione esatta di ogni dipendenza installata, incluse le sue sotto-dipendenze e le loro versioni.
Lo scopo è garantire che le stesse dipendenze vengano installate in modo coerente in ambienti diversi, ad esempio ambienti di sviluppo e produzione. Aiuta anche a prevenire problemi con l'installazione di diverse versioni del pacchetto, che possono portare a conflitti ed errori, infatti blocca la versione specifica di ciascuna dipendenza.
Ad esempio nel momento di produzione quando uno sviluppatore clona il repository di un altro sviluppatore ili package-lock.json evita che vengano copiate versioni di dipendeze superiori a quelle originali evitando così problemi di conflitto.

> node_modules:
La cartella node_modules è come una cache per i moduli esterni da cui dipende il tuo progetto (librerie). Qunado fai npm install vengono scaricati dal Web e copiati nella cartella node_modules.
Il motivo per il quale non ha senso committare i node_modules è duplice:
1 - tutte le versioni relative alle dipendenze sono già presenti nel package-lock.json e chunque in qualsiasi momento può installare i node_modules che dipendono direttamente dalle versioni delle dipendenze quindi committarli sarebbe come avere la copia di qualcosa che si ha già, inoltre complicherebbe anche l'aggiornamento ad una versione più recente di tutti i moduli nel caso volessimo aggiornare la nostra applicazione.

> xswpd
- dmdfmddnfjsd usqdv qsv sdv sif ihg sdiogh psdih suig sdfh skhòksdj gps ii sipf iuhghsp ahdgh g df idf df xv jvnjknvkjsr su sih sg suigh iug ughjeh eug.
ng iur iu feg fgfiuge gfiugbe eg eug peug erpg nperguihih fugpdufhbdfu duihfbidfnbdfp ih e.
YUICCUINCUVCEIOHCYB I iuvfisug igherpigsrèg srogi orifh'ug e7gh oih g g iog pdfgh egh eogh oigheuighe puig heiug peg pg ipug hwerèo

# dnvvfvf
## dsvnsfv
### sddfairugs
> dfuirguiergui:

    sdeubig
=========

scfnvfsnvfuin



