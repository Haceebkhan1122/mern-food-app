import { useContext } from 'react';
import React from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';



const MealItem = (props) => {

    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    }
    return (
        <>
            <li className="meal">
                <div className='whole_controller'>
                    <h3>{props.name}</h3>
                    <div className='description'>{props.description}</div>
                    <h4 className='price'>{price}</h4>
                </div>
                <div className='whole_controller two'>
                    <MealItemForm onAddToCart={addToCartHandler} />
                </div>
            </li>
        </>
    )
}

export default MealItem