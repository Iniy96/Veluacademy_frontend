import React, { useContext } from 'react'
import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { CartItem } from './CartItem'
import { ShopContext } from '../../context-API/ShopContext'
import { PRODUCTS } from '../../utilities/products'

export const CartPage = () => {

    const { addtoCart, removefromCart, cartItems,totalAmountCalc,totalProductCalc } = useContext(ShopContext)

    return (
        <>
            <section className="h-100 " style={{ backgroundColor: "#9A616D" }}>
                <div className="container py-3">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - {totalProductCalc()} items</h5>
                                </div>
                                <div className="card-body">
                                    {PRODUCTS.map((product) => {
                                        if (cartItems[product.id] !== 0) {
                                            return <CartItem data={product} key={product.id} />;
                                        }
                                    })}
                                    
                                </div>
                            </div>
                            {/* <div className="card">
                                <div className="card-body">
                                    <p><strong>Expected shipping delivery</strong></p>
                                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products
                                            <span>Rs. {totalAmountCalc()}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span>Rs. 100</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including VAT)</p>
                                                </strong>
                                            </div>
                                            <span><strong>Rs.  {totalAmountCalc() + 100}</strong></span>
                                        </li>
                                    </ul>

                                    <button type="button" className="btn btn-dark btn-lg btn-block">
                                        Go to checkout
                                    </button>
                                </div>
                            </div>
                            <div className="card mt-4 mb-lg-0">
                                <div className="card-body">
                                    <p><strong>We accept</strong></p>
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                        alt="Visa" />
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                        alt="American Express" />
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                        alt="Mastercard" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
