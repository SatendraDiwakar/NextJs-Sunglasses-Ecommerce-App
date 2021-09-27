import React from 'react'
// component
import PaymentComp from '../Components/main/PaymentComp'
import CheckoutWiz from '../Components/main/CheckOutWiz'

export default function Payment() {
    return (
        <>
            <CheckoutWiz activeStep={2} />
            <PaymentComp />
        </>
    )
}
