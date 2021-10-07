import Image from 'next/image';
import React, { useContext, useEffect } from 'react'
// context
import { ModalCtx } from '../../ModalCtx'
import { NotifyCtx } from '../../../utils/NotifyCtx';
import { StoreCtx } from '../../../utils/Store';
import { addToCart } from '../../../utils/Actions';
// component
import Notification from '../Notification';
// style
import ProductModalStyle from './ProductModal.module.css'
import { useRouter } from 'next/router';

export default function ProductModal() {

    // context
    const { close, itmDetails } = useContext(ModalCtx);
    const { showNotification, message, show, hide } = useContext(NotifyCtx);
    const { dispatch } = useContext(StoreCtx);

    // router 
    const router = useRouter();

    const cartItem = {
        prodName: itmDetails.name,
        prodImage: itmDetails.image,
        prodPrice: itmDetails.sectionName === 'sale' ? itmDetails.discountPrice : itmDetails.price,
        prodQuantity: 1,
        prodId: itmDetails._id
    }

    // Add_to_cart button click functionality
    const handleAddCart = () => {
        hide();
        dispatch({
            type: addToCart(),
            payload: cartItem
        });
        setTimeout(() => {
            show('Added to Cart', 'success');
        })
    };

    // Buy_Now button click functionality
    const handleBuyNow = () => {
        hide();
        dispatch({
            type: addToCart(),
            payload: cartItem
        });
        close();
        router.push('/cart');
    };

    useEffect(() => {
        showNotification && hide();
    }, [router.pathname])

    return (
        <>
            {
                showNotification && <Notification message={message} />
            }
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
                        onClick={handleAddCart}
                    >Add To Cart</button>
                    <button
                        className={ProductModalStyle.btnBuyNow + ' ' + ProductModalStyle.btnCta}
                        onClick={handleBuyNow}
                    >Buy Now</button>
                </div>
            </div>
        </>
    )
}
