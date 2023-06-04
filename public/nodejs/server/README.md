1. Creiamo un package.json che contiene sia i metadata relativi al progetto utili agli sviluppatori, sia i metadata funzionali come le dipendenze che necessita l'applicazione per funzionare.
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
In questo modo quando andrò a committare e pushare il mio progetto, git ignorerà la cartella node_modules.

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

9. In Node.js nulla restituisce una promise ciò significa che non è possibile utilizzre async e await per trasformare il funzionamento asincrono ad esempio di una chiamata esterna in un funzionamento sincrono.
L'unico modo per farlo è trasformare la stessa natura asincrona in sincrona.
Pensiamo anche alla dicitura fs.writeFile(path, JSON.stringify(pathName, null, '  ')) che mi permette di sovrascrivere i dati relativi ad un database(file).
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

10. Per poter fare la fetch di un URL ad esempio per i nostri scripts locali o per le chiamate a server esterni possiamo farlo direttamente attraverso javascript oppure anche tramite la libreria axios che ci permette di semplificare molto il lavoro anche se presenta determinati vantaggi-svantaggi:
```
npm install axios
```
Una volta installato basta importarlo nei file attraverso la dicitura:
```
import axios from 'axios'
```
Per utilizzarlo nelle chiamate esterno o nei nostri scripts basta utilizzare la dicitura:
- await.CRUD(url)


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


scfnvfsnvfuin