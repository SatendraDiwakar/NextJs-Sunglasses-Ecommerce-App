import React, { useReducer } from 'react'
// Actions
import { addToCart, removeFromCart } from '../Actions';

export const StoreCtx = React.createContext();

const initialState = {
  cart: {
    cartItems: [],
    // Cookies.get('cartItems')
    //   ? JSON.parse(Cookies.get('cartItems'))
    //   : [],
  }
}

function reducer(state, action) {
  switch (action.type) {
    case addToCart:
      let existItemIndex = state.cart.cartItems.findIndex(itm => itm._id === action.payload._id);
      if (existItemIndex !== -1) {
        const updatedCart = {
          ...state.cart.cartItems[existItemIndex],
          prodQuantity: state.cart.cartItems[existItemIndex].prodQuantity + 1
        }
        return {
          cart: {
            cartItems:
              state.cart.cartItems.map(itm => {
                if (itm._id === state.cart.cartItems[existItemIndex]._id) {
                  return updatedCart;
                }
                return itm;
              })
          }
        };
      }
      return { cart: { cartItems: [...state.cart.cartItems, action.payload] } };
    case removeFromCart:
      return state.cart.cartItems.filter((itm) => {
        return itm._id !== action.payload.id;
      });
    default:
      return state;
  }
}


export default function StoreProvider(props) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch }
  // console.log(state.cart.cartItems);
  return (
    <StoreCtx.Provider value={value}>
      {props.children}
    </StoreCtx.Provider>
  );
}
