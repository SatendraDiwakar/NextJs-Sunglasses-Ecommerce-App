import React, { useContext, useEffect } from 'react'
// context
import { LoaderCtx } from '../Components/ui/LoaderCtx';

export default function Contact() {

    // context
    const { loaded } = useContext(LoaderCtx);

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    return (
        <div>
            conotact
        </div>
    )
}
