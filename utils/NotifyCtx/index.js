import React, { Component, createContext } from 'react'

const NotifyCtx = createContext();

export default class NotifyProvider extends Component {

    state = {
        showNotification: false,
        message: '',
        type: ''
    }

    showNotify = (msg,msgType) => {
        this.setState({ showNotification: true, message: msg, type: msgType, })
    }
    hideNotify = () => {
        this.setState({ showNotification: false, message: '', type: '' })
    }
    render() {
        return (
            <NotifyCtx.Provider value={{
                ...this.state,
                show: this.showNotify.bind(this),
                hide: this.hideNotify.bind(this),
            }}>
                {this.props.children}
            </NotifyCtx.Provider>
        )
    }
}

export { NotifyCtx };