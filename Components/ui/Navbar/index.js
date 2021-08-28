import React from 'react'
import Link from 'next/link'
// react-icons
import { IoGlasses } from 'react-icons/io5';
import { FaOpencart } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
// component
import Navlinks from './Navlinks';
// style
import NavStyle from './Navbar.module.css';

export default function Navbar() {

    const linkArr = ['home', 'brands', 'about us', 'contact'];

    return <header>
        <div className="container">
            <nav className={NavStyle.nav}>
                <Link href="/">
                    <div className={NavStyle.iconContainer}>
                        <div className={NavStyle.icon}>
                            <p className={NavStyle.iconName}>Sun</p>
                            <IoGlasses className={NavStyle.sungIcon} />
                        </div>
                    </div>
                </Link>
                <Navlinks links={linkArr} />
                <div className={NavStyle.navRight}>
                    <AiOutlineUser className={NavStyle.user} />
                    <div className={NavStyle.cartContainer}>
                        <FaOpencart className={NavStyle.cartIcon} />
                        <p className={NavStyle.cartText}>cart<span className={NavStyle.itemsNum}>0</span></p>
                    </div>
                </div>
            </nav>
        </div>
    </header>
}
