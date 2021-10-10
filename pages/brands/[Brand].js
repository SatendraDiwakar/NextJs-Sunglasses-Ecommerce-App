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


export async function getServerSideProps(ctx) {
    const { params: { Brand } } = ctx;
    const brandTypes = ['RayBan', 'Burberry', 'Maui-Jim', 'Gucci'];
    if (!brandTypes.includes(Brand)) {
        return {
            props: {
                err: { status: true, msg: 'Page not found.' },
            }
        }
    }
    db.connect();
    const products = await ProductModel.find({ sectionName: 'sunGlassesShop', brand: Brand }).lean();
    db.disconnect();
    if (products.length === 0) {
        return {
            props: {
                err: { status: true, msg: 'Sorry stock is empty.' },
            }
        }
    }
    return {
        props: {
            products: products.map(db.convertDocToObj),
            err: { status: false, msg: '' },
        },
    }
}