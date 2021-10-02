import React, { useContext } from 'react'
// context
import { NotifyCtx } from '../../../utils/NotifyCtx'
// style
import NotificationStyle from './Notification.module.css'

export default function Notification({ message }) {

    const { type, hide } = useContext(NotifyCtx);

    return (
        <div className={NotificationStyle.container} style={type === 'error' ? { background: 'red', color: '#fff' } : { background: '#00ff82' }}>
            <p>{message}</p>
            <button className={NotificationStyle.closeBtn} onClick={hide}>X</button>
        </div>
    )
}
