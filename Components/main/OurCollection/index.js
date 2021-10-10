import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
// context
import { ModalCtx } from '../../ModalCtx'
// component
import Heading from '../../ui/Heading'
import ButtonBlack from '../../ui/ButtonBlack'
// style
import CollectionStyle from './Collection.module.css'

export default function OurCollection({ collectionChars, collectionProd }) {

    // destructuring
    const { g1car, g2car1, g2car2 } = collectionChars;
    const gal1Prod = collectionProd.slice(0, 6);
    const gal2Prod = collectionProd.slice(6);

    // context
    const { open } = useContext(ModalCtx);

    // Function to show price after image loaded
    function handleHov(className) {
        if (document.getElementsByClassName(className)[0]) {
            if (window.innerWidth <= 1000) {
                document.getElementsByClassName(className)[0].classList.add(CollectionStyle.hovEffect);
                document.getElementsByClassName(className)[0].classList.add(CollectionStyle.showPrice);
            } else {
                document.getElementsByClassName(className)[0].classList.add(CollectionStyle.hovEffect);
            }
        }
    }

    // adds class showPrice on products based on window size
    useEffect(() => {
        let arr = Array.from(document.getElementsByClassName(CollectionStyle.overHide));

        function addClassShowPrice() {
            if (window.innerWidth <= 1000) {
                arr.forEach(itm => {
                    if (!itm.classList.contains(CollectionStyle.showPrice)) {
                        if (itm.classList.contains(CollectionStyle.hovEffect)) {
                            itm.classList.add(CollectionStyle.showPrice);
                        }
                    }
                })
            } else {
                arr.forEach(itm => {
                    if (itm.classList.contains(CollectionStyle.showPrice)) {
                        itm.classList.remove(CollectionStyle.showPrice);
                    }
                })
            }
        }
        window.addEventListener('resize', addClassShowPrice);
    }, [])

    return (
        <section id="OurCollection" className={CollectionStyle.collectionSection}>
            <Heading heading="our collection" />
            <div className={`container ${CollectionStyle.container}`}>
                <div className={CollectionStyle.firstGrid}>
                    <div className={CollectionStyle.gallery1}>
                        {
                            gal1Prod.map((itm, index) => {
                                return <div
                                    key={`collection${index}Gallery1`}
                                    className={CollectionStyle[`g1col${index + 1}`] + ' ' + CollectionStyle.overHide}
                                    onClick={() => { open(itm) }}
                                >
                                    <Image
                                        src={itm.image}
                                        alt={`sunglass image collection ${index}`}
                                        layout='fill'
                                        onLoadingComplete={() => handleHov(CollectionStyle[`g1col${index + 1}`])}
                                    />
                                    <p className={CollectionStyle.price}>{itm.price}</p>
                                </div>
                            })
                        }
                    </div>
                    <div className={CollectionStyle.g1car}>
                        <Image
                            src={g1car}
                            alt="man with sunglass"
                            layout='fill'
                        />
                    </div>
                </div>
                <div className={CollectionStyle.secondGrid}>
                    <div className={CollectionStyle.g2car1}>
                        <Image
                            src={g2car1}
                            alt="woman with sunglass 1"
                            layout='fill'
                        />
                    </div>
                    <div className={CollectionStyle.gallery2}>
                        {
                            gal2Prod.map((itm, index) => {
                                return <div
                                    key={`collection${index + 6}Gallery2`}
                                    className={CollectionStyle[`g2col${index + 1}`] + ' ' + CollectionStyle.overHide}
                                    onClick={() => { open(itm) }}
                                >
                                    <Image
                                        src={itm.image}
                                        alt={`sunglass image collection ${index + 6}`}
                                        layout='fill'
                                        onLoadingComplete={() => handleHov(CollectionStyle[`g2col${index + 1}`])}
                                    />
                                    <p className={CollectionStyle.price}>{itm.price}</p>
                                </div>
                            })
                        }
                    </div>
                    <div className={CollectionStyle.g2car2}>
                        <Image
                            src={g2car2}
                            alt="woman with sunglass 2"
                            layout='fill'
                        />
                    </div>
                </div>
                <ButtonBlack name="see all" clk={'/shop/ourCollection'} />
            </div>
        </section>
    )
}
