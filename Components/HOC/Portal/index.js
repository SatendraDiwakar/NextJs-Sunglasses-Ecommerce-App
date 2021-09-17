import React from 'react'
import ReactDom from 'react-dom'
// style
import PortalStyle from './Portal.module.css'

export default function Modal({ children, open }) {
    if (!open) return null
    if (typeof window !== 'undefined') {
        return ReactDom.createPortal(
            <>
            <div className={PortalStyle.overlay}></div>
            <div className={PortalStyle.container} >{children}</div>
            </>,
            document.getElementById('myportal')
        )
    } else {
        return null;
    }
}
