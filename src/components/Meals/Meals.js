import React, { useContext, useEffect } from 'react';
import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';
import mealsImage from '../../assets/images/banner.jpg';
import classes from '../Layout/Header.module.css';
import CartContext from '../../store/cart-context';


const Meals = () => {
    return (
        <>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A Delicious Food Table' />
            </div>
            <div className='ui container'>
                <MealsSummary />
                <AvailableMeals />
            </div>
        </>
    )
}

export default Meals;