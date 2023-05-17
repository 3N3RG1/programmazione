import { useState, useEffect } from 'react'
import './redInput.css'

export default function RedInput() {
  const [value, setValue] = useState('') // 1.2
  const [color, setColor] = useState('') // 3
  const [boo, setBoo] = useState(true) // 4

  useEffect(() => { // 2
    if(boo) return setBoo(false)
    if(!value) { return setColor('red') } // 2.1
    const punteggiatura = new Set(['.',',',';',':','!','?','*','-','(',')','[',']','"','«','»',`'`]) // 2.3
    let number = true, simbol = true // 2.2 - 2.3
    for(let i = 0; i < value.length; i++) { // ciclo
      if(isNaN(value[i])) { number = false } // 2.2
      if(!punteggiatura.has(value[i])) { simbol = false } // 2.3
    }
    if(number || simbol) { return setColor('red') } // 2.4
    return setColor('') // 2.5
  }, [value])

  return (
    <input // 1
      className={color} // 3
      onChange={e => setValue(e.target.value)} // 1.1
    />
  )
}

/*
Semplice: scrivere un componente che rappresenti un input text, quando l'input e' vuoto oppure ha dentro solo dei numeri, oppure solo della punteggiatura, deve avere il bordo rosso. (1 / 2 / 3)

Quando la pagina carica non deve subito partire dal rosso, ma arrivarci solo dopo che l'utente ha scritto qualcosa. ( 4 )
*/

/*
1. scrivere un input
 1.1 quando noi scriviamo qualcosa all'interno dell'input dobbiamo prendere il valore della stringa corrente
 1.2 dobbiamo associare ad una variabile il valore relativo alla stringa nell'input che deve cambiare al variare della stringa stessa

2. condizioni del bordo rosso dell'input:
  - input vuoto 2.1
  - presenta solo numeri 2.2
  - presenta solo segni della punteggiatura 2.3

  Specidfico questo condizioni all'interno di uno useEffect che prende in ingresso il valore di value.
  In questo modo al variare del valore (stringa all'interno dell'input) mi si attiverà la funzione useEffect con le relative condizioni all'interno che mi definiranno se il bordo dovrà apparire rosso o no.

  2.1 quando l'input è una stringa vuota significa che il suo valore booleano è falso.
      Se posiziono un ! davanti a value, quando il mio valore è false, l'opposto (!) risulterà vero, di conseguenza la condizione dell'if sarà verà e javascript eseguirà il return della condizione

  // ciclo: creo un ciclo che itera sulla stringa presente nell'input

  2.2 se il valore preso in ingresso non è un numero allora la variabile number che in partenza è true diventa false
      se ogni valore preso in ingresso è un numero allora la mia variabile rimarrà true perchè non verrà mai riassegnata

  2.3 creo un set con tutti i segni di punteggiatura
      stessa cosa anche qui, se ad ogni valore preso in ingresso il set non presenta quel valore all'ora variabile simbol diventerà false, al contrario se ad ogni valore preso in ingresso il set presenta la sua corrispondenza allora la variabile simbol rimarrà true

  2.4 se una delle due variabili tra number e simbol è rimasta true allora la condizione è verificata e javascript eseguirà il return della condizione

  2.5 se nessuna delle condizioni precedenti si verifica all'ora verrà eseguità l'ultima istruzione

3 Adesso dobbiamo dire a react cosa ritornarci nel caso incontri una condizione vera di quelle specificate in precedenza

  Creaiamo uno useState (la variabile color) che cambia a dipendenza delle condizioni vere precedenti
  Quindi quando l'input:
    - è vuoto
    - presenta solo numeri
    - presenta solo segni della punteggiatura
  la nostra variabile color avrà il valore di red
  Questo valore viene passato alla classe (className) del nostro input che attraverso il css prenderà il colore rosso

4 Ultima condizione: quando la pagina caria non deve subito partire dal rosso, ma arrivarci solo dopo che l'utente ha scritto qualcosa.

  Per fare questo creiamo un altro useState (variabile boo)

Cosa succede quando carichiamo la pagina (la prima volta):
  
  Si attiva lo useEffect, entra nel primo if perchè abbiamo settato boo = true e mi trasforma boo in falso terminando la stessa funzione (useEffect)

  In questo modo evitiamo che al caricamento della pagina (ovvero primo rendering) l'input non appaia rosso per le condizioni specificate al punto 2.1 (all'interno dello useEffect)

5 Ci basta sistemare il css ma su quello sapete già tutto

CSS: 

.red {
  border: 1px solid red;
}

.red:focus {
  border: 0px;
  outline: 3px solid red;
}
*/
