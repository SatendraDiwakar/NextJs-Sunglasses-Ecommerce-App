import { useRouter } from 'next/router'
import React from 'react'

export default function Brands() {

    const router = useRouter();
    return (
        <div>
            {router.query.Brands}
        </div>
    )
}
