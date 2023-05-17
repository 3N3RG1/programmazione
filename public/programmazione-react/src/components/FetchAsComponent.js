import { useState } from 'react';

export default function FetchAsComponent() {
    const [fetched, setFetched] = useState([])
    return (
        <div>
            <Fetch url={'https://fakestoreapi.com/products'} setFetched={setFetched}/>
            {fetched.map((el, i) => <div key={i}>{el.title}</div> )}
        </div>
    )
}

function Fetch({url, setFetched}) {
    async function call() {
        const res = await fetch(url)
        const json = await res.json()
        setFetched(json)
    }
    call()
}

// Fetch as aside function

// function FetchAsAsideFunction() {
//     const [fetched, setFetched] = useState([])
//     fetchFunction('https://fakestoreapi.com/products', setFetched)

//     return (
//         <div>
//             {fetched.map((el, i) => <div key={i}>{el.title}</div> )}
//         </div>
//     )
// }

// function fetchFunction(url, fnc) {
//     async function call() {
//         const res = await fetch(url)
//         const json = await res.json()
//         fnc(json)
//     }
//     call()
// }