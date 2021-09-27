import React from 'react'
// component
import ShipComp from '../Components/main/ShipComp';
import CheckoutWiz from '../Components/main/CheckOutWiz';

export default function Shipping() {
    return (<>
        <CheckoutWiz activeStep={1} />
        <ShipComp />
    </>)
}