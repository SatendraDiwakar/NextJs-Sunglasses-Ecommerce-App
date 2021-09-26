import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
// context
import { StoreCtx } from '../../../utils/Store'
import { NotifyCtx } from '../../../utils/NotifyCtx'
import { userLogin } from '../../../utils/Actions'
// component
import Notification from '../../ui/Notification'
// style
import LoginStyle from './LoginComp.module.css'

export default function LoginComp() {

    // states
    const [inputDetails, setInputDetails] = useState({
        email: '',
        password: ''
    });
    
    // router
    const router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping

    // context
    const contextNotify = useContext(NotifyCtx);
    const { showNotification, message, show, hide } = contextNotify;
    const contextStore = useContext(StoreCtx);
    const { dispatch, state } = contextStore;
    const { userInfo } = state;

    // checking if user is logged in or not
    useEffect(() => {
        if (userInfo) {
            router.push('/')
        }
    }, []);

    // for adding class hactive to email label to get animation
    useEffect(() => {
        hide();
        if (router.pathname === '/login') {
            if (inputDetails.email !== '') {
                document.getElementsByClassName(LoginStyle.headerInput)[0].classList.add(LoginStyle.hactive)
            } else {
                document.getElementsByClassName(LoginStyle.headerInput)[0].classList.remove(LoginStyle.hactive)
            }
        }
    }, [inputDetails.email, router.pathname]);

    // sends ajax req to server to login
    const submitHandler = async (e) => {

        e.preventDefault();

        const postData = {
            email: inputDetails.email,
            password: inputDetails.password
        };

        const response = await fetch('/api/users/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(postData) // body data type must match "Content-Type" header
        });

        try {
            const resData = await response.json();
            if (response.status === 401) {
                throw new Error(resData.message);
            } else {
                console.log(resData);
                dispatch({ type: userLogin(), payload: resData });
                router.push(redirect || '/')
            }
        } catch (error) {
            showNotification && hide();
            show(error.message);
        }
    }

    // handles form's input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        hide();
        setInputDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    return (<>
        {
            showNotification &&
            <Notification message={message} type='error' />
        }
        <div className={LoginStyle.container}>
            <p className={LoginStyle.header}>Login</p>
            <form onSubmit={submitHandler} className={LoginStyle.loginForm}>
                <div className={LoginStyle.fieldContainer}>
                    <input
                        type="email"
                        name='email'
                        value={inputDetails.email}
                        placeholder='mathew@example.com'
                        onChange={handleChange}
                        className={LoginStyle.inputField}
                        required
                    />
                    <label className={LoginStyle.headerInput}>Email</label>
                </div>
                <div className={LoginStyle.fieldContainer}>
                    <input
                        type="password"
                        name='password'
                        value={inputDetails.password}
                        placeholder='Enter password'
                        onChange={handleChange}
                        className={LoginStyle.inputField}
                        required
                    />
                    <label className={LoginStyle.headerInput}>Password</label>
                </div>
                <button type="submit" className={LoginStyle.loginBtn}>Login</button>
                <div className={LoginStyle.registerContainer}>
                    <p className={LoginStyle.registerText}>Don't have an account?</p>
                    <Link href={`/register?redirect=${redirect || '/'}`}>
                        <div className={LoginStyle.registerBtn}>Register</div>
                    </Link>
                </div>
            </form>
        </div>
    </>)
}