import React, { useContext } from 'react'
import { PRODUCTS } from '../../utilities/products'
import { ShopContext } from '../../context-API/ShopContext'
import { Link } from 'react-router-dom'

export const Shop = () => {
    const { addtoCart, removefromCart, cartItems } = useContext(ShopContext)

    return (
        <>
            <h3 className='pt-3 pb-2 text-center' id='shop'>OUR BOOKS</h3>
            <div className='d-flex flex-row px-2 justify-content-center gap-5'>
                {
                    PRODUCTS.map((product) => {
                        return (
                            <div className="card border-0" style={{ width: "15rem" }} key={product.id}>
                                <img src={product.productImage} className="card-img-top  rounded" alt="..." />
                                <div className="card-body p-1">
                                    <h5 className="card-title">{product.bookName} </h5>
                                    <p className="card-text bold"><b>Rs. {product.discountedPrice} </b> &nbsp; <small><s>Rs. {product.originalPrice}</s></small> </p>
                                    <div className='d-flex flex-column gap-1'>
                                        <Link to={"/cartPage"} className="btn btn-primary flex-grow-1" onClick={() => addtoCart(product.id)}>Buy Now</Link>
                                        {cartItems[product.id] > 0
                                            ? (<button className="btn btn-dark" onClick={() => removefromCart(product.id)}>
                                                Remove from Cart
                                            </button>)
                                            : (<button className="btn btn-dark" onClick={() => addtoCart(product.id)}>
                                                Add to Cart
                                            </button>)}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
