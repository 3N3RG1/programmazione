import { useState } from 'react';
import './buttonNonClickable.css'

export default function ButtonNonClickable() {
    const [button, setButton] = useState('Click me!')

    const [position, setPosition] = useState({})
    function random() {
        let top = Math.random() * 100
        let left = Math.random() * 100
        let yTranslate = top >= 50 ? '-100%' : '0%'
        let xTranslate = left >= 50 ? '-100%' : '0%'
        setPosition({
            'top': top,
            'left': left,
            'translate': `translate(${xTranslate}, ${yTranslate})`
        })
    }

    return (
        <button
            onMouseEnter={random}
            onClick={() => setButton('fuck !')}
            style={{
                top: position.top+'%',
                left: position.left+'%',
                transform: position.translate
            }}
        >{button}</button>
    )
}

//scrivere un pulsante non cliccabile, quando l'utente ci arriva quasi sopra (come potete programmare questo "quasi"?) il pulsante si sposta in un punto random della pagina.