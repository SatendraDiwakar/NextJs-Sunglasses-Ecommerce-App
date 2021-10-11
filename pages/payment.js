import React, { useContext, useEffect } from 'react'
// context
import { LoaderCtx } from '../Components/ui/LoaderCtx';
// component
import PaymentComp from '../Components/main/PaymentComp'
import CheckoutWiz from '../Components/main/CheckoutWiz'

export default function Payment() {

    // context
    const { loaded } = useContext(LoaderCtx);

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    return (
        <>
            <CheckoutWiz activeStep={2} />
            <PaymentComp />
        </>
    )
}
