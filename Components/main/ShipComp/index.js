import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
// context
import { StoreCtx } from '../../../utils/Store'
import { saveShippingAddress } from '../../../utils/Actions'
// style
import ShipStyle from './ShipComp.module.css'

export default function ShipComp() {

    // router
    const router = useRouter();

    // context
    const { dispatch, state } = useContext(StoreCtx);
    const { userInfo, cart: { shippingAddress } } = state;

    // states
    const [inputDetails, setInputDetails] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    // checking if user is logged in or not
    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/shipping')
        }
        setInputDetails(prev => {
            return { ...prev, ...shippingAddress }
        });
    }, [])

    // for adding class hactive to email label to get animation
    useEffect(() => {
        if (router.pathname === '/shipping') {
            if (inputDetails.postalCode !== '') {
                document.getElementById('postalCode').classList.add(ShipStyle.hactive)
            } else {
                document.getElementById('postalCode').classList.remove(ShipStyle.hactive)
            }
        }
    }, [inputDetails.postalCode, router.pathname]);


    const submitHandler = (e) => {
        e.preventDefault();

        const shippingData = {
            fullName: inputDetails.fullName,
            address: inputDetails.address,
            city: inputDetails.city,
            postalCode: inputDetails.postalCode,
            country: inputDetails.country,
        };
        dispatch({ type: saveShippingAddress(), payload: shippingData });
        router.push('/payment');
    }

    // handles form's input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    return (<div className={ShipStyle.container}>
        <p className={ShipStyle.header}>Shipping</p>
        <form onSubmit={submitHandler} className={ShipStyle.shippingForm}>
            <div className={ShipStyle.fieldContainer}>
                <input
                    type="text"
                    name='fullName'
                    value={inputDetails.fullName}
                    placeholder='Enter full name'
                    minLength={1}
                    onChange={handleChange}
                    className={ShipStyle.inputField}
                    required
                />
                <label className={ShipStyle.headerInput}>Full Name</label>
            </div>
            <div className={ShipStyle.fieldContainer}>
                <input
                    type="text"
                    name='address'
                    value={inputDetails.address}
                    minLength={1}
                    placeholder='Enter address'
                    onChange={handleChange}
                    className={ShipStyle.inputField}
                    required
                />
                <label className={ShipStyle.headerInput}>Address</label>
            </div>
            <div className={ShipStyle.fieldContainer}>
                <input
                    type="text"
                    name='city'
                    value={inputDetails.city}
                    placeholder='Enter city'
                    minLength={1}
                    onChange={handleChange}
                    className={ShipStyle.inputField}
                    required
                />
                <label className={ShipStyle.headerInput}>City</label>
            </div>
            <div className={ShipStyle.fieldContainer}>
                <input
                    type="text"
                    name='postalCode'
                    value={inputDetails.postalCode}
                    minLength={6}
                    placeholder='Enter postal code'
                    onChange={handleChange}
                    className={ShipStyle.inputField}
                    required
                />
                <label id='postalCode' className={ShipStyle.headerInput}>Postal Code</label>
            </div>
            <div className={ShipStyle.fieldContainer}>
                <input
                    type="text"
                    name='country'
                    value={inputDetails.country}
                    placeholder='Enter country'
                    minLength={1}
                    onChange={handleChange}
                    className={ShipStyle.inputField}
                    required
                />
                <label className={ShipStyle.headerInput}>Country</label>
            </div>
            <button type="submit" className={ShipStyle.continueBtn}>Continue</button>
        </form>
    </div>)
}