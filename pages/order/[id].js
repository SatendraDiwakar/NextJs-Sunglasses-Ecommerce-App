import React from 'react'
// component
import OrderSummaryComp from '../../Components/main/OrderSummaryComp';

export default function OrderSummary({ params }) {
    return (
        <>
            <OrderSummaryComp orderId={params.id} />
        </>
    )
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}