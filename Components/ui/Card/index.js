import React from 'react'
// style
import CardStyle from './Card.module.css'

export default function Card({title, children}) {
    return (
        <div className={CardStyle.container}>
            <p className={CardStyle.title}>{title}</p>
            <div className={CardStyle.content}>{children}</div>
        </div>
    )
}
