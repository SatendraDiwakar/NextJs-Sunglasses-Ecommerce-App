import React from 'react'
// react icons
import { FaTwitter, FaPinterest, FaFacebook, FaMapMarkedAlt } from 'react-icons/fa'
// router
import { useRouter } from 'next/router';
//style
import footerStyle from './Footer.module.css'

export default function Footer() {

    const router = useRouter();

    return (
        <section id="footer" className={footerStyle.footerSection}>
            <div className={`container ${footerStyle.container}`}>
                <div className={`${footerStyle.item} ${footerStyle.shop}`}>
                    <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '.5rem' }}>Shop</h3>
                    <button
                        style={{ background: 'transparent', border: 'none' }}
                        className={footerStyle.footerText}
                        onClick={() => router.push('/brands/RayBan')}
                    >RayBan</button>
                    <button
                        style={{ background: 'transparent', border: 'none' }}
                        className={footerStyle.footerText}
                        onClick={() => router.push('/brands/Gucci')}
                    >Gucci</button>
                    <button
                        style={{ background: 'transparent', border: 'none' }}
                        className={footerStyle.footerText}
                        onClick={() => router.push('/brands/Maui-Jim')}
                    >Maui Jim</button>
                    <button
                        style={{ background: 'transparent', border: 'none' }}
                        className={footerStyle.footerText}
                        onClick={() => router.push('/brands/Burberry')}
                    >Burberry</button>
                </div>
                <div className={`${footerStyle.item} ${footerStyle.company}`}>
                    <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '.5rem' }}>Company</h3>
                    <button
                        style={{ background: 'transparent', border: 'none' }}
                        className={footerStyle.footerText}
                        onClick={() => router.push('/about')}
                    >About Us</button>
                    <button
                        style={{ background: 'transparent', border: 'none' }}
                        className={footerStyle.footerText}
                        onClick={() => router.push('/contact')}
                    >Contact Us</button>
                </div>
                <div className={`${footerStyle.item} ${footerStyle.social}`}>
                    <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '.5rem' }}>Get Social</h3>
                    <div className={footerStyle.socialIconsContainer}>
                        <FaTwitter className={footerStyle.scIcons} onClick={() => window.scrollTo(0, 0)} />
                        <FaPinterest className={footerStyle.scIcons} onClick={() => window.scrollTo(0, 0)} />
                        <FaFacebook className={footerStyle.scIcons} onClick={() => window.scrollTo(0, 0)} />
                    </div>
                </div>
                <div className={`${footerStyle.item} ${footerStyle.location}`}>
                    <FaMapMarkedAlt className={footerStyle.locIcon} />
                    <p className={footerStyle.footerText} style={{ cursor: 'auto', opacity: '0.7' }}>GShop Inc.<br />
                        1323 NW st.<br />
                        xyz , AB 1234</p>
                </div>
            </div>
        </section>
    )
}
