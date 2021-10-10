import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
// context
import { StoreCtx } from '../../../utils/Store'
import { clearCart } from '../../../utils/Actions';
import { LoaderCtx } from '../../ui/LoaderCtx';
// component
import Card from '../../ui/Card';
// style
import PlaceOrderStyle from './PlaceOrderComp.module.css'

function PlaceOrderComp() {

    // router
    const router = useRouter();

    // context
    const { loading, loaded } = useContext(LoaderCtx);
    const { dispatch, state } = useContext(StoreCtx);
    const { userInfo, cart: { payMethod, shippingAddress, cartItems } } = state;
    // identifiers
    const shippingAddressValue = `${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country} `
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    const itemsPrice = round2(cartItems.reduce((total, itm) => total + itm.prodQuantity * itm.prodPrice, 0));
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.18);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    // checking if user is logged in or not
    useEffect(() => {
        if (!payMethod) {
            router.push('/payment')
        } else if (cartItems.length === 0) {
            router.push('/cart')
        } else {
            loaded();
        }
    }, []);

    // Handles placeorder
    const placeOrderHandler = async () => {
        const postData = {
            orderItems: cartItems,
            shippingAddress,
            payMethod,
            itemsPrice, taxPrice, shippingPrice,
            totalPrice,
        }

        try {
            loading();
            const response = await fetch('/api/orders', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    authorization: `Bearer ${userInfo.token}`
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(postData) // body data type must match "Content-Type" header
            });
            const resData = await response.json();
            dispatch({ type: clearCart() });
            router.push(`/order/${resData._id}`)
        } catch (error) {
            loaded();
            alert('Sorry some unknown error occured.')
        }
    }

    return (<>
        <p className={PlaceOrderStyle.title}>Place Order</p>
        <div className={PlaceOrderStyle.container}>
            <div className={PlaceOrderStyle.left}>
                <Card title='Shipping Address'>
                    <p className={PlaceOrderStyle.valueTypography}>{shippingAddressValue}</p>
                </Card>
                <Card title='Payment Method'>
                    <p className={PlaceOrderStyle.valueTypography}>{payMethod}</p>
                </Card>
                <Card title='Order Items'>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '1rem' }}>
                        <colgroup>
                            <col className={PlaceOrderStyle.tableImgCol} />
                            <col className={PlaceOrderStyle.tableNmCol} />
                            <col className={PlaceOrderStyle.tableQnCol} />
                            <col className={PlaceOrderStyle.tablePrCol} />
                        </colgroup>
                        <thead style={{ textAlign: 'left', fontSize: '1.8rem' }}>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th style={{ textAlign: 'right' }}>Quantity</th>
                                <th style={{ textAlign: 'right' }}>Price</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '1.5rem' }}>
                            {
                                cartItems.map(itm => {
                                    return <tr key={itm.prodId}>
                                        <td className={PlaceOrderStyle.tdImg}>
                                            <Image
                                                src={itm.prodImage}
                                                alt={`sunglass image`}
                                                width={80}
                                                height={55}
                                            />
                                        </td>
                                        <td>{itm.prodName}</td>
                                        <td style={{ textAlign: 'right' }}>{itm.prodQuantity}</td>
                                        <td style={{ textAlign: 'right' }}>${itm.prodPrice * itm.prodQuantity}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </Card>
            </div>
            <div className={PlaceOrderStyle.right}>
                <Card title='Order Summary'>
                    <div className={PlaceOrderStyle.subTotalContainer}>
                        <div className={PlaceOrderStyle.priceDetail}>
                            <p>Items</p>
                            <p>${itemsPrice}</p>
                        </div>
                        <div className={PlaceOrderStyle.priceDetail}>
                            <p>Tax</p>
                            <p>${taxPrice}</p>
                        </div>
                        <div className={PlaceOrderStyle.priceDetail}>
                            <p>Shipping</p>
                            <p>${shippingPrice}</p>
                        </div>
                        <div className={PlaceOrderStyle.priceDetail} style={{
                            borderRadius: '10px',
                            border: '1px solid #da5252',
                            padding: '.5rem 1rem'
                        }}>
                            <h3>Total</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <button
                            className={PlaceOrderStyle.btnPlaceOrder}
                            onClick={placeOrderHandler}
                        >Place Order</button>
                    </div>
                </Card>
            </div>
        </div>
    </>)
}
export default dynamic(() => Promise.resolve(PlaceOrderComp), { ssr: false });