import React, { useContext, useEffect, useRef, useState } from 'react'
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
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(0);
    // context
    const { state: { userInfo, cart }, dispatch } = useContext(StoreCtx);
    // router
    const router = useRouter();

    useEffect(() => {
        window.addEventListener('load', () => {
            document.getElementsByTagName('main')[0].style = 'filter: unset';
            if (window.innerWidth > 600) {
                document.getElementById('navLinks').style = '';
            } else {
                document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                document.getElementById('navLinks').style = 'transform: translateX(-100%)';
            }
        });
        window.addEventListener('resize', () => {
            document.getElementsByTagName('main')[0].style = 'filter: unset';
            if (window.innerWidth > 600) {
                document.getElementById('navLinks').style = '';
            } else {
                document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                document.getElementById('navLinks').style = 'transform: translateX(-100%)';
            }
        });
    }, []);

    useEffect(() => {
        setCartCount(cart.cartItems.length);
    }, [cart.cartItems.length]);

    useEffect(() => {
        if (userInfo) {
            setIsUserLoggedIn(1)
            window.addEventListener('click', function (e) {
                if (document.getElementById('userActionsContainer').contains(e.target) ||
                    document.getElementById('userNameBtn').contains(e.target)) {
                    // Clicked in box
                } else {
                    // Clicked outside the box
                    if (document.getElementById('userActionsContainer').classList.contains(NavStyle.userNameBtnClk))
                        document.getElementById('userActionsContainer').classList.remove(NavStyle.userNameBtnClk);
                }
            });
        } else {
            setIsUserLoggedIn(0)
        }
    }, [userInfo]);

    function handleUserActionClk() {
        if (document.getElementById('userActionsContainer').classList.contains(NavStyle.userNameBtnClk)) {
            document.getElementById('userActionsContainer').classList.remove(NavStyle.userNameBtnClk);
        }
        router.push('/order-history');
    }

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
                        isUserLoggedIn ?
                            <>
                                <div className={NavStyle.userLoggedIn}>
                                    <button id='userNameBtn' className={NavStyle.userNameBtn}
                                        onClick={() => {
                                            document.getElementById('userActionsContainer').classList.toggle(NavStyle.userNameBtnClk)
                                        }}
                                    >{userInfo.name.slice(0, 5)}..</button>
                                    <div id='userActionsContainer' className={NavStyle.userActionsContainer}>
                                        <button className={NavStyle.userAction}
                                            onClick={
                                                handleUserActionClk
                                            }
                                        >Orders</button>
                                        <button className={NavStyle.userAction}
                                            onClick={() => {
                                                handleUserActionClk()
                                                dispatch({ type: userLogout() })
                                            }}
                                        >Logout</button>
                                    </div>
                                </div>
                            </>
                            :
                            <div className={NavStyle.userIconContainer} onClick={() => { router.push('/login') }}>
                                <AiOutlineUser className={NavStyle.userIcon} />
                                <p className={NavStyle.loginMsg}>Login</p>
                            </div>
                        // on logout redirect user to home 3.45.10
                    }
                    <div className={NavStyle.menuBtnContainer}>
                        <FiMenu className={NavStyle.menuBar} id='menuBar' onClick={() => {
                            document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: none';
                            document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: block';
                            document.getElementById('navLinks').style = 'transform: translateX(0)';
                            document.getElementsByTagName('main')[0].style = 'transition: all .5s; filter: blur(5px);';
                        }} />
                        <CgClose className={NavStyle.closeBtn} id='closeBtn' onClick={() => {
                            document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                            document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                            document.getElementById('navLinks').style = 'transform: translateX(-100%)';
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
