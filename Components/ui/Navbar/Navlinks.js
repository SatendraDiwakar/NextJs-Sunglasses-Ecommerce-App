import React from 'react'
// styles
import NavLinkStyle from './Navlinks.module.css';

export default function Navlinks({links}) {
    return (
        <div className={NavLinkStyle.container}>
            <ul className={NavLinkStyle.list}>
                {
                    links.map((itm,index)=>{
                        return <li key={itm +'Navlink'+ index} className={NavLinkStyle.listItem}>{itm}</li>
                    })
                }
            </ul>
        </div>
    )
}
