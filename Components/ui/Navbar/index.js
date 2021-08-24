import React from 'react'
import Link from 'next/link'
// react-icons
import { IoGlasses } from 'react-icons/io5';
// style
import NavStyle from './Navbar.module.css';

export default function Navbar() {
    return <header>
        <nav className={NavStyle.nav}>
            <div className="container">
                <Link href="/">
                    <div className={NavStyle.iconContainer}>
                        <div className={NavStyle.icon}>
                            <p className={NavStyle.iconName}>Sun</p>
                            <IoGlasses className={NavStyle.sungIcon} />
                        </div>
                    </div>
                </Link>
                
            </div>
        </nav>
    </header>
}
