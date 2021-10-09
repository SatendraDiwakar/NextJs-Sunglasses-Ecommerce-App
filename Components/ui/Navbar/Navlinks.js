import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// icons
import { FaAngleDown } from 'react-icons/fa'
// styles
import NavLinkStyle from './Navlinks.module.css'

export default function Navlinks() {

    const brandLinkArr = ['RayBan', 'Burberry', 'Maui-Jim', 'Gucci']

    const router = useRouter();
    const { Brand } = router.query;
    // ref
    const prevVal = useRef('homeLink');

    useEffect(() => {
        if (prevVal.current.includes('brand')) {
            document.getElementById(prevVal.current).style = '';
        } else if (prevVal.current !== '') {
            document.getElementById(prevVal.current).style = 'color: inherit';
        }
        if (!router.pathname.includes('brands')) {
            if (router.pathname === '/') {
                prevVal.current = 'homeLink';
            } else if (router.pathname === '/about') {
                prevVal.current = 'aboutLink';
            } else if (router.pathname === '/contact') {
                prevVal.current = 'contactLink';
            } else if (router.pathname === '/cart') {
                prevVal.current = 'cartIcon';
            } else {
                prevVal.current = '';
            }
        } else {
            if (router.asPath === `/brands/${Brand}`) {
                prevVal.current = `brand${Brand}`;
            } else {
                prevVal.current = '';
            }
        }
        if (prevVal.current !== '') {
            document.getElementById(prevVal.current).style = 'color: #c55757';
        }
    }, [router.pathname, router.asPath, Brand]);

    function handleLinkClick(linkNm) {
        if (linkNm === 'brands') {
            document.getElementById('brandsLink').style = 'color: inherit';
            document.getElementsByClassName(NavLinkStyle.brandsList)[0].classList.toggle(NavLinkStyle.anima)
            document.getElementsByClassName(NavLinkStyle.brandAngleIcon)[0].style = 'transform: rotate(-180deg)';
        } else if (linkNm !== 'brands') {
            if (window.innerWidth <= 620) {
                document.getElementById('menuBar').style = 'display: block';
                document.getElementById('closeBtn').style = 'display: none';
            }
            if (document.getElementsByClassName(NavLinkStyle.brandsList)[0].classList.contains(NavLinkStyle.anima)) {
                document.getElementsByClassName(NavLinkStyle.brandsList)[0].classList.remove(NavLinkStyle.anima)
                document.getElementsByClassName(NavLinkStyle.brandAngleIcon)[0].style = 'transform: initial';
            }
        }
    }

    return (
        <div className={NavLinkStyle.links} id="navLinks">
            <div className={NavLinkStyle.container}>
                <ul className={NavLinkStyle.list}>
                    <Link href='/' >
                        <li
                            id='homeLink'
                            className={NavLinkStyle.listItem}
                            onClick={() => handleLinkClick('home')}
                        >home</li>
                    </Link>
                    <li
                        id='brandsLink'
                        className={NavLinkStyle.listItem + ' ' + NavLinkStyle.brandsLink}
                        onClick={() => handleLinkClick('brands')}
                    >brands <FaAngleDown className={NavLinkStyle.brandAngleIcon} /></li>
                    <Link href='/about' >
                        <li
                            id='aboutLink'
                            className={NavLinkStyle.listItem}
                            onClick={() => handleLinkClick('about')}
                        >about us</li>
                    </Link>
                    <Link href='/contact' >
                        <li
                            id='contactLink'
                            className={NavLinkStyle.listItem}
                            onClick={() => handleLinkClick('contact')}
                        >contact</li>
                    </Link>
                </ul>
            </div>
            <ul className={NavLinkStyle.brandsList} id='brandsLinkList'>
                {
                    brandLinkArr.map((itm, index) => {
                        return <Link href={`/brands/${itm}`} key={itm + 'brandLink' + index}>
                            <li
                                id={`brand${itm}`}
                                className={NavLinkStyle.brandListItem}
                                onClick={() => handleLinkClick(`brand${itm}`)}
                            >{itm}</li></Link>
                    })
                }
            </ul>
        </div>
    )
}
