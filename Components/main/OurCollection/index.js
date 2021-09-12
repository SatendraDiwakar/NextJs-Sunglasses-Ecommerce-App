import React, { useEffect } from 'react'
import Image from 'next/image'
// component
import Heading from '../../ui/Heading'
import ButtonBlack from '../../ui/ButtonBlack'
// style
import collectionStyle from './Collection.module.css'

export default function OurCollection({ collectionChars, collectionProd }) {

    const { g1car, g2car1, g2car2 } = collectionChars;
    const gal1Prod = collectionProd.slice(0,6);
    const gal2Prod = collectionProd.slice(6);

    function handleHov(className) {
        if (window.innerWidth <= 1000) {
            document.getElementsByClassName(className)[0].classList.add(collectionStyle.hovEffect);
            document.getElementsByClassName(className)[0].classList.add(collectionStyle.showPrice);
        } else {
            document.getElementsByClassName(className)[0].classList.add(collectionStyle.hovEffect);
        }
    }

    useEffect(() => {
        let arr = Array.from(document.getElementsByClassName(collectionStyle.overHide));

        function addClassShowPrice() {
            if (window.innerWidth <= 1000) {
                arr.forEach(itm => {
                    if (!itm.classList.contains(collectionStyle.showPrice)) {
                        itm.classList.add(collectionStyle.showPrice);
                    }
                })
            } else {
                arr.forEach(itm => {
                    if (itm.classList.contains(collectionStyle.showPrice)) {
                        itm.classList.remove(collectionStyle.showPrice);
                    }
                })
            }
        }
        window.addEventListener('resize', addClassShowPrice);
    }, [])

    return (
        <section id="OurCollection" className={collectionStyle.collectionSection}>
            <Heading heading="our collection" />
            <div className={`container ${collectionStyle.container}`}>
                <div className={collectionStyle.firstGrid}>
                    <div className={collectionStyle.gallery1}>
                        {
                            gal1Prod.map((itm, index) => {
                                return <div key={`collection${index}Gallery1`} className={collectionStyle[`g1col${index + 1}`] + ' ' + collectionStyle.overHide}>
                                    <Image
                                        src={itm.image}
                                        alt={`sunglass image collection ${index}`}
                                        layout='fill'
                                        placeholder='blur'
                                        blurDataURL
                                        onLoadingComplete={() => handleHov(collectionStyle[`g1col${index + 1}`])}
                                    />
                                    <p className={collectionStyle.price}>{itm.price}</p>
                                </div>
                            })
                        }
                    </div>
                    <div className={collectionStyle.g1car}>
                        <Image
                            src={g1car}
                            alt="man with sunglass"
                            layout='fill'
                            placeholder='blur'
                            blurDataURL
                        />
                    </div>
                </div>
                <div className={collectionStyle.secondGrid}>
                    <div className={collectionStyle.g2car1}>
                        <Image
                            src={g2car1}
                            alt="woman with sunglass 1"
                            layout='fill'
                            placeholder='blur'
                            blurDataURL
                        />
                    </div>
                    <div className={collectionStyle.gallery2}>
                        {
                            gal2Prod.map((itm, index) => {
                                return <div key={`collection${index+6}Gallery2`} className={collectionStyle[`g2col${index + 1}`] + ' ' + collectionStyle.overHide}>
                                    <Image
                                        src={itm.image}
                                        alt={`sunglass image collection ${index + 6}`}
                                        layout='fill'
                                        placeholder='blur'
                                        blurDataURL
                                        onLoadingComplete={() => handleHov(collectionStyle[`g2col${index + 1}`])}
                                    />
                                    <p className={collectionStyle.price}>{itm.price}</p>
                                </div>
                            })
                        }
                    </div>
                    <div className={collectionStyle.g2car2}>
                        <Image
                            src={g2car2}
                            alt="woman with sunglass 2"
                            layout='fill'
                            placeholder='blur'
                            blurDataURL
                        />
                    </div>
                </div>
                <ButtonBlack name="see all" />
            </div>
        </section>
    )
}
