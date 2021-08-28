import React from 'react'
// style
import HeadStyle from './Heading.module.css'

export default function Heading({heading}) {
    return (
        <div className={HeadStyle.headContainer}>
            <p className={HeadStyle.heading}>{heading}</p>
            <div className={HeadStyle.headLine}></div>
        </div>
    )
}
