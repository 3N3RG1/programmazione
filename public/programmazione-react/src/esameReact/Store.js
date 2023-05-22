import { useState, useEffect } from 'react';
import NavBar from './navBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import Products from './products/Products';
import './store.css';

export default function Store() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        (async () => {
            let res = await fetch('https://dummyjson.com/products')
            let json = await res.json()
            let products = json.products
            setProducts(products)
        })()
    }, [])

    return (
        <>
            <NavBar products={products} cart={cart} setCart={setCart}/>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path={'/'} element={<Products products={products} cart={cart} setCart={setCart}/>} />
                {/* <Route path={'/product:n'} element={<Product />} /> */}
                {/* <Route path="*" element={<Error />} /> */}
            </Routes>
        </>
    )
}