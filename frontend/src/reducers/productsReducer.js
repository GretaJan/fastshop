import { LOADING_GET_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_ERROR, UNMOUNT_PRODUCTS, GET_PRODUCT, POST_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {
    products: [],
    product: {},
    loading: null,
    loadingNext: null,
    error: '',
    currentPage: 1,
    lastPage: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_GET_PRODUCTS:
            return {
                ...state,
                loading: action.loading,
                loadingNext: action.loadingNext
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: state.products.concat(action.payload),
                loading: action.loading,
                loadingNext: action.loadingNext,
                error: action.error,
                currentPage: action.currentPage,
                lastPage: action.lastPage,
            }
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.error,
                loading: action.loading,
                loadingNext: action.loadingNext,
            }
        case UNMOUNT_PRODUCTS: 
            return {
                ...state,
                products: action.payload,
                currentPage: action.currentPage,
                lastPage: action.lastPage
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: action.loading,
                page: action.page,
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.payload),
                page: action.page,
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