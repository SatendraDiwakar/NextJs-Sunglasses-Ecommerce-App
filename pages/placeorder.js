import React, { useContext, useEffect } from 'react'
// context
import { LoaderCtx } from '../Components/ui/LoaderCtx';
// component
import PlaceOrderComp from '../Components/main/PlaceOrderComp'
import CheckoutWiz from '../Components/main/CheckOutWiz'

export default function PlaceOrder() {

    // context
    const { loaded } = useContext(LoaderCtx);

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    return (
        <>
            <CheckoutWiz activeStep={3} />
            <PlaceOrderComp />
        </>
    )
}
