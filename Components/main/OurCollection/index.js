import React, { useEffect } from 'react'
import Image from 'next/image'
// component
import Heading from '../../ui/Heading'
import ButtonBlack from '../../ui/ButtonBlack'
// style
import collectionStyle from './Collection.module.css'
import g2car2 from '../../../public/Images/collection/g2car2.jpg'

export default function OurCollection() {


    return (
        <section id="OurCollection" className={collectionStyle.collectionSection}>
            <Heading heading="our collection" />
            <div className={`container ${collectionStyle.container}`}>
                <div className={collectionStyle.firstGrid}>
                    <div className={collectionStyle.gallery1}>
                        <div className={collectionStyle.g1col1 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g1col1.jpg"
                                alt="sunglass image collection 1"
                                layout='fill'
                                placeholder='blur'
                                blurDataURL="https://image-component.nextjs.gallery/placeholder"
                                priority={true}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col2 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g1col2.jpg"
                                alt="sunglass image collection 2"
                                layout='fill'
                                placeholder='blur'
                                blurDataURL="https://image-component.nextjs.gallery/placeholder"
                                priority={true}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col3 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g1col3.jpg"
                                alt="sunglass image collection 3"
                                layout='fill'
                                placeholder='blur'
                                blurDataURL="https://image-component.nextjs.gallery/placeholder"
                                priority={true}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col4 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g1col4.jpg"
                                alt="sunglass image collection 4"
                                layout='fill'
                                placeholder='blur'
                                blurDataURL="https://image-component.nextjs.gallery/placeholder"
                                priority={true}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col5 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g1col5.jpg"
                                alt="sunglass image collection 5"
                                layout='fill'
                                placeholder='blur'
                                blurDataURL="https://image-component.nextjs.gallery/placeholder"
                                priority={true}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g1col6 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g1col6.jpg"
                                alt="sunglass image collection 6"
                                layout='fill'
                                placeholder='blur'
                                blurDataURL="https://image-component.nextjs.gallery/placeholder"
                                priority={true}
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                    </div>
                    <div className={collectionStyle.g1car}>
                        <Image
                            src="/Images/collection/g1car1.jpg"
                            alt="man with sunglass"
                            layout='fill'
                            placeholder='blur'
                            blurDataURL="https://image-component.nextjs.gallery/placeholder"
                            priority={true}
                        />
                    </div>
                </div>
                <div className={collectionStyle.secondGrid}>
                    <div className={collectionStyle.g2car1}>
                        <Image
                            src="/Images/collection/g2car1.jpg"
                            alt="woman with sunglass 1"
                            layout='fill'
                        />
                    </div>
                    <div className={collectionStyle.gallery2}>
                        <div className={collectionStyle.g2col1 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g2col1.jpg"
                                alt="sunglass image collection 7"
                                layout='fill'
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g2col2 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g2col2.jpg"
                                alt="sunglass image collection 8"
                                layout='fill'
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g2col3 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g2col3.jpg"
                                alt="sunglass image collection 9"
                                layout='fill'
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                        <div className={collectionStyle.g2col4 + ' ' + collectionStyle.hovEffect}>
                            <Image
                                src="/Images/collection/g2col4.jpg"
                                alt="sunglass image collection 10"
                                layout='fill'
                            />
                            <p className={collectionStyle.price}>$99</p>
                        </div>
                    </div>
                    <div className={collectionStyle.g2car2}>
                        <Image
                            src={g2car2}
                            alt="woman with sunglass 2"
                            layout='fill'
                        />
                    </div>
                </div>
                <ButtonBlack name="see all" />
            </div>
        </section>
    )
}
