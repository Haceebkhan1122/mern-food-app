import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  user: null,
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "SIGNIN") {
    localStorage.setItem("user", JSON.stringify(action.payload));
    return { ...state, user: action.payload };
  }
  if (action.type === "SIGNOUT") {
    localStorage.removeItem("user");
    return { ...state, user: action.payload };
  }

  if (action.type === "ADD") {
    //const updatedItems = state.item.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price;
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.item[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.item];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.item.concat(action.item);
    }

    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.item[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount < 2) {
      console.log(existingItem.amount, "existingItem amount here");
      updatedItems = state.item.filter((item) => item.id !== action.id);
    } else if (existingItem) {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.item];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      const updatedItems = [...state.item];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      item: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return state;
};

const CartProvider = (props) => {
  const user = localStorage.getItem("user");
  defaultCartState.user = user;

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const signinUser = (data) => {
    dispatchCartAction({
      type: "SIGNIN",
      payload: data,
    });
  };

  const signOut = (data) => {
    dispatchCartAction({
      type: "SIGNOUT",
      payload: data,
    });
  };

  const cartContext = {
    user: cartState.user,
    items: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemFromCart,
    signin: signinUser,
    signout: signOut,
  };

  return (
    <>
      <CartContext.Provider value={cartContext}>
        {props.children}
      </CartContext.Provider>
    </>
  );
};

export default CartProvider;
