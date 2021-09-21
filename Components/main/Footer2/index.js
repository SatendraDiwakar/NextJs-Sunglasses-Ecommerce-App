import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
// context
import { StoreCtx } from '../../../utils/Store';
// style
import Footer2Style from './Footer2.module.css'

export default function Footer2() {

    const router = useRouter();
    const [stylState, setStylState] = useState(false);
    const [stylState2, setStylState2] = useState(true);
    const [heightOfCart, setHeightOfCart] = useState(0);
    const foo = useRef(null);
    
    // context
    const context = useContext(StoreCtx);
    const { state } = context;

    const styl = {
        background: '#160514',
        color: 'rgba(255, 255, 255, 0.75)'
    }
    const styl2 = {
        position: 'absolute',
        bottom: '0',
    }

    useEffect(()=>{
        setTimeout(()=>{
            let shoppingCart = document.getElementById('shoppingCartSection').getBoundingClientRect().bottom;
            setHeightOfCart(shoppingCart);
        })        
    },[])

    useEffect(() => {
        if (document) {
            if (router.pathname === '/') {
                setStylState(true);
            } else if (router.pathname === '/cart') {
                    if (heightOfCart >= window.innerHeight) {
                        setStylState2(false)
                    } else {
                        setStylState2(true)
                    }
                setStylState(false);
            } else {
                setStylState(false);
            }
        }
    }, [router.pathname, state.cart.cartItems.length])

    return (
        <div ref={foo} className={Footer2Style.container} style={stylState ? styl : stylState2 ? styl2 : null}>
            <p className={Footer2Style.rights} style={stylState ? styl : null}>All rights reserved. Satendra Sunglass Ecomm.</p>
        </div>
    )
}
