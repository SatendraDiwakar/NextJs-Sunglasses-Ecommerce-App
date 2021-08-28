import React from 'react'
// style
import ButtonBlkStyle from './ButtonBlack.module.css'

export default function ButtonBlack({name}) {
    return <button className={ButtonBlkStyle.btnBlk}>{name}</button>
}
