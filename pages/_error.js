import React, { useContext, useEffect } from "react"
// context
import { LoaderCtx } from "../Components/ui/LoaderCtx";
// components
import ButtonBlack from '../Components/ui/ButtonBlack'

function Error({ statusCode }) {

    // context
    const { loaded } = useContext(LoaderCtx);

    // hides preloader after component mounted
    useEffect(() => {
        setTimeout(() => {
            loaded();
        }, 500);
    }, []);

    const styl = {
        width:'90%',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '2.5rem',
        letterSpacing: '.5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
    }

    return (
        <div style={styl}>
            <p style={{ textAlign: 'center' }}>
                {statusCode
                    ? `Sorry, an error ${statusCode} occurred on server`
                    : `Sorry, an error occurred on client`}
            </p>
            <ButtonBlack name="Goto Home" clk={'/'} />
        </div>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error