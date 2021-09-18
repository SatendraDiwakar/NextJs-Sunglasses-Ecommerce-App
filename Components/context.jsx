import React, { Component } from 'react'

const ShopContext = React.createContext();

export default class ShopProvider extends Component {
    
    state={
        isOpen: false,
        itmDetails: {}
    }
    
    open(itm) {
        this.setState({isOpen: true, itmDetails: itm})
    }
    close() {
        this.setState({isOpen: false})
    }

    render() {
        return (
            <ShopContext.Provider value={{
                ...this.state, 
                open : this.open.bind(this), 
                close : this.close.bind(this)
            }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}

export { ShopContext }