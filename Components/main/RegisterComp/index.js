import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
// context
import { NotifyCtx } from '../../../utils/NotifyCtx';
import { StoreCtx } from '../../../utils/Store'
import { LoaderCtx } from '../../ui/LoaderCtx';
import { userLogin } from '../../../utils/Actions'
// component
import Notification from '../../ui/Notification';
import Loader2 from '../../ui/Loader2';
// style
import RegisterStyle from './RegisterComp.module.css'

export default function RegisterComp() {

    // states
    const [inputDetails, setInputDetails] = useState({
        userName: '',
        email: '',
        password: '',
        cPassword: ''
    });
    // router
    const router = useRouter();
    const { redirect } = router.query;

    // context
    const { showNotification, show, hide, message } = useContext(NotifyCtx);
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
        if (router.pathname === '/register') {
            if (inputDetails.email !== '') {
                document.getElementsByClassName(RegisterStyle.headerInput)[1].classList.add(RegisterStyle.hactive)
            } else {
                document.getElementsByClassName(RegisterStyle.headerInput)[1].classList.remove(RegisterStyle.hactive)
            }
        }
    }, [inputDetails.email, router.pathname]);

    // sends ajax req to server to login
    const submitHandler = async (e) => {

        e.preventDefault();
        loading2();

        const postData = {
            userName: inputDetails.userName,
            email: inputDetails.email,
            password: inputDetails.password,
        };
        if (showNotification) {
            hide();
        }
        if (inputDetails.password !== inputDetails.cPassword) {
            setTimeout(() => {
                show('Passwords do not match', 'error');
            });
            loaded2();
            return false;
        }

        const response = await fetch('/api/users/register', {
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
            dispatch({ type: userLogin(), payload: resData });
            loaded2();
            router.push(redirect || '/');
        } catch (error) {
            loaded2();
            showNotification && hide();
            show(error.message, 'error');
        }
    }

    // handles form's input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    return (<>
        {
            showNotification && <Notification message={message} type='error' />
        }
        <div className={RegisterStyle.container}>
            <p className={RegisterStyle.header}>Register</p>
            <form onSubmit={submitHandler} className={RegisterStyle.registerForm}>
                <div className={RegisterStyle.fieldContainer}>
                    <input
                        type="text"
                        name='userName'
                        value={inputDetails.userName}
                        placeholder='Enter user name'
                        onChange={handleChange}
                        className={RegisterStyle.inputField}
                        required
                    />
                    <label className={RegisterStyle.headerInput}>User Name</label>
                </div>
                <div className={RegisterStyle.fieldContainer}>
                    <input
                        type="email"
                        name='email'
                        value={inputDetails.email}
                        placeholder='mathew@example.com'
                        onChange={handleChange}
                        className={RegisterStyle.inputField}
                        required
                    />
                    <label className={RegisterStyle.headerInput}>Email</label>
                </div>
                <div className={RegisterStyle.fieldContainer}>
                    <input
                        type="password"
                        name='password'
                        value={inputDetails.password}
                        placeholder='Enter password'
                        onChange={handleChange}
                        className={RegisterStyle.inputField}
                        required
                    />
                    <label className={RegisterStyle.headerInput}>Password</label>
                </div>
                <div className={RegisterStyle.fieldContainer}>
                    <input
                        type="password"
                        name='cPassword'
                        value={inputDetails.cPassword}
                        placeholder='Confirm password'
                        onChange={handleChange}
                        className={RegisterStyle.inputField}
                        required
                    />
                    <label className={RegisterStyle.headerInput}>Confirm Password</label>
                </div>
                <div style={{ width: '95%', position: 'relative' }}>
                    {
                        isLoading2 ?
                            <Loader2 />
                            : <>
                                <button type="submit" className={RegisterStyle.registerBtn}>Register</button>
                                <div className={RegisterStyle.loginContainer}>
                                    <p className={RegisterStyle.loginText}>Already have an account?</p>
                                    <Link href={`/login?redirect=${redirect || '/'}`}>
                                        <div className={RegisterStyle.loginBtn}>Login</div>
                                    </Link>
                                </div>
                            </>
                    }
                </div>
            </form>
        </div>
    </>)
}