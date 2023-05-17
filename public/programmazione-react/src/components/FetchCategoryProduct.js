import { useState, useEffect } from 'react';
import './fetchCategoryProduct.css'

export default function FetchCategoryProduct() {
    const [products, setProducts] = useState([])
    useEffect( () => {
        async function call() {
            const res = await fetch('https://fakestoreapi.com/products/')
            const json = await res.json()
            setProducts(json)
        }
        call()
    }, [])

    const [arr, setArr] = useState([])
    useEffect(() => {
        const map = new Map(), arr = []
        for(let i = 0, count = 0; i < products.length; i++) {
            if(!map.has(products[i].category)) {
                map.set(products[i].category, count++)
                arr.push({c: products[i].category, p: [products[i].title]})
            } else {
                let n = map.get(products[i].category)
                arr[n].p.push(products[i].title)
            }
        }
        setArr(arr)
    }, [products])

    return (
        <div className="page">
            {arr.map((el, i) => (
                <div className="categories"key={i}>
                    <div className="categoriesTitle">{el.c}</div>
                    {el.p.map((el1, i) => <div className="productsTitle"key={i}>{el1}</div> )}
                </div>
            ))}
        </div>
    )
}