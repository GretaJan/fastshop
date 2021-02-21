import { ActionSheetIOS } from 'react-native';
import { 
    LOADING_GET_PRODUCTS, 
    GET_PRODUCTS, 
    GET_PRODUCTS_APPEND,
    GET_PRODUCTS_ERROR, 
    REMOVE_GET_PRODUCTS_ERROR,
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
    SAVE_COMBINATION,
    LIKE_PRODUCT, 
    UNLIKE_PRODUCT,
    GET_LIKED_PRODUCTS,
    GET_LIKED_PRODUCTS_ERROR,
} from '../actions/types';

const initialState = {
    products: [],
    product: {},
    likedProducts: [],
    loading: null,
    actionLoading: null,
    loadingNext: null,
    error: '',
    nextPage: 0,
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
                loading: false,
                loadingNext: false,
                error: '',
                nextPage: action.nextPage,
                lastPage: action.lastPage,
            }
        case GET_PRODUCTS_APPEND:
            return {
                ...state,
                products: state.products.concat(action.payload),
                loadingNext: false,
                nextPage: action.nextPage,
                lastPage: action.lastPage,
            }
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
                loadingNext: false,
            }
        case REMOVE_GET_PRODUCTS_ERROR:
            return {
                ...state,
                error: '',
                loading: '',
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
                loading: true,
                error: ''
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: state.products.find(item => item.id == action.productId),
                loading: false,
                error: ''
            }
        case GET_PRODUCT_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case LIKE_PRODUCT:
            return {
                ...state,
                likedProducts: state.likedProducts.concat(action.productId),
                products: action.array,
            }
        case UNLIKE_PRODUCT:
            return {
                ...state,
                likedProducts: state.likedProducts.filter(item => item.id != action.productId),
                products: action.array,
            }
        case GET_LIKED_PRODUCTS:
            return {
                ...state,
                payload: action.payload,
            }
        case GET_LIKED_PRODUCTS_ERROR:
            return {
                ...state,
                payload: action.payload
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