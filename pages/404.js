import React, { useContext, useEffect } from 'react'
// context
import { LoaderCtx } from "../Components/ui/LoaderCtx";
// components
import ButtonBlack from '../Components/ui/ButtonBlack'

export default function Custom404({ err }) {

    // context
    const { loaded } = useContext(LoaderCtx);

    // hides preloader after component mounted
    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

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
        <p style={{
            marginBottom: '1rem',
            borderBottom: '1px solid #000',
        }}>404</p>
        <p>Sorry, Page not found.</p>
        <ButtonBlack name="Goto Home" clk={'/'} />
    </div>
}
