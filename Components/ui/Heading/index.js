import React from 'react'
// style
import HeadStyle from './Heading.module.css'

export default function Heading({ heading, color }) {

    return (
        <div className={HeadStyle.headContainer}>
            <p className={HeadStyle.heading} style={color === 'blk' ? { color: '#000' } : { color: '#c05858' }}>{heading}</p>
            <div className={HeadStyle.headLineContainer}>
                <div className={HeadStyle.headLine}></div>
            </div>
        </div>
    )
}
