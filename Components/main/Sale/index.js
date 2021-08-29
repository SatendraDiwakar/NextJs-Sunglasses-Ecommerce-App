import React from 'react'
import Image from 'next/image'
// component
import Heading from '../../ui/Heading'
import ButtonBlack from '../../ui/ButtonBlack'
// style
import SaleStyle from './Sale.module.css'
// images
import sal1 from '../../../public/Images/sale/sal1.jpg'
import sal2 from '../../../public/Images/sale/sal2.jpg'
import sal3 from '../../../public/Images/sale/sal3.jpg'
import sal4 from '../../../public/Images/sale/sal4.jpg'


export default function Sale() {

    const saleImageArr = [sal1, sal2, sal3, sal4];

    return (
        <section id="Sale" className={SaleStyle.saleSection}>
            <Heading heading="sale" color="blk" />
            <div className={`container ${SaleStyle.container}`}>
                <div className={SaleStyle.gallery}>
                    {
                        saleImageArr.map((itm, index) => {
                            return <div key={`saleImage${index}`} className={SaleStyle.saleImage}>
                                <Image
                                    src={itm}
                                    alt={`Sunglass ${index} on sale`}
                                    layout="fill"
                                />
                                <p className={SaleStyle.price}>$49 <span className={SaleStyle.discountPrice}>$99 <div className={SaleStyle.cutLine}></div></span></p>
                            </div>
                        })
                    }
                </div>
                <ButtonBlack name="view all" />
            </div>
        </section>
    )
}
