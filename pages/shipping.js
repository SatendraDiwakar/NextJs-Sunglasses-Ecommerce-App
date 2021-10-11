import React, { useContext, useEffect } from 'react'
// context
import { LoaderCtx } from '../Components/ui/LoaderCtx';
// component
import ShipComp from '../Components/main/ShipComp';
import CheckoutWiz from '../Components/main/CheckoutWiz';

export default function Shipping() {

    // context
    const { loaded } = useContext(LoaderCtx);

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    return (<>
        <CheckoutWiz activeStep={1} />
        <ShipComp />
    </>)
}