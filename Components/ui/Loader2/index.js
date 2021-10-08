import React from 'react'
// style
import Loader2Style from './Loader2.module.css'

export default function Loader2() {
    return (
        <div style={{padding: '4rem 0'}}>
            <div className={Loader2Style.loader + ' ' + Loader2Style.rotate} />
        </div>
    )
}
