import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
// context
import { StoreCtx } from '../../../utils/Store'
import { NotifyCtx } from '../../../utils/NotifyCtx'
import { LoaderCtx } from '../../ui/LoaderCtx';
import { savePaymentMethod } from '../../../utils/Actions'
// component
import Notification from '../../ui/Notification';
// style
import PaymentStyle from './PaymentComp.module.css'

export default function PaymentComp() {

    // router
    const router = useRouter();

    // context
    const { isLoading, loading, loaded } = useContext(LoaderCtx);
    const { dispatch, state } = useContext(StoreCtx);
    const { cart: { payMethod, shippingAddress } } = state;
    const { showNotification, message, show, hide } = useContext(NotifyCtx);

    // states
    const [paymentMethod, setPaymentMethod] = useState(payMethod || '');

    // checking if user is logged in or not
    useEffect(() => {
        if (showNotification) {
            hide();
        }
        if (!shippingAddress.address) {
            router.push('/shipping')
        } else {
            setPaymentMethod(payMethod || '');
        }
        if (paymentMethod !== '') {
            if (paymentMethod === 'Pay Cash') {
                document.getElementById('paycash').checked = true;
            } else {
                document.getElementById(paymentMethod).checked = true;
            }
        }
    }, [])


    const submitHandler = (e) => {
        e.preventDefault();
        if (showNotification) {
            hide();
        }
        if (!paymentMethod) {
            setTimeout(() => {
                show('Payment method is required', 'error')
            });
        } else {
            loading()
            dispatch({ type: savePaymentMethod(), payload: paymentMethod })
            router.push('/placeorder');
        }
    }

    // handles form's input field changes
    const handleChange = (e) => {
        if (showNotification) {
            hide();
        }
        const { id } = e.target;
        setPaymentMethod(() => {
            if (id === 'paycash')
                return 'Pay Cash'
            else
                return id
        });
    }

    return (<>
        {
            showNotification && <Notification type='error' message={message} />
        }
        <div className={PaymentStyle.container}>
            <p className={PaymentStyle.header}>Payment</p>
            <form onSubmit={submitHandler} className={PaymentStyle.paymentForm}>
                <div className={PaymentStyle.fieldContainer}>
                    <input type='radio' name="paymentMethod" id='PayPal' className={PaymentStyle.inputField} onChange={handleChange} />
                    <label htmlFor='PayPal' className={PaymentStyle.headerInput}>PayPal</label>
                </div>
                <div className={PaymentStyle.fieldContainer}>
                    <input type='radio' name="paymentMethod" id='Stripe' className={PaymentStyle.inputField} onChange={handleChange} disabled />
                    <label htmlFor='stripe' className={PaymentStyle.headerInput}>Stripe</label>
                </div>
                <div className={PaymentStyle.fieldContainer}>
                    <input type='radio' name="paymentMethod" id='paycash' className={PaymentStyle.inputField} onChange={handleChange} />
                    <label htmlFor='paycash' className={PaymentStyle.headerInput}>Pay Cash</label>
                </div>
                <div className={PaymentStyle.btnContainer}>
                    <button className={PaymentStyle.btn} onClick={() => router.push('/shipping')}>Back</button>
                    <button type="submit" className={PaymentStyle.btn}>Continue</button>
                </div>
            </form>
        </div>
    </>)
}