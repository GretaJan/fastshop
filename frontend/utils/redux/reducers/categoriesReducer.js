import { LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, REMOVE_GET_CATEGORIES_ERR, LOADING_POST_CATEGORY, POST_CATEGORY, POST_CATEGORY_ERROR, LOADING_EDIT_CATEGORY, EDIT_CATEGORY, EDIT_CATEGORY_ERROR, DELETE_CATEGORY, DELETE_CATEGORY_ERROR } from '../actions/types';

const initialState = {
       categories:[],
       category:{},
       loading: null,
       actionLoading: null,
       error: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_GET_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: ''
            }
        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case REMOVE_GET_CATEGORIES_ERR:
            return {
                ...state,
                error: ''
            }
        case LOADING_POST_CATEGORY:
            return {
                ...state,
                error: '',
                actionLoading: action.loading
            }
        case POST_CATEGORY:
            return {
                ...state,
                category: action.payload.category,
                categories: state.categories.concat(action.payload.category),
                error: action.error,
                actionLoading: action.loading
            }
        case POST_CATEGORY_ERROR:
            return {
                ...state,
                error: action.error,
                actionLoading: action.loading
            }
        case LOADING_EDIT_CATEGORY:
            return {
                ...state,
                error: action.error,
                actionLoading: action.loading
            }
        case EDIT_CATEGORY:
            let tempArray = state.categories.filter(item => item.id !== action.payload.category.id )
            return {
                ...state, 
                categories: tempArray.concat(action.payload.category),
                error: action.error,
                actionLoading: action.loading
            }
        case EDIT_CATEGORY_ERROR:
            return {
                ...state, 
                error: action.error,
                actionLoading: action.loading
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter((item) => item.id !== action.payload),
                error: action.error
            }  
        case DELETE_CATEGORY_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state; 
    }

}