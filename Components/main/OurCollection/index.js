import React, { useEffect } from 'react'
import Image from 'next/image'
// component
import Heading from '../../ui/Heading'
import ButtonBlack from '../../ui/ButtonBlack'
// style
import collectionStyle from './Collection.module.css'
// images 
import g1car from '../../../public/Images/collection/g1car1.jpg'
import g1col1 from '../../../public/Images/collection/g1col1.jpg'
import g1col2 from '../../../public/Images/collection/g1col2.jpg'
import g1col3 from '../../../public/Images/collection/g1col3.jpg'
import g1col4 from '../../../public/Images/collection/g1col4.jpg'
import g1col5 from '../../../public/Images/collection/g1col5.jpg'
import g1col6 from '../../../public/Images/collection/g1col6.jpg'

import g2car1 from '../../../public/Images/collection/g2car1.jpg'
import g2car2 from '../../../public/Images/collection/g2car2.jpg'
import g2col1 from '../../../public/Images/collection/g2col1.jpg'
import g2col2 from '../../../public/Images/collection/g2col2.jpg'
import g2col3 from '../../../public/Images/collection/g2col3.jpg'
import g2col4 from '../../../public/Images/collection/g2col4.jpg'

export default function OurCollection() {

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
                        <div className={collectionStyle.g1col1 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g1col1}
                                alt="sunglass image collection 1"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g1col1)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col2 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g1col2}
                                alt="sunglass image collection 2"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g1col2)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col3 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g1col3}
                                alt="sunglass image collection 3"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g1col3)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col4 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g1col4}
                                alt="sunglass image collection 4"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g1col4)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col5 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g1col5}
                                alt="sunglass image collection 5"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g1col5)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col6 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g1col6}
                                alt="sunglass image collection 6"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g1col6)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                    </div>
                    <div className={collectionStyle.g1car}>
                        <Image
                            src={g1car}
                            alt="man with sunglass"
                            layout='fill'
                            placeholder='blur'
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
                        />
                    </div>
                    <div className={collectionStyle.gallery2}>
                        <div className={collectionStyle.g2col1 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g2col1}
                                alt="sunglass image collection 7"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g2col1)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g2col2 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g2col2}
                                alt="sunglass image collection 8"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g2col2)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g2col3 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g2col3}
                                alt="sunglass image collection 9"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g2col3)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g2col4 + ' ' + collectionStyle.overHide}>
                            <Image
                                src={g2col4}
                                alt="sunglass image collection 10"
                                layout='fill'
                                placeholder='blur'
                                onLoadingComplete={()=>handleHov(collectionStyle.g2col4)}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                    </div>
                    <div className={collectionStyle.g2car2}>
                        <Image
                            src={g2car2}
                            alt="woman with sunglass 2"
                            layout='fill'
                            placeholder='blur'
                        />
                    </div>
                </div>
                <ButtonBlack name="see all" />
            </div>
        </section>
    )
}
