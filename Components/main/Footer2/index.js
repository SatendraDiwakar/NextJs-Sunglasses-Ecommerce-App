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

    const stylF2color = {
        background: '#160514',
        color: 'rgba(255, 255, 255, 0.75)'
    }

    useEffect(() => {
        if (router.pathname === '/') {
            setFooter2Color(true);
        } else {
            setFooter2Color(false);
        }
    }, [router.pathname])

    return (
        <div className={Footer2Style.container} style={footer2Color ? stylF2color : null}>
            <p className={Footer2Style.rights} style={footer2Color ? stylF2color : null}>All rights reserved. Satendra Sunglass Ecomm.</p>
        </div>
    )
}
