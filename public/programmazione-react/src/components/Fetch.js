import { useState, useEffect } from 'react';

export default function HowToImportJson() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchProducts() {
            let res = await fetch('https://fakestoreapi.com/products')
            let json = await res.json() // res. sta per response
            console.log(json)
            setProducts(json)
        }
        fetchProducts()
    }, [])
    return (
        <>
            <h1>Fetch</h1>
            {products.length}
            {products.map((el, i) => (
                    <div key={i} style={{display: "flex"}}>
                        <div>{el.title}</div>
                        <img src={el.image} alt="" style={{width: "100px"}}/>
                    </div>
                )
            )}
        </>
    )
}

// await mi dice aspetta di leggermi il resto del codice fin tanto che react (js) non termina di eseguire questa cosa
// dai un'occhiata a MDN Fetch