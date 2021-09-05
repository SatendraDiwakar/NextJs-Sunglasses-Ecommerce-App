import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
// styles
import NavLinkStyle from './Navlinks.module.css';
import link from 'next/link';

export default function Navlinks() {

    const brandLinkArr = ['RayBan', 'Burberry', 'Maui-Jim', 'Gucci']

    const router = useRouter();
    // idea useref
    const prevVal = useRef('');
    
    function handleLinkClick(linkNm) {
        if (window.innerWidth <= 560) {
            
            if(linkNm === 'brands'){
                document.getElementsByClassName(NavLinkStyle.brandsList)[0].classList.toggle(NavLinkStyle.anima)
            } else {
                document.getElementById('menuBar').style = 'display: block';
                document.getElementById('closeBtn').style = 'display: none';
                document.getElementById('menuLinks').style = 'transform: translate(-100%,-50%)';
            }
        }
    }    
    
    function handleBrandClick() {
        document.getElementsByClassName(NavLinkStyle.brandsList)[0].classList.toggle(NavLinkStyle.anima);
        if (window.innerWidth <= 560) {
            handleLinkClick();
        }
    }

    return (
        <div className={NavLinkStyle.links}>

            <div className={NavLinkStyle.container} id="menuLinks">
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
                        className={NavLinkStyle.listItem}
                        onClick={() => handleLinkClick('brands')}
                    >brands</li>
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
                                className={NavLinkStyle.brandListItem}
                                onClick={handleBrandClick}
                            >{itm}</li></Link>
                    })
                }
            </ul>
        </div>
    )
}
