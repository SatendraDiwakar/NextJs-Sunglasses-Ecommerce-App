import React, { useEffect } from 'react'
import Link from 'next/link';
// styles
import NavLinkStyle from './Navlinks.module.css';

export default function Navlinks({ links }) {

    const brandLinkArr = ['RayBan', 'Burberry', 'Maui-Jim', 'Gucci']

    function handleLinkClick() {
        if (window.innerWidth <= 560) {
            console.log(window.innerWidth);
            document.getElementById('menuBar').style = 'display: block';
            document.getElementById('closeBtn').style = 'display: none';
            document.getElementById('menuLinks').style = 'transform: translate(-100%,-50%)';

        }

    }
    useEffect(() => {
        document.getElementById('brandsLink').addEventListener('click', () => {
            document.getElementsByClassName(NavLinkStyle.brandsList)[0].classList.toggle(NavLinkStyle.anima)
        })
    }, []);

    function handleBrandClick(){        
        document.getElementsByClassName(NavLinkStyle.brandsList)[0].classList.toggle(NavLinkStyle.anima)
    }

    return (
        <div className={NavLinkStyle.links}>

            <div className={NavLinkStyle.container} id="menuLinks" onClick={handleLinkClick}>
                <ul className={NavLinkStyle.list}>
                    <Link href='/' >
                        <li
                            className={NavLinkStyle.listItem}
                            onClick={handleLinkClick}
                        >home</li>
                    </Link>
                    <li
                        id='brandsLink'
                        className={NavLinkStyle.listItem}
                        onClick={handleLinkClick}
                    >brands</li>
                    <Link href='/about' >
                        <li
                            className={NavLinkStyle.listItem}
                            onClick={handleLinkClick}
                        >about us</li>
                    </Link>
                    <Link href='/contact' >
                        <li
                            className={NavLinkStyle.listItem}
                            onClick={handleLinkClick}
                        >contact</li>
                    </Link>
                </ul>
            </div>
            <ul className={NavLinkStyle.brandsList}>
                {
                    brandLinkArr.map((itm, index) => {
                        return <Link href={`/brands/${itm}`}><li
                            key={itm + 'brandLink' + index}
                            className={NavLinkStyle.brandListItem}
                            onClick={handleBrandClick}
                        >{itm}</li></Link>
                    })
                }
            </ul>
        </div>
    )
}
