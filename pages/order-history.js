import React, { useContext, useEffect, useReducer } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
// context
import { StoreCtx } from '../utils/Store'
// router
import { useRouter } from 'next/router';
// style
import OrderHistoryStyle from '../Components/main/OrderHistory/OrderHistory.module.css'
import Card from '../Components/ui/Card';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

function OrderHistory() {

    // context
    const { state: { userInfo } } = useContext(StoreCtx);
    const router = useRouter();

    // reducer
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
    });

    useEffect(() => {
        if (!userInfo) {
            router.push('/login')
        } else {
            const fetchOrders = async () => {
                try {
                    dispatch({ type: 'FETCH_REQUEST' });
                    const response = await fetch(`/api/orders/history`, {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    });
                    const resData = await response.json();
                    dispatch({ type: 'FETCH_SUCCESS', payload: resData });
                } catch (err) {
                    dispatch({ type: 'FETCH_FAIL', payload: err });
                }
            };
            fetchOrders();
        }
    }, [userInfo])


    return (<>
        {
            loading ? <p>load</p>
                : error !== '' ? <p>{error}</p>
                    :
                    <>
                        <div className={OrderHistoryStyle.container}>
                            {/* <div className={OrderHistoryStyle.left}>
                            </div> */}
                            <div className={OrderHistoryStyle.right}>
                                <Card title='Order History'>

                                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '1rem' }}>
                                        <colgroup>
                                            <col className={OrderHistoryStyle.tableIdCol} />
                                            <col className={OrderHistoryStyle.tableDtCol} />
                                            <col className={OrderHistoryStyle.tablePrCol} />
                                            <col className={OrderHistoryStyle.tablePdCol} />
                                            <col className={OrderHistoryStyle.tableDlCol} />
                                            <col className={OrderHistoryStyle.tableAcCol} />
                                        </colgroup>
                                        <thead style={{ textAlign: 'left', fontSize: '1.8rem' }}>
                                            <tr>
                                                <th>ID</th>
                                                <th>DATE</th>
                                                <th>TOTAL</th>
                                                <th>PAID</th>
                                                <th>DELIVERED</th>
                                                <th style={{textAlign: 'center'}}>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ fontSize: '1.5rem' }}>
                                            {
                                                orders.map(order => {
                                                    return <tr key={order._id}>
                                                        <td>{order._id.substring(20, 24)}</td>
                                                        <td>{order.createdAt}</td>
                                                        <td>${order.totalPrice}</td>
                                                        <td>{order.isPaid ? 'paid' : 'not Paid'}</td>
                                                        <td>{order.isDelivered ? 'delivered' : 'not delivered'}</td>
                                                        <td className={OrderHistoryStyle.tableAcCol}>
                                                            <Link href={`/order/${order._id}`}>Details</Link>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </Card>
                            </div>
                        </div>
                    </>
        }
    </>)
}
export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });