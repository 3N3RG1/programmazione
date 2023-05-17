import { useState, useEffect } from 'react'

export default function Hook2() {
    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')
    const [output, setOutput] = useState('')
    const [davide, setDavide] = useState('ciao')

    useEffect(() => {
        setOutput(input1 && input2 ? 'useEffect' : '')
    }, [input1, input2])
    // let output = ''
    // function change() {
    //     return output = input1 && input2 ? 'useEffect' : ''
    // }

    return (
        <>
            <h1>Hooks2</h1>
            <div>
                <input value={input1} onChange={(e) => setInput1(e.target.value)}></input>
                <input value={input2} onChange={(e) => setInput2(e.target.value)}></input>
                <span>{output}</span>
            </div>
        </>
    )
}