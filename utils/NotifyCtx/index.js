import React, { Component, createContext } from 'react'

const NotifyCtx = createContext();

export default class NotifyProvider extends Component {

    state = {
        showNotification: false,
        message: '',
    }

    showNotify = (msg) => {
        this.setState({ showNotification: true, message: msg })
    }
    hideNotify = () => {
        this.setState({ ...this.state, showNotification: false })
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