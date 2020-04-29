import { LOADING_GET_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_ERROR, GET_PRODUCT, POST_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {
    products: [],
    product: {},
    loading: null,
    error: '',
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_GET_PRODUCTS:
            return {
                ...state,
                loading: action.loading
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: action.loading,
                error: action.error
            }
        case GET_PRODUCTS_ERROR:
        return {
            ...state,
            error: action.error,
            loading: action.loading
        }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: action.loading
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.payload)
            }
        case EDIT_PRODUCT:
            // return state.products.map(item => {
            //     if(item.id === action.payload.id) {
            //         return {
            //             ...state,
            //             products: state.products.concat(action.payload) 
            //         }
            //     } else {
            //         return {
            //             ...state,
            //             item
            //         }
            //     }   
            // })
            let tempArray = state.products.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                products: tempArray.concat(action.payload),
                product: action.payload,

            }
        case DELETE_PRODUCT:
            return {
                ...state,
                product: action.payload,
                products: state.products.filter(item => (item.id !== action.payload)),
                
            }
        default:
            return state
    }
}