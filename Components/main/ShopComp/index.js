import React, { useContext } from 'react'
import Image from 'next/image'
// context
import { ModalCtx } from '../../ModalCtx';
// components
import Heading from '../../ui/Heading'
// style
import ShopStyle from './ShopComp.module.css'

export default function index({ shopItem, shopType }) {

    // adds discount price if sale products ar visited
    const products = shopItem.map(itm => {

        return { ...itm, discountPrice: 49 }
    });
    // context
    const { open } = useContext(ModalCtx);
    // identifiers
    let sectnHead;

    // Function to show price after image loaded
    function handleLoad(itemIndex) {
        if (document.getElementsByClassName(ShopStyle.price)[itemIndex]) {
            document.getElementsByClassName(ShopStyle.price)[itemIndex].style = 'display: block';
            document.getElementsByClassName(ShopStyle.prodImage)[itemIndex].classList.add(ShopStyle.hovEffect);
        }
    }

    if (shopType === 'ourCollection') {
        sectnHead = 'Our Collection'
    } else if (shopType === 'topSeller') {
        sectnHead = 'Top sellers'
    } else if (shopType === 'sunglasses') {
        sectnHead = 'Shop'
    } else {
        sectnHead = 'sale'
    }

    return (
        <section id="shop" className={ShopStyle.shopSection}>
            <Heading heading={sectnHead} />
            <div className={ShopStyle.container}>
                <div className={ShopStyle.gallery}>
                    {
                        products.map((itm, index) => {
                            return <div
                                key={itm._id}
                                className={ShopStyle.prodImage}
                                onClick={() => { open(itm) }}
                            >
                                <Image
                                    src={itm.image}
                                    alt={shopType === 'sale' ? `Sunglass on sale` : 'Sunglass'}
                                    layout="fill"
                                    onLoadingComplete={() => handleLoad(index)}
                                />
                                {
                                    shopType === 'sale' ?
                                        <div className={ShopStyle.price}>${itm.discountPrice} <span className={ShopStyle.discountPrice}>${itm.price} <div className={ShopStyle.cutLine} /></span></div>
                                        :
                                        <div className={ShopStyle.price}>${itm.price}</div>
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}
