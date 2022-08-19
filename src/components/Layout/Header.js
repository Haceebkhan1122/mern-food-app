import React, { useEffect, useState } from 'react';
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';


const Header = (props) => {

    return (
        <>
            <header className={classes.header}>
                <h1>FoodyTime</h1>
                <HeaderCartButton text="Your Cart" onClick={props.onShownCart} />
            </header>
        </>
    )
}

export default Header;