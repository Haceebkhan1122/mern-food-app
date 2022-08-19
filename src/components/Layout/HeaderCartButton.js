import React, { useState } from 'react';
import './HeaderCartButton.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';


const HeaderCartButton = (props) => {
    const myCartContext = useContext(CartContext);
    const { signout } = useContext(CartContext);

    let user = localStorage.getItem('user');
    const numberOfCartItems = myCartContext.items.reduce((prev, curr) => prev + curr.amount, 0);

    const handleLogout = (e, data) => {
        e.preventDefault();
        signout(data)
        console.log(data)

    }

    return (
        <div className='inline'>
            {user && <button className='ui secondary button' onClick={handleLogout}>Logout</button>}
            <button className='ui button' onClick={props.onClick}>
                <span><i class="cart arrow down icon"></i></span>
                <span>{props.text}</span>
                <span className='count'>{numberOfCartItems}</span>
            </button>
        </div>
    )
}

export default HeaderCartButton