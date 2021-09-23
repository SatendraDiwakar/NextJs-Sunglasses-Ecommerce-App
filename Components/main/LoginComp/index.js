import React, { useState } from 'react'
import Link from 'next/link'
// style
import LoginStyle from './LoginComp.module.css'

export default function LoginComp() {

    const [inputDetails, setInputDetails] = useState({
        email: '',
        password: ''
    });

    // sends ajax req to server
    const submitHandler = async (e) => {
        e.preventDefault();
        // const { email, password } = e.target;
        // console.log(email.value, password.value);
        const data = {
            email: inputDetails.email,
            password: inputDetails.password
        };

        const result = await fetch('/api/users/login', {
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
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(response => {
            // console.log(response.status);
            return response.json()
        }).catch(error => {
            alert(error)
        })
        console.log(result);
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
                    <Link href="/register">
                        <div className={LoginStyle.registerBtn}>Register</div>
                    </Link>
                </div>
            </form>
        </div>
    </>)
}
