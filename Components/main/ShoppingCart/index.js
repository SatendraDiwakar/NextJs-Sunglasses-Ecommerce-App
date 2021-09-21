import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
// icons
import { RiDeleteBin6Line } from 'react-icons/ri'
// context
import { StoreCtx } from '../../../utils/Store'
import { removeFromCart, incQuantity, decQuantity } from '../../../utils/Actions'
// style
import ShoppingCartStyle from './ShoppingCart.module.css'

function ShoppingCart() {

    // state
    const [windowSize,setWindowSize] = useState(window.innerWidth);
    // context
    const context = useContext(StoreCtx);
    const { state, dispatch, checkStock } = context;

    async function handleCartItemInc(reqType, id) {
        let checkStk = await checkStock(id);
        if (checkStk < 0) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        dispatch({ type: reqType, payload: { id } })
    }

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setWindowSize(window.innerWidth);
        })
    },[])

    return (<>
        <div className={ShoppingCartStyle.container} id='shoppingCartSection'>
            <div className={ShoppingCartStyle.itemContainer}>
                <div className={ShoppingCartStyle.headingContainer}>
                    <p className={ShoppingCartStyle.heading}>Shopping Cart</p>
                    <p className={ShoppingCartStyle.prodPriceHeading}>price</p>
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
                                                    onClick={() => handleCartItemInc(incQuantity, itm.prodId)}
                                                >+</button>
                                            </p>

                                        </div>

                                        {
                                            windowSize > 350 ?
                                                <button
                                                    className={ShoppingCartStyle.prodDelete}
                                                    onClick={() => dispatch({
                                                        type: removeFromCart,
                                                        payload: { id: itm.prodId }
                                                    })}
                                                >Delete</button>
                                                :
                                                <RiDeleteBin6Line
                                                    className={ShoppingCartStyle.prodDeleteIcon}
                                                    onClick={() => dispatch({
                                                        type: removeFromCart,
                                                        payload: { id: itm.prodId }
                                                    })}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={ShoppingCartStyle.subTotalContainer}>
                <p className={ShoppingCartStyle.subTotalHead}>Subtotal ( {state.cart.cartItems.reduce((total, itm) => total + itm.prodQuantity, 0)} items)</p>
                <p className={ShoppingCartStyle.subTotal}>$ {state.cart.cartItems.reduce((total, itm) => total + itm.prodQuantity * itm.prodPrice, 0)}</p>
                <button className={ShoppingCartStyle.btnCheckOut}>Check Out</button>
            </div>
        </div>
    </>
    )
}


export default dynamic(() => Promise.resolve(ShoppingCart), { ssr: false });