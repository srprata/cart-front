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

const items = [
    {
        productId: 1,
        qty: 0,
        sotck: 10,
        title: 'Livro'
    },
    {
        productId: 2,
        qty: 1,
        stock: 15,
        title: 'TV'
    },
    {
        productId: 3,
        qty: 0,
        stock: 12,
        title: 'PC'
    }
];

const product = {
    productId: 4,
    stock: 10,
    qty:0,
    title: 'Skate'
}

const product1 = {
    productId: 1,
    stock: 2,
    qty:0,
    title: 'Livro'
}

const product2 = {
    productId: 2,
    stock: 10,
    qty: 2,
    title: 'Livro'
}

describe('', () => {
    test('add new product to cart', () => {
        let result = addToCart(items, product);
         expect(result.length).toBe(4);
    })
})

describe('', () => {
    test('add existing product to cart', () => {
        let result = addToCart(items, product1);
         expect(result.length).toBe(3);
    })
})

describe('', () => {
    test('should increment product by 1', () => {
        let result = incrementProductBy1(items, product1);
         expect(result[0].qty).toBe(2);
    })
})

describe('', () => {
    test('should return error because of lack os stock', () => {
        let result = incrementProductBy1(items, product1);
         expect(result).toBe(1);
    })
})

describe('', () => {
    test('should dencrement product by 1', () => {
        let result = decrementProductBy1(items, product2);
         expect(result[1].qty).toBe(0);
    })
})

describe('', () => {
    test('should return error, because qty cant be lower than 1', () => {
        //define qty to be 1
        product2.qty = 1;
        let result = decrementProductBy1(items, product2);
         expect(result).toBe(1);
    })
})

describe('', () => {
    test('remove a product from the cart', () => {
        let result = removeFromCart(items, product1);
        expect(result.length).toBe(2);
    })
})

describe('', () => {
    test('remove a product from the cart thats not in the cart', () => {
        let result = removeFromCart(items, product);
        expect(result.length).toBe(3);
    })
})

describe('', () => {
    test('change the qty of the product, but its out of stock', () => {
        let result = changeProductQty(items, product1, 10);
        expect(result).toBe(1);
    })
})

describe('', () => {
    test('change the qty of the product, but value is 0', () => {
        let result = changeProductQty(items, product1, 0);
        expect(result).toBe(2);
    })
})

describe('', () => {
    test('change the qty of the product', () => {
        product1.qty = 0;
        let result = changeProductQty(items, product1, 2);
        expect(result[0].qty).toBe(2);
    })
})