//import React from 'react'
import React, { useContext,useState,useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'
import Title from './Title'
import QuantityBtn from './QuantityBtn';
import { CartContext } from './CartContext';

export default function ProductDetail() {
  let [product,setProduct] = useState({});
  let [productList,setProductList] = useState([]);
  const {cartItems,setCartItems} = useContext(CartContext);

  let params = useParams();
  useEffect(()=>{
    console.log('fetch')
    fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
    .then(response => response.json())
    .then((data)=>{
      // console.log('data')
      setProductList(data)
      // console.log(data)
      let productIndexInCart = data.findIndex((element)=>{
          // console.log(element.id+' === '+params.id)
          return element.id == params.id
      })      
      // console.log('productIndexInCart '+productIndexInCart)
      product = data[productIndexInCart]
      // console.log('product')
      // console.log(product)
      setProduct(product)
    })
  },[])

  //let product = {}
  //let product = cartItems[params.id]

  return (
    <div>
    <Title mainTitle={"ProductDetail #"+params.id} />
      {product == {} &&
        <div className="productBorder">
        Loading...
        </div>
      }
      {product != {} &&
        <div className="productBorder" key={product.id}>
        {product.name}<br/>
                  {product.price}<br/>
                  {product.image}<br/>
                  {product.description}<br/>

        <QuantityBtn  productInfo={product} />
        </div>
      }
      <Link to="/">back to main</Link>  
    </div>
  )
}
