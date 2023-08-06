import React, { useContext, useEffect, useRef } from 'react'
import Head from 'next/head';
// context
import { LoaderCtx } from '../ui/LoaderCtx';
import { NotifyCtx } from '../../utils/NotifyCtx';
// router
import { useRouter } from 'next/router';
// components
import Navbar from '../ui/Navbar';
import Footer2 from '../main/Footer2';
import Loader from '../ui/Loader';
// style
import LayoutStyle from './Layout.module.css'

export default function Layout({ children }) {

    const router = useRouter();
    // context
    const { isLoading, loading } = useContext(LoaderCtx);
    const { showNotification, hide } = useContext(NotifyCtx);
    // ref
    // const prevPath = useRef(router.pathname);

    useEffect(()=>{
        let heit = window.innerHeight;
        let decHeit = '12rem';
        document.getElementsByTagName('main')[0].style = `min-height: calc(100vh - ${decHeit}); filter: ${isLoading ? 'blur(5px)' : 'unset'}`;
        window.addEventListener('resize',()=>{
            heit = window.innerHeight;  
            document.getElementsByTagName('main')[0].style = `min-height: calc(100vh - ${decHeit}); filter: ${isLoading ? 'blur(5px)' : 'unset'}`;
        });
        console.log(router.pathname);
    },[isLoading]);

    useEffect(() => {
        loading();
        // // checking route change
        // const handleRouteChange = (url, { shallow }) => {
        //     window.scrollTo(0, 0);
        //     if (window.innerWidth > 620) {
        //         document.getElementById('navLinks').style = '';
        //     } else {
        //         if (document.getElementById('navLinks').style.transform === 'translateX(0px)') {
        //             document.getElementById('menuBar').style = 'display: block';
        //             document.getElementById('closeBtn').style = 'display: none';
        //             document.getElementById('navLinks').style = 'transform: translateX(-100%)';
        //         }
        //     }
        //     if (prevPath.current !== url)
        //         loading();
        //     prevPath.current = url;
        // }
        // router.events.on('routeChangeStart', handleRouteChange)

        // // If the component is unmounted, unsubscribe
        // // from the event with the `off` method:
        // return () => {
        //     router.events.off('routeChangeStart', handleRouteChange)
        // }
    }, []);

    useEffect(()=>{
        if(showNotification){
            hide();
        }
    },[router.pathname])

    useEffect(() => {    
        if (isLoading)
            document.getElementsByTagName('html')[0].classList.add('hideScrollBar')
        else
            document.getElementsByTagName('html')[0].classList.remove('hideScrollBar')
    }, [router.pathname, isLoading])

    return <>
        <Head>
            <title>SunGlass Ecommerce</title>
        </Head>
        <Navbar {...{isLoading}} />
        {
            isLoading && <div className={LayoutStyle.loaderContainer}>
                <Loader />
            </div>
        }
        <main>{children}</main>
        <Footer2 {...{isLoading}} />
    </>
}
