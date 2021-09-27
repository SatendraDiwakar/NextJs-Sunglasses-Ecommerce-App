import React, { useReducer } from 'react'
import Cookies from 'js-cookie';
// Actions
import {
  addToCart,
  removeFromCart,
  incQuantity,
  decQuantity,
  userLogin,
  userLogout,
  saveShippingAddress,
  savePaymentMethod,
} from '../Actions';

export const StoreCtx = React.createContext();

// function which returns available stock of item
async function checkStock(id) {
  const response = await fetch(`/api/products/${id}`);
  const data = await response.json();
  return data.countInStock;
}

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {},
    payMethod: Cookies.get('paymentMethod')
      ? JSON.parse(Cookies.get('paymentMethod'))
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
}

function reducer(state, action) {
  let cartItems;
  switch (action.type) {
    case addToCart():
      let existItemIndex = state.cart.cartItems.findIndex(itm => itm.prodId === action.payload.prodId);
      if (existItemIndex !== -1) {
        const updatedCart = {
          ...state.cart.cartItems[existItemIndex],
          prodQuantity: state.cart.cartItems[existItemIndex].prodQuantity + 1
        }
        cartItems = state.cart.cartItems.map(itm => {
          if (itm.prodId === state.cart.cartItems[existItemIndex].prodId) {
            return updatedCart;
          }
          return itm;
        });
      } else {
        cartItems = [...state.cart.cartItems, action.payload];
      }
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case removeFromCart():
      let filteredItems = state.cart.cartItems.filter((itm) => {
        return itm.prodId !== action.payload.id;
      });
      Cookies.set('cartItems', JSON.stringify(filteredItems));
      return { ...state, cart: { ...state.cart, cartItems: filteredItems } };
    case incQuantity():
      cartItems = state.cart.cartItems.map((itm, index) => {
        if (itm.prodId === action.payload.id) {
          return { ...itm, prodQuantity: state.cart.cartItems[index].prodQuantity + 1 }
        }
        return itm;
      })
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case decQuantity():
      let itmIndex = state.cart.cartItems.findIndex(itm => itm.prodId === action.payload.id);
      if (state.cart.cartItems[itmIndex].prodQuantity > 1) {
        cartItems = state.cart.cartItems.map((itm, index) => {
          if (itm.prodId === action.payload.id) {
            return { ...itm, prodQuantity: state.cart.cartItems[index].prodQuantity - 1 }
          }
          return itm;
        })
      } else {
        cartItems = state.cart.cartItems.filter((itm) => {
          return itm.prodId !== action.payload.id;
        })
      }
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case userLogin():
      Cookies.set('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    case userLogout():
      Cookies.remove('userInfo');
      return { ...state, userInfo: null };
    case saveShippingAddress():
      Cookies.set('shippingAddress', JSON.stringify(action.payload));
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload
          }
        }
      };
    case savePaymentMethod():
      Cookies.set('paymentMethod', JSON.stringify(action.payload));
      return {
        ...state,
        cart: {
          ...state.cart,
          payMethod: action.payload
        }
      };
    default:
      return state;
  }
}


export default function StoreProvider(props) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch, checkStock }
  // console.log(state.cart.cartItems);
  return (
    <StoreCtx.Provider value={value}>
      {props.children}
    </StoreCtx.Provider>
  );
}
