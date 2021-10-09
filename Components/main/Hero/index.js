import React, { useEffect } from 'react'
import Image from 'next/image';
// component
import ButtonBlack from '../../ui/ButtonBlack';
// style
import HeroStyle from './Hero.module.css';
// image
import hero from '../../../public/Images/hero.jpg'
import heroCharacter from '../../../public/Images/heroCharacter.jpg'

export default function Hero({heroChar, heroBack}) {
    return (
        <div className={HeroStyle.hero}>
            <div className={HeroStyle.heroImage}>
                <Image
                    src={heroBack}
                    alt="sunglass ecommerce heroImage1"
                    layout="fill"
                />
            </div>
            <div className="container" style={{ height: '100%' }}>
                <div className={HeroStyle.containerItems}>
                    <div className={HeroStyle.headContainer}>
                        <div className={HeroStyle.heroCharacter}>
                            <Image
                                src={heroChar}
                                alt="sunglass ecommerce heroImage2"
                                layout="fill"
                                priority={true}
                            />
                        </div>
                    </div>
                    <div className={HeroStyle.tagLineContainer}>
                        <p className={HeroStyle.headline}>Premium Sun Glasses</p>
                        <p className={HeroStyle.tagline}>Beat the heat this summer</p>
                        <ButtonBlack name="shop now" clk={'/shop/sunglasses'} />
                    </div>
                </div>
            </div>

        </div>
    )
}
