import React from 'react';

const CartContext = React.createContext({
    user: null,
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    signin: (user) => { },
    signout: (user) => { }
});

export default CartContext;