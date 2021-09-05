import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// react-icons
import { FaOpencart } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { GiSunglasses } from 'react-icons/gi';
// component
import Navlinks from './Navlinks';
// style
import NavStyle from './Navbar.module.css';

export default function Navbar() {

    const [switchUserIconPos, setSwitchUserIconPos] = useState(false);

    useEffect(() => {

        window.addEventListener('load', () => {
            if (window.innerWidth > 560) {
                setSwitchUserIconPos(false);
                document.getElementById('menuLinks').style = 'transform: translateX(-50%)';
            } else {
                document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                document.getElementById('menuLinks').style = 'transform: translate(-100%,-50%)';
                setSwitchUserIconPos(true);
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 560) {
                setSwitchUserIconPos(false);
                document.getElementById('menuLinks').style = 'transform: translateX(-50%)';
            } else {
                document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                document.getElementById('menuLinks').style = 'transform: translate(-100%,-50%)';
                setSwitchUserIconPos(true);
            }
        });
    }, [])

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
                    {
                        switchUserIconPos ? <>
                            <div className={NavStyle.cartContainer}>
                                <FaOpencart className={NavStyle.cartIcon} />
                                <p className={NavStyle.cartText}>cart<span className={NavStyle.itemsNum}>0</span></p>
                            </div>
                            <AiOutlineUser className={NavStyle.user} />
                        </>
                            :
                            <>
                                <AiOutlineUser className={NavStyle.user} />
                                <div className={NavStyle.cartContainer}>
                                    <FaOpencart className={NavStyle.cartIcon} />
                                    <p className={NavStyle.cartText}>cart<span className={NavStyle.itemsNum}>0</span></p>
                                </div>
                            </>
                    }
                    <div className={NavStyle.menuBtnContainer}>
                        <FiMenu className={NavStyle.menuBar} id='menuBar' onClick={() => {
                            document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: none';
                            document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: block';
                            document.getElementById('menuLinks').style = 'transform: translate(0,-50%)';
                        }} />
                        <CgClose className={NavStyle.closeBtn} id='closeBtn' onClick={() => {
                            document.getElementsByClassName(NavStyle.menuBar)[0].style = 'display: block';
                            document.getElementsByClassName(NavStyle.closeBtn)[0].style = 'display: none';
                            document.getElementById('menuLinks').style = 'transform: translate(-100%,-50%)';
                            if (document.getElementById('brandsLinkList').offsetHeight !== 0)
                                document.getElementById('brandsLink').click();
                        }} />
                    </div>
                </div>
            </nav>
        </div>
    </header>
}
