import React from 'react'
// react icons
import { FaTwitter, FaPinterest, FaFacebook, FaMapMarkedAlt } from 'react-icons/fa'
//style
import footerStyle from './Footer.module.css'

export default function Footer() {
    return (
        <section id="footer" className={footerStyle.footerSection}>
            <div className={`container ${footerStyle.container}`}>
                <div className={`${footerStyle.item} ${footerStyle.shop}`}>
                    <h3>Shop</h3>
                    <p className={footerStyle.footerText}>RayBan</p>
                    <p className={footerStyle.footerText}>Gucci</p>
                    <p className={footerStyle.footerText}>Maui Jim</p>
                    <p className={footerStyle.footerText}>Burberry</p>
                </div>
                <div className={`${footerStyle.item} ${footerStyle.company}`}>
                    <h3>Company</h3>
                    <p className={footerStyle.footerText}>About Us</p>
                    <p className={footerStyle.footerText}>Contact Us</p>
                </div>
                <div className={`${footerStyle.item} ${footerStyle.social}`}>
                    <h3>Get Social</h3>
                    <div className={footerStyle.socialIconsContainer}>
                        <FaTwitter className={footerStyle.scIcons} />
                        <FaPinterest className={footerStyle.scIcons} />
                        <FaFacebook className={footerStyle.scIcons} />
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
