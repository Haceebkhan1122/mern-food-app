import React from 'react';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';


const Cart = (props) => {

    const myContextCart = useContext(CartContext);

    const hasItems = myContextCart.items.length > 0;

    const totalAmount = `$${myContextCart.totalAmount.toFixed(2)}`

    const cartItemRemoveHandler = (id) => {
        myContextCart.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        myContextCart.addItem(item)
    }

    const cartItems = (
        <ul>
            {myContextCart.items.map((item) =>
            (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            )
            )}
        </ul>
    )
    const goForCheckout = (e) => {
        e.preventDefault();

    }

    return (
        <div className='hk_main_modal'>
            <Modal className="hk_modal">
                <span className='title'>{cartItems}</span>
                <div className='total'>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className='actions'>
                    {hasItems && <button class="ui secondary button" onClick={goForCheckout}>Order</button>}
                    <button class="ui button" onClick={props.onHideCart}>Back to Shop</button>
                </div>
            </Modal>
        </div>
    )
}

export default Cart