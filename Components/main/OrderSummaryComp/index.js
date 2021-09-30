import React, { useContext, useEffect, useReducer } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
// context
import { StoreCtx } from '../../../utils/Store'
import { clearCart } from '../../../utils/Actions';
// component
import Card from '../../ui/Card';
// style
import OrderSummaryStyle from './OrderSummaryComp.module.css'

// reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false, errorPay: '' };
        case 'DELIVER_REQUEST':
            return { ...state, loadingDeliver: true };
        case 'DELIVER_SUCCESS':
            return { ...state, loadingDeliver: false, successDeliver: true };
        case 'DELIVER_FAIL':
            return { ...state, loadingDeliver: false, errorDeliver: action.payload };
        case 'DELIVER_RESET':
            return {
                ...state,
                loadingDeliver: false,
                successDeliver: false,
                errorDeliver: '',
            };
        default:
            state;
    }
}

function OrderSummaryComp({ orderId }) {

    // reducer
    const [
        { loading, error, order, successPay, loadingDeliver, successDeliver },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });
    const {
        shippingAddress,
        payMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = order;
    // router
    const router = useRouter();
    // context
    const { state: { userInfo } } = useContext(StoreCtx);
    // identifiers
    // const shippingAddressValue = `${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country} `
    // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    // checking if user is logged in or not
    useEffect(() => {
        if (!userInfo) {
            router.push('/login')
        }
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const response = await fetch(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                const resData = await response.json();
                dispatch({ type: 'FETCH_SUCCESS', payload: resData });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err });
                alert(error);
            }
        };
        if (
            !order._id ||
            (order._id && order._id !== orderId)
        ) {
            fetchOrder();
            // if (successPay) {
            //   dispatch({ type: 'PAY_RESET' });
            // }
            // if (successDeliver) {
            //   dispatch({ type: 'DELIVER_RESET' });
            // }
        }
    }, [order]);

    return (<>
        {
            loading ? <p>load</p>
                :
                <>
                    <p className={OrderSummaryStyle.title}>{`Order ${order._id}`}</p>
                    <div className={OrderSummaryStyle.container}>
                        <div className={OrderSummaryStyle.left}>
                            <Card title='Shipping Address'>
                                <p className={OrderSummaryStyle.valueTypography}>{
                                    `${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`
                                }</p>
                                <p className={OrderSummaryStyle.valueTypography + ' ' + OrderSummaryStyle.status}>Status: {successDeliver ? 'Deliverd' : 'Not Delivered'}</p>
                            </Card>
                            <Card title='Payment Method'>
                                <p className={OrderSummaryStyle.valueTypography}>{payMethod}</p>
                                <p className={OrderSummaryStyle.valueTypography + ' ' + OrderSummaryStyle.status}>Status: {successPay ? 'Paid' : 'Not Paid'}</p>
                            </Card>
                            <Card title='Order Items'>
                                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '1rem' }}>
                                    <colgroup>
                                        <col className={OrderSummaryStyle.tableImgCol} />
                                        <col className={OrderSummaryStyle.tableNmCol} />
                                        <col className={OrderSummaryStyle.tableQnCol} />
                                        <col className={OrderSummaryStyle.tablePrCol} />
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
                                            orderItems.map(itm => {
                                                return <tr key={itm.prodId}>
                                                    <td className={OrderSummaryStyle.tdImg}>
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
                        <div className={OrderSummaryStyle.right}>
                            <Card title='Order Summary'>
                                <div className={OrderSummaryStyle.subTotalContainer}>
                                    <div className={OrderSummaryStyle.priceDetail}>
                                        <p>Items</p>
                                        <p>${itemsPrice}</p>
                                    </div>
                                    <div className={OrderSummaryStyle.priceDetail}>
                                        <p>Tax</p>
                                        <p>${taxPrice}</p>
                                    </div>
                                    <div className={OrderSummaryStyle.priceDetail}>
                                        <p>Shipping</p>
                                        <p>${shippingPrice}</p>
                                    </div>
                                    <div className={OrderSummaryStyle.priceDetail} style={{
                                        borderRadius: '10px',
                                        border: '1px solid #da5252',
                                        padding: '.5rem 1rem'
                                    }}>
                                        <h3>Total</h3>
                                        <h3>${totalPrice}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </>
        }
    </>)
}
export default dynamic(() => Promise.resolve(OrderSummaryComp), { ssr: false });
