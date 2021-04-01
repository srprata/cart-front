// import { actionsTypes } from '../types';

//add or increment product on cart
export const addToCart = (state, product) => {

    const cartItems = state.items.slice();

    let alreadyInCart = false;
    // let outOfStock = false;:?

    cartItems.forEach(element => {

        //if product is already in cart
        if(element.productId === product.productId){

            alreadyInCart = true;

            //verify product stock
            product.stock - element.qty + 1 > 0 ? element.qty++ : element.outOfStock = true;
        }

    });

    //if product is not in cart, add product
    if(!alreadyInCart) {
        cartItems.push({...product, qty: 1})
    }

    return cartItems;

}

// remove product from cart
export const removeFromCart = (items, product) => {

    const cartItems = items.slice().filter(
        element => element.productId !== product.productId
    );

    return cartItems;

}

// edit qty of products
export const changeQty = (items, product, qty) => {

}

//increment products by 1
export const increment = (items, product) => {

}

//decrement products by 1
export const decrement = (items, product) => {
    
}
// export const removeFromCart = (items, product) => (dispatch) => {

//     const cartItems = items.slice().filter(
//         element => element.productId !== product.productId
//     );

//     dispatch({
//         type: actionsTypes.REMOVE_FROM_CART, data: { cartItems }
//     })

// }