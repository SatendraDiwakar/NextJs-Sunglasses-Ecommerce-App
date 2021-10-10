import React, { useContext, useEffect, useState } from 'react'
// context
import { LoaderCtx } from '../../ui/LoaderCtx';
import { NotifyCtx } from '../../../utils/NotifyCtx';
// component
import Notification from '../../ui/Notification'
import Loader2 from '../../ui/Loader2';

// styles
import ContactStyle from './Contact.module.css'

export default function ContactComp() {

    // states
    const [inputDetails, setInputDetails] = useState({
        fullname: '',
        email: '',
        message: ''
    });
    // context
    const { showNotification, message, show, hide } = useContext(NotifyCtx);
    const { isLoading2, loaded2, loading2 } = useContext(LoaderCtx);

    // hides notification after 5s
    useEffect(() => {
        if (showNotification) {
            loaded2();
            setTimeout(() => {
                hide();
            }, 5000);
        }
    }, [showNotification]);

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

    // contact form submit handler
    function submitHandler(e) {
        e.preventDefault();
        loading2();

        const postData = {
            fullname: inputDetails.fullname,
            email: inputDetails.email,
            message: inputDetails.message
        };

        show(`Thankyou ${postData.fullname}`);
        return false;
    }

    return (<>
        {
            showNotification &&
            <Notification message={message} />
        }
        <div className={ContactStyle.container}>
            <p className={ContactStyle.header}>Get in touch</p>
            <form onSubmit={submitHandler} className={ContactStyle.contactForm}>
                <div className={ContactStyle.fieldContainer}>
                    <input
                        type="text"
                        name='fullname'
                        value={inputDetails.fullname}
                        placeholder='John Smith'
                        onChange={handleChange}
                        className={ContactStyle.inputField}
                        required
                    />
                    <label className={ContactStyle.headerInput}>Full Name</label>
                </div>
                <div className={ContactStyle.fieldContainer}>
                    <input
                        type="email"
                        name='email'
                        value={inputDetails.email}
                        placeholder='john@example.com'
                        onChange={handleChange}
                        className={ContactStyle.inputField}
                        required
                    />
                    <label className={ContactStyle.headerInput}>Email</label>
                </div>
                <div className={ContactStyle.fieldContainer}>
                    <input
                        type="text"
                        name='message'
                        value={inputDetails.message}
                        placeholder='How can we help?'
                        onChange={handleChange}
                        className={ContactStyle.inputField}
                        required
                    />
                    <label className={ContactStyle.headerInput}>Message</label>
                </div>
                <div style={{ width: '95%', position: 'relative' }}>
                    {
                        isLoading2 ?
                            <Loader2 />
                            : <>
                                <button type="submit" className={ContactStyle.loginBtn}>Send</button>
                            </>
                    }
                </div>
            </form>
        </div>
    </>)
}
