import React, { useContext, useEffect, useState } from 'react';
import Header from './components/Layout/Header';
import './App.css';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Checkout from './components/checkout/Checkout';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import CartContext from './store/cart-context';


function App() {

  const [cartIsShown, setCartIsShown] = useState(false);
  const { user } = useContext(CartContext)
  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }



  return (
    <>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShownCart={showCartHandler} />

      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Navigate to="/meals" /> : <Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/meals" element={user ? <Meals /> : <Navigate to="/" />} />
          <Route exact path="/checkout" element={user ? <Checkout /> : <Navigate to="/meals" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App