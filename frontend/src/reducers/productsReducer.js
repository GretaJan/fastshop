import { GET_PRODUCTS, GET_PRODUCT, POST_PRODUCT, EDIT_PRODUCT } from '../actions/types';

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
                products: state.products.concat(action.payload)
            }
        case EDIT_PRODUCT:
            // return {
            //     ...state,
            //     // products: state.products
            // }

            return state.products.map(item => {
                if(item.id === action.id) {
                    return {
                        ...state,
                        products: this.products.concat(action.payload)
                    }
                } else {
                    return item
                }
            })
         
        default:
            return state
    }
}