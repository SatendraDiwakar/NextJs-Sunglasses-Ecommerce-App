import React from 'react'
import Image from 'next/image';
// component
import ButtonBlack from '../../ui/ButtonBlack';
// style
import HeroStyle from './Hero.module.css';

export default function Hero() {
    return (
        <div className={HeroStyle.hero}>

            <div className={HeroStyle.heroImage}>
                <Image
                    src="/Images/hero.jpg"
                    alt="sunglass ecommerce heroImage1"
                    layout="fill"
                    priority
                />
            </div>
            <div className="container" style={{ height: '100%' }}>
                <div className={HeroStyle.containerItems}>
                    <div className={HeroStyle.headContainer}>
                        <div className={HeroStyle.heroCharacter}>
                            <Image
                                src="/Images/heroCharacter.jpg"
                                alt="sunglass ecommerce heroImage2"
                                layout="fill"
                                priority
                            />
                        </div>
                        <p className={HeroStyle.headline}>Sun Glasses</p>
                    </div>

                    <div className={HeroStyle.tagLineContainer}>
                        <p className={HeroStyle.tagline}>Beat the heat this summer</p>
                        <ButtonBlack name="shop now" />
                    </div>
                </div>
            </div>

        </div>
    )
}
