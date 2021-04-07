const cartActions = require('../../actions/cartAction');

const items = [
    {
        productId: 1,
        qty: 0,
        stock: 10,
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
        let result = cartActions.addToCart(items, product);
         expect(result.length).toBe(4);
    })
})

describe('', () => {
    test('add existing product to cart', () => {
        let result = cartActions.addToCart(items, product1);
         expect(result.length).toBe(3);
    })
})

describe('', () => {
    test('should increment product by 1', () => {
        let result = cartActions.incrementProductBy1(items, product1);
         expect(result[0].qty).toBe(2);
    })
})

describe('', () => {
    test('should return error because of lack of stock', () => {
        let result = cartActions.incrementProductBy1(items, product1);
         expect(result).toBe(1);
    })
})

describe('', () => {
    test('should dencrement product by 1', () => {
        let result = cartActions.decrementProductBy1(items, product2);
         expect(result[1].qty).toBe(0);
    })
})

describe('', () => {
    test('should return error, because qty cant be lower than 1', () => {
        //define qty to be 1
        product2.qty = 1;
        let result = cartActions.decrementProductBy1(items, product2);
         expect(result).toBe(1);
    })
})

describe('', () => {
    test('remove a product from the cart', () => {
        let result = cartActions.removeFromCart(items, product1);
        expect(result.length).toBe(2);
    })
})

describe('', () => {
    test('remove a product from the cart thats not in the cart', () => {
        let result = cartActions.removeFromCart(items, product);
        expect(result.length).toBe(3);
    })
})

describe('', () => {
    test('change the qty of the product, but its out of stock', () => {
        let result = cartActions.changeProductQty(items, product1, 10);
        expect(result).toBe(1);
    })
})

describe('', () => {
    test('change the qty of the product, but value is 0', () => {
        let result = cartActions.changeProductQty(items, product1, 0);
        expect(result).toBe(2);
    })
})

describe('', () => {
    test('change the qty of the product', () => {
        product1.qty = 0;
        let result = cartActions.changeProductQty(items, product1, 2);
        expect(result[0].qty).toBe(2);
    })
})