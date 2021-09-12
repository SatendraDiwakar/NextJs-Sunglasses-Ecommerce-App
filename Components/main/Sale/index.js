import React, { useState } from 'react'
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


export default function Sale({saleProd}) {

    const saleImageArr = [sal1, sal2, sal3, sal4];
    const [loading, setLoading] = useState(false);
    let count = 0;

    function checkLoaded() {
        count++;
        if (count === 3)
            setLoading(true);
    }

    function handleClick(id){
        if(loading)
            alert(id)
    }

    return (
        <section id="Sale" className={SaleStyle.saleSection}>
            <Heading heading="sale" color="blk" />
            <div className={`container ${SaleStyle.container}`}>
                <div className={SaleStyle.gallery}>
                    {
                        saleProd.map((itm, index) => {
                            return <div
                                key={`saleImage${index}`}
                                className={SaleStyle.saleImage + ' ' + `${loading && SaleStyle.hovEffect}`}
                                onClick={()=>{handleClick("1")}}
                            >
                                <Image
                                    src={itm.image}
                                    alt={`Sunglass ${index} on sale`}
                                    layout="fill"
                                    placeholder={'blur'}
                                    blurDataURL
                                    onLoadingComplete={checkLoaded}
                                />
                                {loading && <div className={SaleStyle.price}>$49 <span className={SaleStyle.discountPrice}>{itm.price} <div className={SaleStyle.cutLine}/></span></div>}
                            </div>
                        })
                    }
                </div>
                <ButtonBlack name="view all" />
            </div>
        </section>
    )
}
