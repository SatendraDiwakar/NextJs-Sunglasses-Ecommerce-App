import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
// context
import { LoaderCtx } from '../../Components/ui/LoaderCtx';

export default function Brands() {

    // context
    const { loaded } = useContext(LoaderCtx);
    // router
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, [router.query.Brands]);

    return (
        <div>
            {router.query.Brands}
        </div>
    )
}
