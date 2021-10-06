import React, { Component } from 'react'

const LoaderCtx = React.createContext();

export default class LoaderProvider extends Component {
    
    state={
        isLoading: true,
        isLoading2: false,
    }

    loaded = () => {
        this.setState({isLoading: false})
    }

    loading = () => {
        this.setState({isLoading: true})
    }
    
    loaded2 = () => {
        this.setState({isLoading2: false})
    }

    loading2 = () => {
        this.setState({isLoading2: true})
    }

    render() {
        return (
            <LoaderCtx.Provider value={{
                ...this.state, 
                loaded : this.loaded.bind(this), 
                loading : this.loading.bind(this),
                loaded2 : this.loaded2.bind(this), 
                loading2 : this.loading2.bind(this),
            }}>
                {this.props.children}
            </LoaderCtx.Provider>
        )
    }
}

export { LoaderCtx }