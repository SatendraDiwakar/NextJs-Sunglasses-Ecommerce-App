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
const incQuantity = () =>{
    return {
        type: 'INCQUANTITY'
    }
}
const decQuantity = () =>{
    return {
        type: 'DECQUANTITY'
    }
}

export { addToCart, removeFromCart, incQuantity, decQuantity };