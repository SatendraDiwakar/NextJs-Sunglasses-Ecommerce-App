import React, { useContext, useState } from 'react'
import Image from 'next/image'
// context
import { ModalCtx } from '../../ModalCtx'
// component
import Heading from '../../ui/Heading'
import ButtonBlack from '../../ui/ButtonBlack'
// style
import SaleStyle from './Sale.module.css'


export default function Sale({ saleProd }) {   
    
    const saleProducts = saleProd.map(itm=>{ return {...itm, discountPrice: 49}});
    // context
    const context = useContext(ModalCtx);
    const { open } = context;

    function handleLoad(itemIndex) {
        if(document.getElementsByClassName(SaleStyle.price)[itemIndex]){
            document.getElementsByClassName(SaleStyle.price)[itemIndex].style='display: block';
            document.getElementsByClassName(SaleStyle.saleImage)[itemIndex].classList.add(SaleStyle.hovEffect);
        }
    }

    return (
        <section id="Sale" className={SaleStyle.saleSection}>
            <Heading heading="sale" color="blk" />
            <div className={`container ${SaleStyle.container}`}>
                <div className={SaleStyle.gallery}>
                    {
                        saleProducts.map((itm, index) => {
                            return <div
                                key={`saleImage${index}`}
                                className={SaleStyle.saleImage }
                                onClick={() => { open(itm) }}
                            >
                                <Image
                                    src={itm.image}
                                    alt={`Sunglass ${index} on sale`}
                                    layout="fill"
                                    onLoadingComplete={()=>handleLoad(index)}
                                />
                                <div className={SaleStyle.price}>${itm.discountPrice} <span className={SaleStyle.discountPrice}>${itm.price} <div className={SaleStyle.cutLine} /></span></div>
                            </div>
                        })
                    }
                </div>
                <ButtonBlack name="view all" />
            </div>
        </section>
    )
}
