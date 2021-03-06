import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
// context
import { ModalCtx } from '../../ModalCtx';
// components
import Heading from '../../ui/Heading';
import ButtonBlack from '../../ui/ButtonBlack';
// style
import TopsellerStyle from './Topseller.module.css';

export default function TopSeller({ topSellerChar, topSellerProd }) {

    // context
    const { open } = useContext(ModalCtx);

    // Function to show price after image loaded
    function handleImgLoad(className) {
        if (document.getElementsByClassName(className)[0]) {
            if (window.innerWidth <= 1000) {
                document.getElementsByClassName(className)[0].classList.add(TopsellerStyle.hovEffect);
                document.getElementsByClassName(className)[0].classList.add(TopsellerStyle.showPrice);
            } else {
                document.getElementsByClassName(className)[0].classList.add(TopsellerStyle.hovEffect);
            }
        }
    }

    // adds class showPrice on products based on window size
    useEffect(() => {
        let arr = Array.from(document.getElementsByClassName(TopsellerStyle.overHide));

        function addClassShowPrice() {
            if (window.innerWidth <= 1000) {
                arr.forEach(itm => {
                    if (!itm.classList.contains(TopsellerStyle.showPrice)) {
                        if (itm.classList.contains(TopsellerStyle.hovEffect)) {
                            itm.classList.add(TopsellerStyle.showPrice);
                        }
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
                        {
                            topSellerProd.map((itm, index) => {
                                return <div
                                    key={`${index}` + 'topSeller'}
                                    className={TopsellerStyle[`ts${index + 1}`] + ' ' + TopsellerStyle.overHide}
                                    onClick={() => { open(itm) }}
                                >
                                    <Image
                                        src={itm.image}
                                        alt={itm.name}
                                        layout='fill'
                                        onLoadingComplete={() => handleImgLoad(TopsellerStyle[`ts${index + 1}`])}
                                    />
                                    <p className={TopsellerStyle.price}>${itm.price}</p>
                                </div>
                            })
                        }
                    </div>
                    <ButtonBlack name="view all" clk={'/shop/topSeller'} />
                </div>
                <div className={TopsellerStyle.tsm}>
                    <Image
                        src={topSellerChar}
                        alt="tsm" layout='fill'
                        placeholder='blur'
                        blurDataURL />
                </div>
            </div>
        </section>
    )
}
