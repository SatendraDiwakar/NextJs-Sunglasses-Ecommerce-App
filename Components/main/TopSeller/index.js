import React from 'react'
// components
import Heading from '../../ui/Heading';
import ButtonBlack from '../../ui/ButtonBlack';
// style
import TopsellerStyle from './Topseller.module.css';

export default function TopSeller() {
    return (
        <section id="TopSeller">
            <Heading heading="top sellers" />
            <div className={`container ${TopsellerStyle.container}`}>
                <div className={TopsellerStyle.topSellerLeft}>
                    <div className={TopsellerStyle.gallery}>

                    </div>
                    <ButtonBlack name="view all" />
                </div>
                <img src="" alt="" />
            </div>
        </section>
    )
}
