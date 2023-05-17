import { useState, useEffect } from 'react'

export default function Hook1() {
    let [count, setCount] = useState(0)
    function onClick() {
        setCount(count+1) // qui posso omettere il return perchè sto invocando una funzione (non devo portare un dato all'esterno)
    }
    // useEffect(() => {
    //     console.log(count)
    // }, [count])

    return (
        <>
            <h1>Hooks</h1>
            <button onClick={onClick}>Counter</button>
            <button onClick={() => setCount(count+1)}>Counter</button>
            <div>{count}</div>
        </>
    )
}