//add or increment product on cart
const addToCart = (items, product) => {

    const cartItems = items.slice();

    let alreadyInCart = false;
    let outOfStock = false;

    cartItems.forEach(element => {

        //if product is already in cart
        if(element.productId === product.productId){

            alreadyInCart = true;

            //verify product stock
            product.stock - (element.qty + 1) >= 0 ? element.qty++ : outOfStock = true;
        }

    });

    //if product is not in cart, add product
    if(!alreadyInCart) {
        cartItems.push({...product, qty: 1})
    }

    return !outOfStock ? cartItems : outOfStock;

}

// remove product from cart
const removeFromCart = (items, product) => {

    const cartItems = items.slice().filter(
        element => element.productId !== product.productId
    );

    return cartItems;

}

// edit qty of products
const changeProductQty = (items, product, qty) => {

    const cartItems = items.slice();
    
    let error = 0;

    cartItems.forEach(element => {

        if(element.productId === product.productId){
            
            //verify product stock
            if(product.stock - qty < 0){
                error = 1;
            }

            //qty is bigger than 1
            if(qty <= 0){
                error = 2
            }

            if(error === 0){
                element.qty = qty;
            }

        }

    });

    return error === 0 ? cartItems : error;

}

//increment products by 1
const incrementProductBy1 = (items, product) => {

    const cartItems = items.slice();
    let error = 0;

    cartItems.forEach(element => {

        if(element.productId === product.productId){
            //verify product stock
            product.stock - (element.qty + 1) >= 0 ? element.qty++ : error = 1;
        }

    });

    return  error ? error : cartItems;

}

//decrement products by 1
const decrementProductBy1 = (items, product) => {

    const cartItems = items.slice();
    let error = 0;

    cartItems.forEach(element => {

        if(element.productId === product.productId){
            //verify if qty is bigger than 1
            product.qty > 1 ? element.qty-- : error = 1;
        }

    });

    return error ? error : cartItems;

}

module.exports = { addToCart, removeFromCart, changeProductQty, incrementProductBy1, decrementProductBy1 }