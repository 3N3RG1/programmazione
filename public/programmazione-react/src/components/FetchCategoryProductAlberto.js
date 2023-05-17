import { useState, useEffect } from 'react'

const CATEGORIES_URL = 'https://fakestoreapi.com/products/categories'
const CATEGORY_URL = 'https://fakestoreapi.com/products/category/'

function Category({el}) {
    return (
        <div>
            <h3>{el.category}</h3>
            <ul>
                {el.products.map((p, i) => <li key={i}>{p.title}</li>)}
            </ul>
        </div>
    )
}

export default function FetchCategoryProductAlberto() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function getAllCategories() {
        const res = await fetch(CATEGORIES_URL)
        const json = await res.json()

        let categories = json.map(async category => {
            const resProducts = await fetch(CATEGORY_URL+category)
            const products = await resProducts.json()
            return { category, products }
        })
        // perchè qua ogni elemento di categories è una promise ? perchè il ciclo non aspetta che la funzione termini per passare a quella successiva,  quindi le funzioni termineranno di caricare gli oggetti una volta terminato il ciclo
        categories = await Promise.all(categories)
        setCategories(categories)
        }
        getAllCategories()
    }, [])

    return (
        <div className="container">
            <h2>Product columns</h2>
            {categories.map((el, i) => <Category key={i} el={el} />)}
        </div>
    )
}