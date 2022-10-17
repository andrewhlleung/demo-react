import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import ProductList from './ProductList'
import Title from './Title'
import QuantityBtn from './QuantityBtn';
import { CartContext } from './CartContext';

export default function Checkout() {
  const {cartItems,setCartItems} = useContext(CartContext);
  /*
  let cartItem ={"cartItems":[
          {"quantity" : 1,"id" : 1,"name" : "蘋果", "price" : 5, "image" : "apple.jpg","description":"新鮮蘋果50克，一日一蘋果，醫生遠離我"},
          {"quantity" : 1,"id" : 2,"name" : "橙", "price" : 3, "image" : "orange.jpg","description":"新鮮橙50克，又甜又好吃"},
          {"quantity" : 2,"id" : 3,"name" : "芒果", "price" : 4, "image" : "mango.jpg","description":"新鮮芒500克，宜做甜品"}
      ]}
  let {cartItems} = cartItem
  */
  let cartEmpty = cartItems.length<=0 ? true:false
  let grandTotal = cartItems.reduce((total,product)=>{
    return total+=product.price*product.quantity
  },0)
  const freeShippingPrice=99

  return (
    <div>
      <Title mainTitle="Checkout" />
      {
      cartEmpty
       &&
      <div>
        <div id="cartSesstion">
          <Link to="/">back to...</Link>
        </div>
      </div> 
      }
      {
      !cartEmpty
       &&
      <div>
        <div id="cartSesstion">

        {
        cartItems.map((cartItem)=>{
                      return (
                      <div className="productBorder" key={cartItem.id}>
                {cartItem.name}<br/>
                {cartItem.price}<br/>
                {cartItem.image}<br/>
                {cartItem.description}<br/>
                        {cartItem.quantity}<br/>
                        <QuantityBtn productInfo={cartItem}/>
                      </div>
                      )
                  })
        }
        </div>
      </div> 
      }
      <div>
        {
        grandTotal <= freeShippingPrice
          &&
        <div>Total:{grandTotal} (with shipping charge) 尚欠:{freeShippingPrice-grandTotal}</div>
        }
        {
        grandTotal > freeShippingPrice
          &&
        <div>Total:{grandTotal} (free shipping)</div>
        }
      </div>
    </div>
  )
}
