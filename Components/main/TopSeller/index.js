import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// components
import Heading from '../../ui/Heading';
import ButtonBlack from '../../ui/ButtonBlack';
// style
import TopsellerStyle from './Topseller.module.css';
// image
import ts1 from '../../../public/Images/topSeller/ts1.jpg'
import ts2 from '../../../public/Images/topSeller/ts2.jpg'
import ts3 from '../../../public/Images/topSeller/ts3.jpg'
import ts4 from '../../../public/Images/topSeller/ts4.jpg'
import tsm from '../../../public/Images/topSeller/tsm.jpg'

export default function TopSeller() {

    function handleHov(className) {
        if (window.innerWidth <= 1000) {
            document.getElementsByClassName(className)[0].classList.add(TopsellerStyle.hovEffect);
            document.getElementsByClassName(className)[0].classList.add(TopsellerStyle.showPrice);
        } else {
        document.getElementsByClassName(className)[0].classList.add(TopsellerStyle.hovEffect);
        }
    }

    useEffect(() => {
        let arr = Array.from(document.getElementsByClassName(TopsellerStyle.overHide));

        function addClassShowPrice() {
            if (window.innerWidth <= 1000) {
                arr.forEach(itm => {
                    if (!itm.classList.contains(TopsellerStyle.showPrice)) {
                        itm.classList.add(TopsellerStyle.showPrice);
                    }
                })
            } else {
                arr.forEach(itm => {
                    if (itm.classList.contains(TopsellerStyle.showPrice)) {
                        itm.classList.remove(TopsellerStyle.showPrice);
                    }
                })
            }
        }
        window.addEventListener('resize', addClassShowPrice);
    }, [])

    return (
        <section id="TopSeller">
            <Heading heading="top sellers" />
            <div className={`container ${TopsellerStyle.container}`}>
                <div className={TopsellerStyle.topSellerLeft}>
                    <div className={TopsellerStyle.gallery}>
                        <div className={TopsellerStyle.ts1 + ' ' + TopsellerStyle.overHide}>
                            <Image
                                src={ts1}
                                alt="ts1"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={() => handleHov(TopsellerStyle.ts1)}
                            />
                            <p className={TopsellerStyle.price}>$99</p>
                        </div>
                        <div className={TopsellerStyle.ts2 + ' ' + TopsellerStyle.overHide}>
                            <Image
                                src={ts2}
                                alt="ts2"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={() => handleHov(TopsellerStyle.ts2)}
                            />
                            <p className={TopsellerStyle.price}>$99</p>
                        </div>
                        <div className={TopsellerStyle.ts3 + ' ' + TopsellerStyle.overHide}>
                            <Image
                                src={ts3}
                                alt="ts3"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={() => handleHov(TopsellerStyle.ts3)}
                            />
                            <p className={TopsellerStyle.price}>$99</p>
                        </div>
                        <div className={TopsellerStyle.ts4 + ' ' + TopsellerStyle.overHide}>
                            <Image
                                src={ts4}
                                alt="ts4"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={() => handleHov(TopsellerStyle.ts4)}
                            />
                            <p className={TopsellerStyle.price}>$99</p>
                        </div>
                    </div>
                    <ButtonBlack name="view all" />
                </div>
                <div className={TopsellerStyle.tsm}>
                    <Image src={tsm} alt="tsm" layout='fill' placeholder='blur' />
                </div>
            </div>
        </section>
    )
}
