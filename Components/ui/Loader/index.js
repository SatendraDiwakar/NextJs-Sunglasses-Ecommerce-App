import React from 'react'
// style
import LoaderStyle from './Loader.module.css'

export default function Loader() {
    return (
        <div id="testLoad" className={LoaderStyle.loader + ' ' + LoaderStyle.rotate} />
    )
}
