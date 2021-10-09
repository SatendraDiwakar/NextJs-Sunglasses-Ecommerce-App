import dynamic from 'next/dynamic';
import React, { useContext, useEffect } from 'react'
// context
import { StoreCtx } from '../utils/Store';
import { LoaderCtx } from '../Components/ui/LoaderCtx';
// component
import ShoppingCart from '../Components/main/ShoppingCart'
import ButtonBlack from '../Components/ui/ButtonBlack'

function Cart() {

    // context
    const { state: { cart: { cartItems } } } = useContext(StoreCtx);
    const { loaded } = useContext(LoaderCtx);

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    if (cartItems.length === 0) {
        return <div
            style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '2.5rem',
                letterSpacing: '.5px',                
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)'
            }}>
            <p>Cart is empty.</p>
            <ButtonBlack name="Shop Now" clk={'/shop/sunglasses'} />
        </div>
    }

    return (
        <>
            <ShoppingCart />
        </>
    )
}
export default dynamic(() => Promise.resolve(Cart), { ssr: false });