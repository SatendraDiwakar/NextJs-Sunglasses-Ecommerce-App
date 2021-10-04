import React from 'react'
// style
import LoaderStyle from './Loader.module.css'

export default function Loader({ wid, heit }) {
    return (
        <div
            style={{ width: `${wid}px`, height: `${heit}px` }}
            className={LoaderStyle.loader + ' ' + LoaderStyle.rotate}
        />
    )
}
