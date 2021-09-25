import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
// context
import { StoreCtx } from '../../../utils/Store';
import { userLogout } from '../../../utils/Actions';
// react-icons
import { FiMenu } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { FaOpencart } from 'react-icons/fa';
import { GiSunglasses } from 'react-icons/gi';
import { AiOutlineUser } from 'react-icons/ai';
// component
import Navlinks from './Navlinks';
// style
import NavStyle from './Navbar.module.css';
import { useRouter } from 'next/router';

export default function Navbar() {

    // state
    const [cartCount, setCartCount] = useState(0);
    // context
    const context = useContext(StoreCtx);
    const { state, dispatch } = context;
    const { userInfo } = state;
    // router
    const router = useRouter();

    useEffect(() => {

        window.addEventListener('load', () => {
            if (window.innerWidth > 560) {
                document.getElementById('menuLinks').style = 'transform: translate(-50%,-50%)';
            } else {
                document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                document.getElementById('menuLinks').style = 'transform: translate(-100%,-50%)';
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 560) {
                document.getElementById('menuLinks').style = 'transform: translate(-50%,-50%)';
            } else {
                document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                document.getElementById('menuLinks').style = 'transform: translate(-100%,-50%)';
            }
        });
    }, [])

    useEffect(() => {
        setCartCount(state.cart.cartItems.length);
    }, [state.cart.cartItems.length])

    return <header>
        <div className="container">
            <nav className={NavStyle.nav}>
                <Link href="/">
                    <div className={NavStyle.iconContainer}>
                        <div className={NavStyle.icon}>
                            <p className={NavStyle.iconName}>Sun</p>
                            <GiSunglasses className={NavStyle.sungIcon} />
                        </div>
                    </div>
                </Link>
                <Navlinks />
                <div className={NavStyle.navRight}>
                    <Link href="/cart">
                        <div className={NavStyle.cartContainer}>
                            <FaOpencart className={NavStyle.cartIcon} id='cartIcon' />
                            <p className={NavStyle.cartText}>cart<span className={NavStyle.itemsNum}>{cartCount}</span></p>
                        </div>
                    </Link>
                    {
                        !userInfo ?
                            <div className={NavStyle.userIconContainer} onClick={()=>{router.push('/login')}}>
                                <AiOutlineUser className={NavStyle.userIcon} />
                                <p className={NavStyle.loginMsg}>Login</p>
                            </div>
                            :
                            <>
                                <button className={NavStyle.userNameBtn}
                                    onClick={()=>{
                                        dispatch({type: userLogout()})
                                    }}
                                >{userInfo.name}</button>
                            </>
                        // on logout redirect user to home 3.45.10
                    }
                    <div className={NavStyle.menuBtnContainer}>
                        <FiMenu className={NavStyle.menuBar} id='menuBar' onClick={() => {
                            document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: none';
                            document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: block';
                            document.getElementById('menuLinks').style = 'transform: translate(0,-50%)';
                            document.getElementsByTagName('main')[0].style = 'transition: all .5s; filter: blur(5px);';
                        }} />
                        <CgClose className={NavStyle.closeBtn} id='closeBtn' onClick={() => {
                            document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                            document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                            document.getElementById('menuLinks').style = 'transform: translate(-100%,-50%)';
                            document.getElementsByTagName('main')[0].style = 'filter: unset';
                            if (document.getElementById('brandsLinkList').offsetHeight !== 0)
                                document.getElementById('brandsLink').click();
                        }} />
                    </div>
                </div>
            </nav>
        </div>
    </header>
}
