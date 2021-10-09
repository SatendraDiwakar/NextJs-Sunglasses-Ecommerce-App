import React, { useContext } from 'react'
import Image from 'next/image'
// context
import { ModalCtx } from '../../ModalCtx';
// components
import Heading from '../../ui/Heading'
// style
import BrandStyle from './BrandComp.module.css'

export default function index({ shopItem, brandType }) {

    // context
    const { open } = useContext(ModalCtx);

    function handleLoad(itemIndex) {
        if (document.getElementsByClassName(BrandStyle.price)[itemIndex]) {
            document.getElementsByClassName(BrandStyle.price)[itemIndex].style = 'display: block';
            document.getElementsByClassName(BrandStyle.prodImage)[itemIndex].classList.add(BrandStyle.hovEffect);
        }
    }

    return (
        <section id="brand" className={BrandStyle.brandSection}>
            <Heading heading={brandType} />
            <div className={BrandStyle.container}>
                <div className={BrandStyle.gallery}>
                    {
                        shopItem.map((itm, index) => {
                            return <div
                                key={itm._id}
                                className={BrandStyle.prodImage}
                                onClick={() => { open(itm) }}
                            >
                                <Image
                                    src={itm.image}
                                    alt={`${brandType} Sunglasses`}
                                    layout="fill"
                                    onLoadingComplete={() => handleLoad(index)}
                                />
                                <div className={BrandStyle.price}>${itm.price}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}
