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

    // router
    const router = useRouter();
    const { shopType } = router.query;

    // hides preloader on Brand change
    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    // if error occured then return message
    if (props.err.status) {
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
            <ButtonBlack name="Goto Shop" clk={'/shop/sunglasses'} />
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

export async function getStaticPaths() {

    const shopTypes = ['sale', 'topSeller', 'ourCollection', 'sunglasses']

    // Get the paths we want to pre-render based on posts
    const paths = shopTypes.map((type) => ({
        params: { shopType: type, },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps(ctx) {
    const { params: { shopType } } = ctx;
    let myQuery;
    if (shopType === 'sale') {
        myQuery = { sectionName: 'sale' }
    } else {
        myQuery = { sectionName: 'sunGlassesShop' }
    }
    db.connect();
    const products = await ProductModel.find(myQuery).lean();
    db.disconnect();

    if (products.length === 0) {
        return {
            props: {
                err: { status: true, msg: 'Sorry stock is empty.' },
            },
            // Next.js will attempt to re-generate the page:
            // - When a request comes in
            // - At most once every 10 seconds
            revalidate: 1, // In seconds
        }
    }

    return {
        props: {
            products: products.map(db.convertDocToObj),
            err: { status: false, msg: '' },
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 1, // In seconds
    }
}