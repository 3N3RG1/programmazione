import { useState, useEffect } from 'react'
import './fortuneWheel.css'

export default function FortuneWheel() {
    let array = [
        {color: 'red', state: false},
        {color: 'orange', state: false},
        {color: 'yellow', state: false},
        {color: 'green', state: false},
        {color: 'lightblue', state: false},
        {color: 'purple', state: false}
    ]
    const [cells, setCells] = useState(array)

    function random() {
        let min = Math.ceil(0)
        let max = Math.floor(cells.length)
        let number = Math.floor(Math.random() * (max - min) + min) // da sistemare
        setInterval(spin, 10000, number) // prova usare un await
    }

    const [count, setCount] = useState(0)

    function spin() {
        console.log(count, "spin")
        let arr = []
        for (const c of cells) {
            let o = {...c}
            arr.push(o)
        }
        if(count === 0) {
            arr[5].state = false
        }
        else if(count > 0) {
            arr[count-1].state = false
        }
        arr[count].state = true
        setCells(arr)
        setCount(prevCount => prevCount +1)
    }

    
    useEffect(() => {
        console.log(cells)
        //setCount(count+1)
    }, [cells])

    
    useEffect(() => {
        console.log(count, "useffect")
        //setCount(count+1)
    }, [count])

    return (
        <div className="page">

            <div className="section">
                <div></div>
                <div></div>
            </div>

            <div className="section">
                <button
                    onClick={() => random()}
                >Spin</button>
            </div>

            <div className="section">
                <div>Wheel</div>
                <div className="wheel">
                    {cells.map((el, i) => <Wheel el={el} key={i}/>)}
                </div>
            </div>

        </div>
    )
}

function Wheel({el}) {
    return (
        <div style={{backgroundColor: el.color, opacity: (el.state ? '1' : '0.5')}} className="cells"></div>
    )
}