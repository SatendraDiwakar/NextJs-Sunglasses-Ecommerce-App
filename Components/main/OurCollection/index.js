import React from 'react'
import Image from 'next/image'
// component
import Heading from '../../ui/Heading'
import ButtonBlack from '../../ui/ButtonBlack'
// style
import collectionStyle from './Collection.module.css'

export default function OurCollection() {

    return (
        <section id="OurCollection" className={collectionStyle.collectionSection}>
            <Heading heading="our collection" />
            <div className={`container ${collectionStyle.container}`}>
                <div className={collectionStyle.firstGrid}>
                    <div className={collectionStyle.gallery1}>
                        <img src="/Images/collection/g1col1.jpg" alt="sunglass image collection 1" className={collectionStyle.g1col1} />
                        <img src="/Images/collection/g1col2.jpg" alt="sunglass image collection 2" className={collectionStyle.g1col2} />
                        <img src="/Images/collection/g1col3.jpg" alt="sunglass image collection 3" className={collectionStyle.g1col3} />
                        <img src="/Images/collection/g1col4.jpg" alt="sunglass image collection 4" className={collectionStyle.g1col4} />
                        <img src="/Images/collection/g1col5.jpg" alt="sunglass image collection 5" className={collectionStyle.g1col5} />
                        <img src="/Images/collection/g1col6.jpg" alt="sunglass image collection 6" className={collectionStyle.g1col6} />
                    </div>
                    <img src="/Images/collection/g1car1.jpg" alt="man with sunglass" className={collectionStyle.g1car}/>
                </div>
                <div className={collectionStyle.secondGrid}>
                    <img src="/Images/collection/g2car1.jpg" alt="woman with sunglass" className={collectionStyle.g2car1}/>
                    <div className={collectionStyle.gallery2}>
                        <img src="/Images/collection/g2col1.jpg" alt="sunglass image collection 7" className={collectionStyle.g2col1} />
                        <img src="/Images/collection/g2col2.jpg" alt="sunglass image collection 8" className={collectionStyle.g2col2} />
                        <img src="/Images/collection/g2col3.jpg" alt="sunglass image collection 9" className={collectionStyle.g2col3} />
                        <img src="/Images/collection/g2col4.jpg" alt="sunglass image collection 10" className={collectionStyle.g2col4} />
                    </div>
                    <img src="/Images/collection/g2car2.jpg" alt="woman with sunglass" className={collectionStyle.g2car2}/>
                </div>
                <ButtonBlack name="see all" />
            </div>
        </section>
    )
}
