import { useState } from 'react';
import './navBar.css'

export default function NavBar({products, cart, setCart}) {
    const [input, setInput] = useState('')
    const [array, setArray] = useState([])

    function search() {
        if(input === '' || input === ' ') return setArray([])
        let array = []
        for(let i = 0; i < products.length; i++)
            if(products[i].title.includes(input) || products[i].brand.includes(input))
                array.push(products[i])
        return setArray(array)
    }

    const [cartDisplay, setCartDisplay] = useState('none')

    return (
        <>
            <div className="navbar">
                <div className="logo">Logo</div>
                <div className="elements">
                    <input value={input} onChange={(e) => setInput(e.target.value)}/>
                    <button onClick={search}>search</button>
                </div>
                <div className="logo" onClick={() => setCartDisplay('block')}>cart</div>
            </div>

            <div className="search">
                {array.map((el, i) => (
                    <div key={i}>
                        <a
                            {...console.log('#products'+el.id)}
                            href={'#product'+el.id} // sistema
                            onClick={() => {
                                setArray([])
                                setInput('')
                            }}
                        >{el.title+' - '+el.brand}</a>
                    </div>
                ))}
            </div>

            <div className="cart" style={{display: cartDisplay}}>

                <div className="cartOut" onClick={() => setCartDisplay('none')}>Close</div>

                <div className="cartProducts">
                    {cart.map((el, i) => (
                        <div key={i}>

                            <div className="delete">
                                <div onClick={() => {
                                    let arr = [...cart]
                                    arr.splice(i, 1)
                                    setCart(arr)
                                }}>X</div>
    
                                <div className="cartImg">
                                    <img src={el.thumbnail} alt="img" />
                                </div>
                            </div>
        
                            <div className="productInformations">
                                <div className="productTitle">
                                    <span>{el.title} - </span>
                                    <span>{el.brand}</span>
                                </div>
                                {/* <div className="productDescription">{el.description}</div> */}
                                <div className="productRate">rated: {el.rating} on 5</div>
                                <div>
                                    price: <span>{el.price}$</span> - <span>{el.discountPercentage}%</span> scount
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lastDiv">
                    <div className="total">Totale: {cart.reduce((acc, curr) => acc + curr.price, 0)}$</div>
                    <div className="addToCart">Procedi all'aquisto</div>
                </div>

            </div>
        </>
    )
}