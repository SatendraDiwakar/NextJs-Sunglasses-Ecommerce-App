import React, { useEffect, useState } from 'react'
// style
import LoginStyle from './LoginComp.module.css'

export default function LoginComp() {
    return (<>
        <div className={LoginStyle.container}>
            <p className={LoginStyle.header}>Login</p>
            <form action="" className={LoginStyle.loginForm}>
                <div className={LoginStyle.fieldContainer}>
                    <input type="text" className={LoginStyle.inputField} required />
                    <p className={LoginStyle.headerInput}>User Name</p>
                </div>
                <div className={LoginStyle.fieldContainer}>
                    <input type="password" className={LoginStyle.inputField} required />
                    <p className={LoginStyle.headerInput}>Password</p>
                </div>
                <button className={LoginStyle.loginBtn}>Login</button>
                <div className={LoginStyle.registerContainer}>
                    <p className={LoginStyle.registerText}>Don't have an account ?</p>
                    <button className={LoginStyle.registerBtn}>Register</button>
                </div>
            </form>
        </div>
    </>)
}
