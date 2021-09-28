import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
// context
import { StoreCtx } from '../../../utils/Store'
// component
import Card from '../../ui/Card';
// style
import PlaceOrderStyle from './PlaceOrderComp.module.css'

export default function PlaceOrderComp() {
    // router
    const router = useRouter();

    // context
    const { dispatch, state } = useContext(StoreCtx);
    const { userInfo, cart: { payMethod, shippingAddress, cartItems } } = state;

    const shippingAddressValue = `${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country} `

    // checking if user is logged in or not
    useEffect(() => {
        if (!payMethod) {
            router.push('/payment')
        }
        if (cartItems.length === 0) {
            router.push('/cart')
        }
    }, [])

    return (
        <div className={PlaceOrderStyle.container}>
            <div className={PlaceOrderStyle.left}>
                <Card title='Shipping Address'>
                    <p className={PlaceOrderStyle.valueTypography}>{shippingAddressValue}</p>
                </Card>
                <Card title='Payment Method'>
                    <p className={PlaceOrderStyle.valueTypography}>{payMethod}</p>
                </Card>
                <Card title='Order Items'>
                    <table style={{width:'100%', borderCollapse: 'separate', borderSpacing: '1rem'}}>
                        <colgroup>
                            <col className={PlaceOrderStyle.tableImgCol} />
                            <col className={PlaceOrderStyle.tableNmCol} />
                            <col className={PlaceOrderStyle.tableQnCol} />
                            <col className={PlaceOrderStyle.tablePrCol} />
                        </colgroup>
                        <thead style={{textAlign: 'left', fontSize: '1.8rem'}}>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th style={{textAlign: 'right'}}>Quantity</th>
                                <th style={{textAlign: 'right'}}>Price</th>
                            </tr>
                        </thead>
                        <tbody style={{fontSize: '1.5rem'}}>
                            {
                                cartItems.map(itm=>{
                                    return <tr>
                                        <td className={PlaceOrderStyle.tdImg}>
                                            <Image 
                                                src={itm.prodImage}
                                                alt={`sunglass image`}
                                                width={80}
                                                height={55}
                                            />    
                                        </td>
                                        <td>{itm.prodName}</td>
                                        <td style={{textAlign: 'right'}}>{itm.prodQuantity}</td>
                                        <td style={{textAlign: 'right'}}>${itm.prodPrice}</td>
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
                            <p>Itmes</p>
                            <p>$99</p>
                        </div>
                        <div className={PlaceOrderStyle.priceDetail}>
                            <p>Tax</p>
                            <p>$99</p>
                        </div>
                        <div className={PlaceOrderStyle.priceDetail}>
                            <p>Shipping</p>
                            <p>$99</p>
                        </div>
                        <div className={PlaceOrderStyle.priceDetail} style={{
                            borderRadius: '10px',
                            border: '1px solid #da5252',
                            padding: '.5rem 1rem'
                        }}>
                            <h3>Total</h3>
                            <h3>$297</h3>
                        </div>
                        <button
                            className={PlaceOrderStyle.btnPlaceOrder}
                        >Place Order</button>
                    </div>
                </Card>
            </div>

        </div>
    )
}
