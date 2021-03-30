import { actionsTypes } from './types';

const INITIAL_STATE = {
    productId: null,
    title: null,
    description: null,
    price: 0,
    stock: 0,
    qty: 0,
    totalPrice: 0
}

function rootReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case actionsTypes.SET_PRODUCT:
            return {...state,
                productId: action.productId,
                title: action.title,
                description: action.description,
                price: action.price,
                stock: action.stock,
                totalPrice: action.price,
                qty: action.qty
            };
        case actionsTypes.SET_QTY:
            return {...state,
                totalPrice: action.totalPrice,
                qty: action.qty
            };    
        case actionsTypes.ADD_PRODUCT:
            return {...state,
                qty: state.qty + action.qty,
                totalPrice: state.totalPrice + action.price
            };
        case actionsTypes.REM_PRODUCT:
            return {...state,
                qty: state.qty - action.qty,
                totalPrice: state.totalPrice - action.price
            }
        case actionsTypes.CLEAR_CART:
            return INITIAL_STATE
        default:
            return state;
    }
}

export default rootReducer;