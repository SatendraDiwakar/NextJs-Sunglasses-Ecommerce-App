import Image from 'next/image';
import React, { useContext } from 'react'
// context
import { ShopContext } from '../../context'
// style
import ProductModalStyle from './ProductModal.module.css'

export default function ProductModal() {

    const context = useContext(ShopContext);
    const { close, itmDetails } = context;

    return (
        <div className={ProductModalStyle.container}>
            <div
                className={ProductModalStyle.close}
                onClick={() => close()}
            >X</div>
            <h3 className={ProductModalStyle.name}>{itmDetails.name}</h3>
            <div className={ProductModalStyle.details}>
                <div className={ProductModalStyle.left}>
                    <div className={ProductModalStyle.prodImg}>
                        <Image
                            src={itmDetails.image}
                            alt={`Sunglass image`}
                            layout="fill"
                        />
                    </div>
                </div>
                <div className={ProductModalStyle.right}>
                    <p className={ProductModalStyle.disPrice}>Price :
                        {
                            itmDetails.sectionName === 'sale' ?
                                <>
                                    <span className={ProductModalStyle.rightDetailsValue}> ${itmDetails.discountPrice}</span>
                                    <span className={ProductModalStyle.price}>  ${itmDetails.price}
                                        <span className={ProductModalStyle.cutLine}></span>
                                    </span>
                                </>
                                :
                                <span className={ProductModalStyle.price} style={{fontSize: '2.5rem',opacity: '1'}}>  ${itmDetails.price}</span>
                        }
                    </p>
                    <p className={ProductModalStyle.rating}>Rating : <span className={ProductModalStyle.rightDetailsValue}>{itmDetails.rating}</span></p>
                    <p className={ProductModalStyle.stock}>Stock : <span className={ProductModalStyle.rightDetailsValue}>{itmDetails.countInStock}</span></p>
                    <p className={ProductModalStyle.brand}>Brand : <span className={ProductModalStyle.rightDetailsValue}>{itmDetails.brand}</span></p>
                    <p className={ProductModalStyle.desc}>Description: <p className={ProductModalStyle.rightDetailsValue + ' ' + ProductModalStyle.descValue}>{itmDetails.description}</p></p>
                </div>
            </div>
            <div className={ProductModalStyle.ctaContainer}>
                <button className={ProductModalStyle.btnAddToCart + ' ' + ProductModalStyle.btnCta}>Add To Cart</button>
                <button className={ProductModalStyle.btnBuyNow + ' ' + ProductModalStyle.btnCta}>Buy Now</button>
            </div>
        </div>
    )
}
