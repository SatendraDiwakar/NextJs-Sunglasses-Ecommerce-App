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
    // context
    const { state: { userInfo, cart }, dispatch } = useContext(StoreCtx);
    // router
    const router = useRouter();

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (document.getElementsByTagName('html')[0].classList.contains('hideScrollBar')) {
                document.getElementsByTagName('html')[0].classList.remove('hideScrollBar');
            }
            if (window.innerWidth > 620) {
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
        function userActionBox(e) {
            if (document.getElementById('userActionsContainer')) {
                if (document.getElementById('userActionsContainer').contains(e.target) ||
                    document.getElementById('userNameBtn').contains(e.target)) {
                    // Clicked in box
                } else {
                    // Clicked outside the box
                    if (document.getElementById('userActionsContainer').classList.contains(NavStyle.userNameBtnClk))
                        document.getElementById('userActionsContainer').classList.remove(NavStyle.userNameBtnClk);
                }
            }
        }
        window.addEventListener('click', userActionBox);

        // cleanup
        return () => {
            window.removeEventListener('click', userActionBox);
        }
    }, [userInfo]);

    function handleUserActionClk() {
        if (document.getElementById('userActionsContainer').classList.contains(NavStyle.userNameBtnClk)) {
            document.getElementById('userActionsContainer').classList.remove(NavStyle.userNameBtnClk);
        }
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
                        userInfo ?
                            <>
                                <div className={NavStyle.userLoggedIn}>
                                    <button id='userNameBtn' className={NavStyle.userNameBtn}
                                        onClick={() => {
                                            document.getElementById('userActionsContainer').classList.toggle(NavStyle.userNameBtnClk)
                                        }}
                                    >{userInfo.name.slice(0, 5)}..</button>
                                    <div id='userActionsContainer' className={NavStyle.userActionsContainer}>
                                        <button className={NavStyle.userAction}
                                            onClick={() => {
                                                handleUserActionClk()
                                                router.push('/order-history');
                                            }}
                                        >Orders</button>
                                        <button className={NavStyle.userAction}
                                            onClick={() => {
                                                handleUserActionClk()
                                                dispatch({ type: userLogout() })
                                                router.push('/');
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
                            document.getElementsByTagName('html')[0].classList.add('hideScrollBar');
                        }} />
                        <CgClose className={NavStyle.closeBtn} id='closeBtn' onClick={() => {
                            document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                            document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                            document.getElementById('navLinks').style = 'transform: translateX(-100%)';
                            document.getElementsByTagName('html')[0].classList.remove('hideScrollBar');
                            if (document.getElementById('brandsLinkList').offsetHeight !== 0)
                                document.getElementById('brandsLink').click();
                        }} />
                    </div>
                </div>
            </nav>
        </div >
    </header >
}
