import { 
    LOADING_GET_PRODUCTS, 
    GET_PRODUCTS, 
    GET_PRODUCTS_ERROR, 
    UNMOUNT_PRODUCTS, 
    LOADING_GET_PRODUCT, 
    GET_PRODUCT, 
    GET_PRODUCT_ERROR, 
    LOADING_POST_PRODUCT, 
    POST_PRODUCT, 
    POST_PRODUCT_ERROR, 
    LOADING_EDIT_PRODUCT, 
    EDIT_PRODUCT, 
    EDIT_PRODUCT_ERROR, 
    DELETE_PRODUCT, 
    DELETE_PRODUCT_ERROR,
    SAVE_COMBINATION
} from '../actions/types';

const initialState = {
    products: [],
    product: {},
    loading: null,
    actionLoading: null,
    loadingNext: null,
    error: '',
    currentPage: 1,
    lastPage: null,
    productCombinations: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_GET_PRODUCTS:
            return {
                ...state,
                loading: action.loading,
                loadingNext: action.loadingNext,
                error: action.error
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
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
        case LOADING_GET_PRODUCT:
            return {
                ...state,
                loading: action.loading,
                error: action.error
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: action.loading,
                error: action.error
            }
        case GET_PRODUCT_ERROR:
            return {
                ...state,
                error: action.error,
                loading: action.loading,
            }
        case LOADING_POST_PRODUCT:
            return {
                ...state,
                actionLoading: state.loading,
                error: state.error,
                page: action.page,
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.payload.product),
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
            let tempArray = state.products.filter(item => item.id !== action.payload.product.id);
            return {
                ...state,
                products: tempArray.concat(action.payload.product),
                product: action.payload.product,
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
        case SAVE_COMBINATION: 
            return {
                ...state,
                productCombinations: productCombinations.concat(action.payload)
        }
        default:
            return state
    }
}