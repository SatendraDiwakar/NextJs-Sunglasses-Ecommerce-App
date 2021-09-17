import React, { Component } from 'react'

const ShopContext = React.createContext();

export default class ShopProvider extends Component {
    
    state={
        isOpen: false
    }
    
    open(id) {
        this.setState({isOpen: true})
        console.log(id);
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