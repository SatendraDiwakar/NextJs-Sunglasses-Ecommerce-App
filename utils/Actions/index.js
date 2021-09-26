// Cart Actions
const addToCart = () => {
    return 'ADDTOCART'
}
const removeFromCart = () => {
    return 'REMOVEFROMCART'
}
const incQuantity = () => {
    return 'INCQUANTITY'
}
const decQuantity = () => {
    return 'DECQUANTITY'
}
// User Actions
const userLogin = () => {
    return 'USER_LOGIN'
}
const userLogout = () => {
    return 'USER_LOGOUT'
}
const saveShippingAddress = () => {
    return 'SAVE_SHIPPING_ADDRESS'
}

export {
    addToCart,
    removeFromCart,
    incQuantity,
    decQuantity,
    userLogin,
    userLogout,
    saveShippingAddress
};