import React, { useContext, useEffect } from 'react'
// context
import { LoaderCtx } from '../Components/ui/LoaderCtx';
// component
import LoginComp from '../Components/main/LoginComp'


export default function Login() {

    // context
    const { loaded } = useContext(LoaderCtx);

    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    return (
        <LoginComp />
    )
}
