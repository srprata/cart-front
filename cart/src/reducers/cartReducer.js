import { actionsTypes } from '../types';

const cartReducer = (state = {items: []}, action) => {
    switch(action.type){
        case actionsTypes.ADD_TO_CART:
            return { items: action.data.items }
        case actionsTypes.REMOVE_FROM_CART:
            return { items: action.data.items }
        case actionsTypes.CLEAR_CART:
            return {}
        default:
            return state;
    }
}

export default cartReducer;