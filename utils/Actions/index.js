const addToCart = () =>{
    return {
        type: 'ADDTOCART'
    }
}
const removeFromCart = () =>{
    return {
        type: 'REMOVEFROMCART'
    }
}

export { addToCart, removeFromCart };