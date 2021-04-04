import { actionsTypes } from '../types';

const productsReducer = (state = {}, action) => {
    switch(action.type){
        case actionsTypes.SET_PRODUCT:
            return {...state, data: action.data}
        default:
            return state;
    }
}

export default productsReducer;