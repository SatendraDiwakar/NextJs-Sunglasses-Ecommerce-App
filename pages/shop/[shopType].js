import React, { useContext, useEffect } from 'react'
// backend
import ProductModel from '../../models/ProductModel';
import db from '../../utils/db';
// components
import ShopComp from '../../Components/main/ShopComp'
import Portal from '../../Components/HOC/Portal'
import ProductModal from '../../Components/ui/ProductModal';
import ButtonBlack from '../../Components/ui/ButtonBlack';
// context
import { LoaderCtx } from '../../Components/ui/LoaderCtx';
import { ModalCtx } from '../../Components/ModalCtx';
import { useRouter } from 'next/router';

export default function Shop(props) {

    // context
    const { isOpen } = useContext(ModalCtx);
    const { loaded } = useContext(LoaderCtx);

    const router = useRouter();
    const { shopType } = router.query;

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    if (props.err) {
        return <div
            style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '2.5rem',
                letterSpacing: '.5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)'
            }}>
            <p>Page not found.</p>
            <ButtonBlack name="Goto Shop" clk={'/shop/sale'} />
        </div>
    }

    return (
        <>
            <Portal open={isOpen} >
                <ProductModal />
            </Portal>
            <ShopComp
                shopItem={
                    shopType !== 'sale' ?
                        props.products.filter(itm => itm.sectionName !== 'sale')
                        : props.products
                }
                shopType={shopType}
            />
        </>
    )
}


export async function getServerSideProps(ctx) {
    const { params: { shopType } } = ctx;
    let myQuery;
    const shopTypes = ['sale', 'topSeller', 'ourCollection', 'sunglass']
    if (shopType === 'sale') {
        myQuery = { sectionName: 'sale' }
    } else {
        myQuery = { sectionName: 'sunGlassesShop' }
    }
    if (!shopTypes.includes(shopType)) {
        return {
            props: {
                err: true
            }
        }
    }
    db.connect();
    const products = await ProductModel.find(myQuery).lean();
    db.disconnect();
    return {
        props: {
            products: products.map(db.convertDocToObj),
            err: false,
        },
    }
}