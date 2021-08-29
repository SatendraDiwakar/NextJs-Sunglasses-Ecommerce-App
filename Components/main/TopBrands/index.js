import React from 'react'
import Image from 'next/image'
// components
import Heading from '../../ui/Heading'
// style
import TopBrandsStyle from './TopBrands.module.css'
// images
import RayBan from '../../../public/Images/Brands/RayBan.png'
import Burberry from '../../../public/Images/Brands/Burberry.png'
import mauiJim from '../../../public/Images/Brands/mauiJim.png'
import Gucci from '../../../public/Images/Brands/Gucci.png'

export default function TopBrands() {

    const brandsArr = [RayBan, Burberry, mauiJim, Gucci];

    return (
        <section id="TopBrands">
            <Heading heading="top brands" />
            <div className={`container ${TopBrandsStyle.container}`}>
                {
                    brandsArr.map((itm, index) => {
                        return <div key={`TopBrands ${index}`} className={TopBrandsStyle.brandImage}>
                            <Image
                                src={itm}
                                alt="rayban brand image"
                                layout="fill"
                            />
                        </div>
                    })
                }
            </div>
        </section>
    )
}
