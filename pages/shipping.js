import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
// context
import { StoreCtx } from '../utils/Store';

export default function Shipping() {
    
    // context
    const context = useContext(StoreCtx);
    const { state } = context;
    const { userInfo } = state;

    // router
    const router = useRouter();
    
    // checking if user is logged in or not
    useEffect(()=>{
        if(!userInfo){
            router.push('/login?redirect=/shipping')
        }
    },[])

    return (
        <div>
            shipping
        </div>
    )
}