import React, { createContext,useState } from "react";
import { PRODUCTS } from "../utilities/products";

export const ShopContext = createContext(null);

const getDefaultCartItemValues = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setcartItems] = useState(getDefaultCartItemValues());

  const addtoCart = (itemID) => {
    setcartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
  };
  const removefromCart = (itemID) => {
    setcartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  };
  const deleteFromCart = (itemID) =>{
    setcartItems((prev) => ({ ...prev, [itemID]: 0 }))
  }
  
  const totalAmountCalc =()=> {
    let totalAmount = 0;
    for( let item in cartItems){
      if(cartItems[item] >0){
        let getProductInfo = PRODUCTS.find((product)=> product.id === Number(item))
        totalAmount += cartItems[item] * getProductInfo.discountedPrice
      }
    }
    return totalAmount
  }

  const totalProductCalc =()=>{
    let totalProduct = 0;
    for(let item in cartItems){
      totalProduct += cartItems[item]
    }
    return totalProduct;
  }

  const shopcontextValue = { cartItems, addtoCart, removefromCart,deleteFromCart,totalAmountCalc,totalProductCalc };

  return (
    <ShopContext.Provider value={shopcontextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
