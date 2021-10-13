import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// style
import Footer2Style from './Footer2.module.css'

export default function Footer2() {

    // router
    const router = useRouter();
    // state
    const [footer2Color, setFooter2Color] = useState(false);
    // conditional style
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
            <p className={Footer2Style.rights} style={footer2Color ? stylF2color : null}>All rights reserved. Satendra's Sunglasses Ecomm.</p>
            <p className={Footer2Style.disclaimer}>Disclaimer : This website is not selling anything. This is a dummy website that I built to show my web development skills.</p>
        </div>
    )
}
