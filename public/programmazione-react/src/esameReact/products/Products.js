import './products.css'

export default function Products({products, cart, setCart}) {

    return (
        <div className="productsPage">
            {products.map((el, i) => (
                <Product
                    id={'product'+el.id} // sistema
                    el={el}
                    cart={cart}
                    setCart={setCart}
                    products={products}
                    i={i} // purtroppo non posso passare la key come prop
                    key={i}
                />
            ))}
        </div>
    )
}

function Product({el, cart, setCart, products, i}) {
    return (
        <div className="product">

            <div>
                <div className="containerImg">
                    <img className="productImg" src={el.thumbnail} alt="img" />
                </div>
    
                <div className="productInformations">
                    <div className="productTitle">
                        <span>{el.title} - </span>
                        <span>{el.brand}</span>
                    </div>
                    <div className="productDescription">{el.description}</div>
                    <div className="productRate">rated: {el.rating} on 5</div>
                    <div>
                        price: <span>{el.price}$</span> - <span>{el.discountPercentage}%</span> scount
                    </div>
                </div>
            </div>

            <button
                className="addToCart"
                onClick={() => {
                    let array = [...cart]
                    array.push(products[i])
                    setCart(array)
                }}
            >Aggiungi al carrello</button>

        </div>
    )
}