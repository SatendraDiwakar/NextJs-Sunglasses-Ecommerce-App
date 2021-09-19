import React, { Component } from 'react'

const ModalCtx = React.createContext();

export default class ModalProvider extends Component {
    
    state={
        isOpen: false,
        itmDetails: {},
    }
    
    open(itm) {
        this.setState({isOpen: true, itmDetails: itm})
    }
    close() {
        this.setState({isOpen: false})
    }

    render() {
        return (
            <ModalCtx.Provider value={{
                ...this.state, 
                open : this.open.bind(this), 
                close : this.close.bind(this)
            }}>
                {this.props.children}
            </ModalCtx.Provider>
        )
    }
}

export { ModalCtx }