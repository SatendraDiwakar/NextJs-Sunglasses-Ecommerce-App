import React, { useContext, useEffect } from 'react'
// backend
import ProductModel from '../../models/ProductModel';
import db from '../../utils/db';
// components
import BrandComp from '../../Components/main/BrandComp'
import Portal from '../../Components/HOC/Portal'
import ProductModal from '../../Components/ui/ProductModal';
import ButtonBlack from '../../Components/ui/ButtonBlack';
// context
import { LoaderCtx } from '../../Components/ui/LoaderCtx';
import { ModalCtx } from '../../Components/ModalCtx';
// router
import { useRouter } from 'next/router';

export default function Brand(props) {

    // context
    const { isOpen } = useContext(ModalCtx);
    const { loaded } = useContext(LoaderCtx);
    // router
    const router = useRouter();
    const { Brand } = router.query;

    // hides preloader on Brand change
    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, [Brand]);

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
            <p>{props.err.msg}</p>
            <ButtonBlack name="Goto Home" clk={'/'} />
        </div>
    }

    return (
        <>
            <Portal open={isOpen} >
                <ProductModal />
            </Portal>
            <BrandComp
                shopItem={props.products}
                brandType={Brand}
            />
        </>
    )
}

export async function getStaticPaths() {

    const brandTypes = ['RayBan', 'Burberry', 'Maui-Jim', 'Gucci',];

    // Get the paths we want to pre-render based on posts
    const paths = brandTypes.map((brand) => ({
        params: { Brand: brand, },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps(ctx) {
    // fetch products of specific brands
    const { params: { Brand } } = ctx;
    db.connect();
    const products = await ProductModel.find({ sectionName: 'sunGlassesShop', brand: Brand }).lean();
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