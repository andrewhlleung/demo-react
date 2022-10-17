import React, { useState } from 'react';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import { CartContext } from './CartContext';

function App() {
  const [cartItems,setCartItems] = useState([]);
  return (
    <BrowserRouter>
    <CartContext.Provider value={{cartItems,setCartItems}}>
      <Link to="/" >mainpage</Link>
      <Link to="/checkout" >checkout</Link>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/product" element={<ProductDetail/>} >
          <Route path=":id" element={<ProductDetail/>} />
        </Route>
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="*" element={<p>no this page</p>} />
      </Routes>
    </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
