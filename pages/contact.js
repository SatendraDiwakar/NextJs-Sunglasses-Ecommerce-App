import React, { useContext, useEffect } from 'react'
// context
import { LoaderCtx } from '../Components/ui/LoaderCtx';
// components
import ContactComp from '../Components/main/ContactComp';

export default function Contact() {

    // context
    const { loaded } = useContext(LoaderCtx);

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    return (
        <>
            <ContactComp />
        </>
    )
}
