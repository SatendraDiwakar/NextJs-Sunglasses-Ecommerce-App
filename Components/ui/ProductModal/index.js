import React from 'react'
// style
import ProductModalStyle from './ProductModal.module.css'

export default function ProductModal() {
    return (
        <div className={ProductModalStyle.container}>
            <div className={ProductModalStyle.left}>left</div>
            <div className={ProductModalStyle.rigth}>right</div>
        </div>
    )
}
