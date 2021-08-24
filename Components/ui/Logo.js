import React from 'react'
import Link from 'next/link';
// react-icons
import { GiSunglasses } from 'react-icons';

export default function Logo() {
    return (
        <div className="logo">
            <Link href="/" passHref={true}>
                <GiSunglasses></GiSunglasses>
            </Link>
        </div>
    )
}