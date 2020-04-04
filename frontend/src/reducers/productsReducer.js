import { GET_PRODUCTS, GET_PRODUCT, POST_PRODUCT } from '../actions/types';

const initialState = {
    products: [],
    product: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: products.concat(action.payload)
            }
        default:
            return state
    }
}