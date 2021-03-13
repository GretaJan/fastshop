import { 
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
        // case LIKE_PRODUCT:
        //     return {
        //         ...state,
        //         likedProducts: state.likedProducts.concat(action.productId),
        //         products: action.array,
        //     }
        // case UNLIKE_PRODUCT:
        //     return {
        //         ...state,
        //         likedProducts: state.likedProducts.filter(item => item.id != action.productId),
        //         products: action.array,
        //     }
        // case GET_LIKED_PRODUCTS:
        //     return {
        //         ...state,
        //         payload: action.payload,
        //     }
        // case GET_LIKED_PRODUCTS_ERROR:
        //     return {
        //         ...state,
        //         payload: action.payload
        //     }
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