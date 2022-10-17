import React, { useContext,useState } from 'react'
import { CartContext } from './CartContext';

export default function QuantityBtn({productInfo}) {

    const {cartItems,setCartItems} = useContext(CartContext);

    let productIndexInCart = cartItems.findIndex((element)=>{
        return element.id === productInfo.id
    })

    let [numInCart,setNumInCart] = useState(
        (productIndexInCart===-1)?0:cartItems[productIndexInCart].quantity
    );

    const handleAdd = ()=>{
        if(numInCart===0){
            productInfo.quantity=1
            setCartItems([
                productInfo
                ,...cartItems
                ])
        }else{
            let newCartItems = [...cartItems]
            // let newCartItems = cartItems
            newCartItems[productIndexInCart].quantity++
            setCartItems(newCartItems)
        }
        setNumInCart(numInCart+1)
    }
    const handleSubtract = ()=>{
        if(cartItems[productIndexInCart].quantity===1){
            let newCartItems = [...cartItems]
            // let newCartItems = cartItems
            //newCartItems[productIndexInCart].quantity--
            newCartItems.splice(productIndexInCart,1)
            setCartItems(newCartItems)
            console.log('1 '+productIndexInCart)
        }else{
            let newCartItems = [...cartItems]
            // let newCartItems = cartItems
            newCartItems[productIndexInCart].quantity--
            setCartItems(newCartItems)
            console.log('2 '+productIndexInCart)
        }
    
        setNumInCart(numInCart-1)
    }
  return (
    <div>
    {
        (numInCart===0) ?
        <div onClick={handleAdd}>add {productInfo.name} to cart</div>
        :
        <div>
            <span onClick={handleSubtract}>-</span>
            {numInCart}
            <span onClick={handleAdd}>+</span>
        </div>
    }
    </div>
  )
}
