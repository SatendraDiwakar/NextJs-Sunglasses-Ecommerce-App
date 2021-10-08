import React from 'react'
import { useRouter } from 'next/router'
// style
import ButtonBlkStyle from './ButtonBlack.module.css'

export default function ButtonBlack({ name, clk }) {

    const router = useRouter();

    return <button
        className={ButtonBlkStyle.btnBlk}
        onClick={() => router.push(clk)}
    >{name}</button>
}
