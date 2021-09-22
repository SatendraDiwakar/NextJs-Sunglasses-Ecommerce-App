import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
// context
import { StoreCtx } from '../../../utils/Store';
// style
import Footer2Style from './Footer2.module.css'

export default function Footer2() {

    const router = useRouter();
    // state
    const [footer2Color, setFooter2Color] = useState(false);
    const [footer2Pos, setFooter2Pos] = useState(true);

    // context
    const context = useContext(StoreCtx);
    const { state } = context;

    const stylF2color = {
        background: '#160514',
        color: 'rgba(255, 255, 255, 0.75)'
    }
    const stylF2Pos = {
        position: 'absolute',
        bottom: '0',
    }

    useEffect(() => {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        if (document) {
            if (router.pathname === '/') {
                setFooter2Color(true);
            } else if (router.pathname === '/cart') {
                if (height <= window.innerHeight) {
                    setFooter2Pos(true)
                } else {
                    setFooter2Pos(false)
                }
                setFooter2Color(false);
            } else {
                setFooter2Color(false);
            }
        }
    }, [router.pathname, state.cart.cartItems.length])

    return (
        <div className={Footer2Style.container} style={footer2Color ? stylF2color : footer2Pos ? stylF2Pos : null}>
            <p className={Footer2Style.rights} style={footer2Color ? stylF2color : null}>All rights reserved. Satendra Sunglass Ecomm.</p>
        </div>
    )
}
