
import React, { useEffect, useState } from 'react'
import logo from './react-logo.png'
import {Link} from 'react-router-dom'
import Title from './Title'
import QuantityBtn from './QuantityBtn';

export default function ProductList() {
  
  let [productList,setProductList] = useState([]);
  let [input,setInput] = useState("");

  useEffect(()=>{
    fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
    .then(response => response.json())
    .then((data)=>{
      setProductList(data)
    })
    console.log(productList)
  },[])

  useEffect(()=>{
    if(input.length>4){
      console.log(input)
    }
  },[input])

  return (
    <div>
      <input type="text" name="name" onChange={e=>setInput(e.target.value)}/>
      <Title mainTitle="Plesase Select" />
      
      <img src={logo} width="100px" />
      <div>{
        productList.map(product=>(
            <div className="productBorder" key={product.id}>
                <Link to={'/product/'+product.id}>{product.name}</Link><br/>
                {product.price}<br/>
                {product.image}<br/>
                {product.description}<br/>
                <QuantityBtn productInfo={product} />
            </div>
        ))
        }</div>
    </div>
  )
}
