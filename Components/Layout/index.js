import React, { useContext, useEffect, useRef } from 'react'
import Head from 'next/head';
// context
import { LoaderCtx } from '../ui/LoaderCtx';
// router
import { useRouter } from 'next/router';
// components
import Navbar from '../ui/Navbar';
import Footer2 from '../main/Footer2';
import Loader from '../ui/Loader';

export default function Layout({ children }) {

    const router = useRouter();
    // context
    const { isLoading, loading } = useContext(LoaderCtx);
    // ref
    const prevPath = useRef(router.pathname)

    useEffect(() => {
        let heit = window.innerHeight;
        document.getElementsByTagName('main')[0].style = `min-height: calc(${heit}px - 15rem)`;
        // checking route change
        const handleRouteChange = (url, { shallow }) => {
            if (prevPath.current !== url)
                loading();
            prevPath.current = url;
        }
        router.events.on('routeChangeStart', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, []);

    return <>
        <Head>
            <title>SunGlass Ecommerce</title>
        </Head>
        <Navbar />
        {
            isLoading && <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.9)',
                zIndex: '8000'
            }}>
                <Loader />
            </div>
        }
        <main>{children}</main>
        <Footer2 />
    </>
}
