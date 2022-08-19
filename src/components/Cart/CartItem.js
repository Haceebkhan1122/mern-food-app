import React from 'react';


const CartItem = (props) => {
    const price = `$${props.price}`


    return (
        <li className='hk_single_item'>
            <div className='for_inline'>
                <h2>{props.name}</h2>
                <div className='summary'>
                    <span className='price'>{price}</span>
                    <span className="amount">x {props.amount}</span>
                </div>
            </div>
            <div className='for_inline actions'>
                <button class="ui secondary button" onClick={props.onRemove}>-</button>
                <button class="ui button" onClick={props.onAdd}>+</button>
            </div>
        </li>
    )
}

export default CartItem;