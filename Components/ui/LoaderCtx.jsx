import React, { Component } from 'react'

const LoaderCtx = React.createContext();

export default class LoaderProvider extends Component {
    
    state={
        isLoading: true,
    }

    loaded = () => {
        this.setState({isLoading: false})
    }

    loading = () => {
        this.setState({isLoading: true})
    }

    render() {
        return (
            <LoaderCtx.Provider value={{
                ...this.state, 
                loaded : this.loaded.bind(this), 
                loading : this.loading.bind(this)
            }}>
                {this.props.children}
            </LoaderCtx.Provider>
        )
    }
}

export { LoaderCtx }