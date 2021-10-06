import React, { useContext, useEffect, useReducer } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
// paypal
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
// context
import { StoreCtx } from '../../../utils/Store'
import { NotifyCtx } from '../../../utils/NotifyCtx'
import { LoaderCtx } from '../../ui/LoaderCtx'
// style
import OrderSummaryStyle from './OrderSummaryComp.module.css'
// components
import Card from '../../ui/Card';
import Notification from '../../ui/Notification'
import Loader2 from '../../ui/Loader2'

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
        default:
            state;
    }
}

function OrderSummaryComp({ orderId }) {

    // reducer
    const [
        { loading, error, order, successPay },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });
    // paypal reducer
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const {
        shippingAddress,
        payMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
    } = order;
    // router
    const router = useRouter();
    // context
    const { state: { userInfo } } = useContext(StoreCtx);
    const { showNotification, message, show } = useContext(NotifyCtx);
    const { loaded } = useContext(LoaderCtx);

    useEffect(() => {
        if (!loading)
            loaded();
    }, [loading])

    // checking if user is logged in or not
    useEffect(() => {
        if (!userInfo) {
            router.push('/login')
        } else {
            const fetchOrder = async () => {
                try {
                    dispatch({ type: 'FETCH_REQUEST' });
                    const response = await fetch(`/api/orders/${orderId}`, {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    });
                    const resData = await response.json();
                    dispatch({ type: 'FETCH_SUCCESS', payload: resData });
                } catch (err) {
                    dispatch({ type: 'FETCH_FAIL', payload: 'Order not found' });
                }
            };
            if (
                !order._id || successPay ||
                (order._id && order._id !== orderId)
            ) {
                fetchOrder();
                if (successPay) {
                    dispatch({ type: 'PAY_RESET' });
                }
            } else {
                const loadPaypalScript = async () => {
                    const response = await fetch('/api/keys/paypal', {
                        headers: { authorization: `Bearer ${userInfo.token}` }
                    });
                    const clientId = await response.text();

                    paypalDispatch({
                        type: 'resetOptions',
                        value: {
                            'client-id': clientId,
                            currency: 'USD',
                        },
                    });
                    paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
                }
                loadPaypalScript();
            }
        }
    }, [order, successPay, userInfo]);

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' });
                const response = await fetch(`/api/orders/${order._id}/pay`,
                    {
                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
                        body: JSON.stringify(details) // body data type must match "Content-Type" header
                    }
                );
                const resData = await response.json();
                dispatch({ type: 'PAY_SUCCESS', payload: resData });
                show('Order is Paid', 'success')
            } catch (err) {
                dispatch({ type: 'PAY_FAIL', payload: 'Payment Failed' });
                show('Payment Failed', 'error');
            }
        });
    }

    function onError(err) {
        show(err.response.data.message, 'error')
    }

    return (<>
        {
            loading || error !== '' ?
                <div
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '2.5rem',
                        letterSpacing: '.5px',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)'
                    }}>{error}</div>
                :
                <>
                    {
                        showNotification &&
                        <Notification message={message} />
                    }
                    <p className={OrderSummaryStyle.title}>{`Order ${order._id}`}</p>
                    <div className={OrderSummaryStyle.container}>
                        <div className={OrderSummaryStyle.left}>
                            <Card title='Shipping Address'>
                                <p className={OrderSummaryStyle.valueTypography}>{
                                    `${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`
                                }</p>
                                <p
                                    className={OrderSummaryStyle.valueTypography + ' ' + OrderSummaryStyle.status}
                                    style={{ borderColor: isDelivered && '#00ff2b' }}
                                >Status:
                                    {isDelivered
                                        ? ` delivered at ${'deliveredAt'}`
                                        : ' not delivered'}
                                </p>
                            </Card>
                            <Card title='Payment Method'>
                                <p className={OrderSummaryStyle.valueTypography}>{payMethod}</p>
                                <p
                                    className={OrderSummaryStyle.valueTypography + ' ' + OrderSummaryStyle.status}
                                    style={{ borderColor: isPaid && '#00ff2b' }}
                                >Status: {isPaid ? `paid at ${paidAt}` : 'not paid'}</p>
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
                                                return <tr key={itm._id}>
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
                                    <div
                                        className={OrderSummaryStyle.paypalBtn}
                                        style={{ padding: isPending && '1.5rem 0' }}
                                    >
                                        {
                                            !isPaid && (
                                                isPending ? <Loader2 /> :
                                                    <div style={{ width: '100%' }}>
                                                        <PayPalButtons
                                                            createOrder={createOrder}
                                                            onApprove={onApprove}
                                                            onError={onError}
                                                        />
                                                    </div>
                                            )
                                        }
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
