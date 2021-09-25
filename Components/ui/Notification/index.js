import React from 'react'
// style
import NotificationStyle from './Notification.module.css'

export default function Notification({ message, type, closeNotification }) {

    return (
        <div className={NotificationStyle.container} style={{ background: type === 'error' ? 'red' : 'green' }}>
            <p>{message}</p>
            <button className={NotificationStyle.closeBtn} onClick={closeNotification}>X</button>
        </div>
    )
}
