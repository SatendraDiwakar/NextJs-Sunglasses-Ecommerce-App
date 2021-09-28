import React from 'react'
// component
import PlaceOrderComp from '../Components/main/PlaceOrderComp'
import CheckoutWiz from '../Components/main/CheckOutWiz'

export default function PlaceOrder() {
    return (
        <>
            <CheckoutWiz activeStep={3} />
            <PlaceOrderComp />
        </>
    )
}
