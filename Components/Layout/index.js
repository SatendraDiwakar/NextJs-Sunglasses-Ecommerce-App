import React from 'react'
import Head from 'next/head';
// components
import Navbar from '../ui/Navbar';
import Footer2 from '../main/Footer2';

export default function Layout({ children }) {
    return <>
        <Head>
            <title>SunGlass Ecommerce</title>
        </Head>
        <Navbar />
        <main>{children}</main>
        <Footer2 />
    </>
}
