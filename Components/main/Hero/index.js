import React, { useEffect } from 'react'
import Image from 'next/image';
// component
import ButtonBlack from '../../ui/ButtonBlack';
// style
import HeroStyle from './Hero.module.css';
// image
import hero from '../../../public/Images/hero.jpg'
import heroCharacter from '../../../public/Images/heroCharacter.jpg'

export default function Hero() {

    // useEffect(() => {
    //     alert(window.innerWidth + ',' + window.innerHeight);
    //     // 360,759
    // }, [])

    return (
        <div className={HeroStyle.hero}>
            <div className={HeroStyle.heroImage}>
                <Image
                    src={hero}
                    alt="sunglass ecommerce heroImage1"
                    layout="fill"
                    priority={true}
                />
            </div>
            <div className="container" style={{ height: '100%' }}>
                <div className={HeroStyle.containerItems}>
                    <div className={HeroStyle.headContainer}>
                        <div className={HeroStyle.heroCharacter}>
                            <Image
                                src={heroCharacter}
                                alt="sunglass ecommerce heroImage2"
                                layout="fill"
                                priority={true}
                                placeholder='blur'
                            />
                        </div>
                    </div>
                    <div className={HeroStyle.tagLineContainer}>
                        <p className={HeroStyle.headline}>Premium Sun Glasses</p>
                        <p className={HeroStyle.tagline}>Beat the heat this summer</p>
                        <ButtonBlack name="shop now" />
                    </div>
                </div>
            </div>

        </div>
    )
}
