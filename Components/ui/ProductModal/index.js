import Image from 'next/image';
import React, { useContext } from 'react'
// context
import { ModalCtx } from '../../ModalCtx'
import { StoreCtx } from '../../../utils/Store';
import { addToCart } from '../../../utils/Actions';
// style
import ProductModalStyle from './ProductModal.module.css'

export default function ProductModal() {

    // context
    const context = useContext(ModalCtx);
    const { close, itmDetails } = context;
    const contextStore = useContext(StoreCtx);
    const { state, dispatch } = contextStore;

    const cartItem = {
        prodName: itmDetails.name,
        prodImage: itmDetails.image,
        prodPrice: itmDetails.sectionName === 'sale'?itmDetails.discountPrice :itmDetails.price,
        prodQuantity: 1,
        prodId: itmDetails._id
    }
    console.log(state);

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
                                <span className={ProductModalStyle.price} style={{ fontSize: '2.5rem', opacity: '1' }}>  ${itmDetails.price}</span>
                        }
                    </p>
                    <p className={ProductModalStyle.rating}>Rating : <span className={ProductModalStyle.rightDetailsValue}>{itmDetails.rating}</span></p>
                    <p className={ProductModalStyle.stock}>Stock : <span className={ProductModalStyle.rightDetailsValue}>{itmDetails.countInStock}</span></p>
                    <p className={ProductModalStyle.brand}>Brand : <span className={ProductModalStyle.rightDetailsValue}>{itmDetails.brand}</span></p>
                    <p className={ProductModalStyle.desc}>Description: <span className={ProductModalStyle.rightDetailsValue + ' ' + ProductModalStyle.descValue}>{itmDetails.description}</span></p>
                </div>
            </div>
            <div className={ProductModalStyle.ctaContainer}>
                <button
                    className={ProductModalStyle.btnAddToCart + ' ' + ProductModalStyle.btnCta}
                    onClick={() => dispatch({ 
                        type: addToCart, 
                        payload: cartItem
                    })}
                >Add To Cart</button>
                <button className={ProductModalStyle.btnBuyNow + ' ' + ProductModalStyle.btnCta}>Buy Now</button>
            </div>
        </div>
    )
}
