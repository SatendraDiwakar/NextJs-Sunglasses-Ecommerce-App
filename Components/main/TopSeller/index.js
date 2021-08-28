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
                        <img src="/Images/topSeller/ts1.jpg" alt="ts1" className={TopsellerStyle.ts1} />
                        <img src="/Images/topSeller/ts2.jpg" alt="ts2" className={TopsellerStyle.ts2} />
                        <img src="/Images/topSeller/ts3.jpg" alt="ts3" className={TopsellerStyle.ts3} />
                        <img src="/Images/topSeller/ts4.jpg" alt="ts4" className={TopsellerStyle.ts4} />
                    </div>
                    <ButtonBlack name="view all" />
                </div>
                <img src="/Images/topSeller/tsm.jpg" alt="tsm" className={TopsellerStyle.tsm} />
            </div>
        </section>
    )
}
