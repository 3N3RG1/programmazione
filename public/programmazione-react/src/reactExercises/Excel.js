import './excel.css';
import { useState, useEffect } from 'react';

export default function Excel() {
    const [value, setValue] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        let counter = 0
        for(let i = 0; i < value.length; i++) {
            if(value[i]) counter = counter + 1
        }
        setCount(counter)
    }, [value])
    
    function number(n) {
        let arr = [...value]
        n ? arr.push('') : arr.pop()
        setValue(arr)
    }

    return (
        <div className="page">

            <div className="inputs">
                {value.map((el, i) => <Input key={i} value={value} setValue={setValue} i={i}/>)}
            </div>

            <div className="output">
                <div className="fine">
                        <Button name={'aggiungi celle'} number={number} n={1}/>
                        <Button name={'elimina celle'} number={number} n={0}/>
                </div>
                <div className="fine">
                    <div className="title">Numero di celle che presentano un valore:</div>
                    <div className="number">{count}</div>
                    <div className="title">Numero totale di celle:</div>
                    <div className="number">{value.length}</div>
                </div>
                <div className="fine">
                    <div className="title">Valore equivalente ad ogni cella:</div>
                    <div className="spans">
                        {value.map((el, i) => <span className={value[i] ? 'span' : ''} key={i}>{value[i]}</span>)}
                    </div>
                </div>
            </div>

        </div>
    )
}

function Input({value, setValue, i}) {
    return (
        <input
            onChange={(e) => {
                let arr = [...value]
                arr.splice(i, 1, e.target.value)
                setValue(arr)
                }
            }
        />
    )
}

function Button({name, number, n}) {
    return <button onClick={() => number(n)}>{name}</button>
}
