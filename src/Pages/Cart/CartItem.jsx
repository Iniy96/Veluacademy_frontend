import React, { useContext } from 'react'
import { AiFillDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { ShopContext } from '../../context-API/ShopContext';


export const CartItem = (props) => {
    const { id, bookName, originalPrice, discountedPrice , productImage } = props.data;

    const { addtoCart, removefromCart, deleteFromCart, cartItems } = useContext(ShopContext)


    return (
        <>
            {/* <!-- Single item --> */}
            <div className="row">
                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    {/* <!-- Image --> */}
                    <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                        <img src={productImage}
                            className="w-100" alt="Blue Jeans Jacket" />
                    </div>
                    {/* <!-- Image --> */}
                </div>

                <div className="col-lg-5 col-md-5 col-6 mb-4 mb-lg-0">
                    {/* <!-- Data --> */}
                    <p><strong> {bookName} </strong></p>
                    <p>Rs. {discountedPrice} /unit</p>
                    <button type="button" className="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                        title="Remove item" onClick={()=>deleteFromCart(id)}>
                        <AiFillDelete size={"1.5rem"} />
                    </button>

                    {/* <!-- Data --> */}
                </div>

                <div className="col-lg-4 col-md-5 col-6 mb-4 mb-lg-0">
                    {/* <!-- Quantity --> */}
                    <div className="d-flex mb-4 gap-3" style={{ maxWidth: "300px" }}>
                        <button className="btn btn-secondary" onClick={()=>removefromCart(id)}>
                            <AiOutlineMinus />
                        </button>

                        <div className="form-outline">
                            <input id="form1" min="0" name="quantity" type="number" value={cartItems[id]} className="form-control text-center" readOnly />
                        </div>

                        <button className="btn btn-secondary" onClick={()=>addtoCart(id)}>
                            <AiOutlinePlus />
                        </button>
                    </div>
                    {/* <!-- Quantity --> */}

                    {/* <!-- Price --> */}
                    <p className="text-start text-md-center">
                        <strong>Rs. {cartItems[id] * discountedPrice}</strong>
                    </p>
                    {/* <!-- Price --> */}
                </div>
            </div>
            {/* <!-- Single item --> */}
            <hr className="my-4" />

        </>
    )
}
