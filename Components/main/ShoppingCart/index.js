import React, { useContext } from 'react'
import Image from 'next/image'
import { StoreCtx } from '../../../utils/Store'
import { removeFromCart, incQuantity, decQuantity } from '../../../utils/Actions'
// style
import ShoppingCartStyle from './ShoppingCart.module.css'

export default function Cart() {

    const context = useContext(StoreCtx);
    const { state, dispatch } = context;

    return (<>
        <div className={ShoppingCartStyle.container}>
            <div className={ShoppingCartStyle.itemContainer}>
                <div className={ShoppingCartStyle.headingContainer}>
                    <p className={ShoppingCartStyle.heading}>Shopping Cart</p>
                    <p className={ShoppingCartStyle.prodPrice}>price</p>
                </div>
                <div className={ShoppingCartStyle.line}></div>
                <div className={ShoppingCartStyle.prodContainer}>
                    {
                        state.cart.cartItems.map(itm => {
                            return <div key={itm.prodId} className={ShoppingCartStyle.item}>
                                <div className={ShoppingCartStyle.prodImage}>
                                    <Image
                                        src={itm.prodImage}
                                        alt={`Sunglass image`}
                                        layout='fill'
                                    />
                                </div>
                                <div className={ShoppingCartStyle.prodDetails}>
                                    <div className={ShoppingCartStyle.prodNamePrice}>
                                        <p className={ShoppingCartStyle.prodName}>{itm.prodName}</p>
                                        <p className={ShoppingCartStyle.prodPrice}>$ {itm.prodPrice * itm.prodQuantity}</p>
                                    </div>
                                    <div className={ShoppingCartStyle.prodActions}>
                                        <div className={ShoppingCartStyle.prodQunatity}>

                                            <p>Quantity :
                                                <button
                                                    className={ShoppingCartStyle.btnQuant}
                                                    onClick={() => dispatch({
                                                        type: decQuantity,
                                                        payload: { id: itm.prodId }
                                                    })}
                                                >-</button>
                                                {itm.prodQuantity}
                                                <button
                                                    className={ShoppingCartStyle.btnQuant}
                                                    onClick={() => dispatch({
                                                        type: incQuantity,
                                                        payload: { id: itm.prodId }
                                                    })}
                                                >+</button>
                                            </p>

                                        </div>
                                        <button
                                            className={ShoppingCartStyle.prodDelete}
                                            onClick={() => dispatch({
                                                type: removeFromCart,
                                                payload: { id: itm.prodId }
                                            })}
                                        >Delete</button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </>
    )
}
