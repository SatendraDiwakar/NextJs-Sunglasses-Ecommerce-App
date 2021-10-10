import React from 'react'
// component
import Heading from '../../ui/Heading'
// style
import AboutStyle from './About.module.css'

export default function AboutComp() {
    return (
        <div>
            <section id="aboutSectn" className={AboutStyle.aboutSection}>
                <Heading heading={'About Us'} />
                <div className={AboutStyle.container}>
                    <p className={AboutStyle.content}>
                        Founded in 2021, By Satendra with no money but truckloads of relentless passion to make a difference in this world, Satendra's Sunglasses eCommerce is Worlds fastest growing eyewear business today.
                        With a rapidly growing business reaching out to over 1,00,000 customers a month via a unique combination of a strong online business as www.satendra.com, uniquely designed physical stores, 
                        Satendra's Sunglasses Ecomm. is revolutionizing the eyewear industry in World.
                    </p>
                </div>
            </section>
        </div>
    )
}
