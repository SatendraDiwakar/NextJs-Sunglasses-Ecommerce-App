import React from 'react'
// style
import Loader2Style from './Loader.module.css'

export default function Loader2() {
    return (
        <div className={Loader2Style.loader}>
            <div className={Loader2Style.circle+' '+Loader2Style.rotate}/>
        </div>
    )
}
