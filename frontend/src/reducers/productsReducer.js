import { GET_PRODUCTS, FRW_TO_PRODUCTS } from '../actions/types';

const initialState = {
    products: [],
    products: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                subcategories: action.payload
            }
        case FRW_TO_PRODUCTS:
            return {
                ...state,
            }
        default:
            return state
    }
}