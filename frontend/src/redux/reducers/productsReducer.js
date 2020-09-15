import { LOADING_GET_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_ERROR, UNMOUNT_PRODUCTS, GET_PRODUCT, LOADING_POST_PRODUCT, POST_PRODUCT, POST_PRODUCT_ERROR, LOADING_EDIT_PRODUCT, EDIT_PRODUCT, EDIT_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR } from '../actions/types';

const initialState = {
    products: [],
    product: {},
    loading: null,
    actionLoading: null,
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
        case LOADING_POST_PRODUCT:
            return {
                ...state,
                actionLoading: state.loading,
                error: state.error
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.payload),
                actionLoading: state.loading,
                error: state.error,
                page: action.page,
            }
        case POST_PRODUCT_ERROR:
            return {
                ...state,
                actionLoading: state.loading,
                error: state.error,
            }
        case LOADING_EDIT_PRODUCT:
            return {
                ...state,
                actionLoading: action.loading,
                error: action.error
            }
        case EDIT_PRODUCT:
            let tempArray = state.products.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                products: tempArray.concat(action.payload),
                product: action.payload,
                actionLoading: action.loading,
                error: action.error
            }
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                actionLoading: action.loading,
                error: action.error
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(item => (item.id !== action.payload)),
                error: state.error
            }
        case DELETE_PRODUCT_ERROR:
            return {
                ...state,
                error: state.error
            }
        default:
            return state
    }
}