import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
// context
import { StoreCtx } from '../../../utils/Store'
import { userLogin } from '../../../utils/Actions'
import { NotifyCtx } from '../../../utils/NotifyCtx'
// component
import Notification from '../../ui/Notification'
// style
import LoginStyle from './LoginComp.module.css'
import { LoaderCtx } from '../../ui/LoaderCtx';
import Loader2 from '../../ui/Loader2';

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
    const { showNotification, message, show, hide } = useContext(NotifyCtx);
    const { dispatch, state: { userInfo } } = useContext(StoreCtx);
    const { isLoading2, loaded2, loading2 } = useContext(LoaderCtx);

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
        loading2();

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
                dispatch({ type: userLogin(), payload: resData });
                loaded2();
                router.push(redirect || '/')
            }
        } catch (error) {
            loaded2();
            showNotification && hide();
            show(error.message, 'error');
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
                <div style={{ width: '95%', position: 'relative' }}>
                    {
                        isLoading2 ?
                            <Loader2 />
                            : <>
                                <button type="submit" className={LoginStyle.loginBtn}>Login</button>
                                <div className={LoginStyle.registerContainer}>
                                    <p className={LoginStyle.registerText}>Don't have an account?</p>
                                    <Link href={`/register?redirect=${redirect || '/'}`}>
                                        <div className={LoginStyle.registerBtn}>Register</div>
                                    </Link>
                                </div>
                            </>
                    }
                </div>
            </form>
        </div>
    </>)
}