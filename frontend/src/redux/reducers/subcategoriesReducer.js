import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_APPEND, GET_SUBCATEGORIES_ERROR, FRW_TO_SUBCATEGORIES, LOADING_POST_SUBCATEGORY, POST_SUBCATEGORY, POST_SUBCATEGORY_ERROR,  LOADING_EDIT_SUBCATEGORY, EDIT_SUBCATEGORY, EDIT_SUBCATEGORY_ERROR, REMOVE_GET_SUBCATEGORIES_ERR, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_ERROR } from '../actions/types';

const initialState = {
    subcategories: [],
    subcategory: {},
    loading: null,
    actionLoading: null,
    loadingNext: null,
    error: '',
    nextPage: 0,
    lastPage: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_GET_SUBCATEGORIES:
            return {
                ...state,
                loading: action.loading,
                loadingNext: action.loadingNext,
                error: ''
            }
        case GET_SUBCATEGORIES:
            return {
                ...state,
                subcategories: action.payload,
                loading: false,
                loadingNext: false,
                error: '',
                nextPage: action.nextPage,
                lastPage: action.lastPage,
            }
        case GET_SUBCATEGORIES_APPEND:
            return {
                ...state,
                subcategories: state.subcategories.concat(action.payload),
                nextPage: action.nextPage,
                loadingNext: false,
                error: ''
            }
        case GET_SUBCATEGORIES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
                loadingNext: false,
            }
        case REMOVE_GET_SUBCATEGORIES_ERR:
            return {
                ...state,
                error: '',
                loading: ''
            }
        case LOADING_POST_SUBCATEGORY:
            return {
                ...state,
                error: action.error,
                actionLoading: action.loading
            }
        case POST_SUBCATEGORY:
            return {
                ...state,
                subcategories: state.subcategories.concat(action.payload.subcategory),
                subcategory: action.payload.subcategory,
                error: action.error,
                actionLoading: action.loading
            }
        case POST_SUBCATEGORY_ERROR:
            return {
                ...state,
                error: action.error,
                actionLoading: action.loading
            }
        case LOADING_EDIT_SUBCATEGORY:
            return {
                ...state,
                error: action.error,
                loading: action.loading
            }
        case EDIT_SUBCATEGORY:
            let tempArray = state.subcategories.filter(item => item.id !== action.payload.subcategory.id);
            return {
                ...state,
                subcategories: tempArray.concat(action.payload.subcategory),
                error: action.error,
                loading: action.loading
            }
        case EDIT_SUBCATEGORY_ERROR:
            return {
                ...state,
                error: action.error,
                loading: action.loading
            }      
        case DELETE_SUBCATEGORY:
            return {
                ...state,
                subcategories: state.subcategories.filter((item) => item.id !== action.payload),
                error: action.error
            }
        case DELETE_SUBCATEGORY_ERROR:
            return {
                ...state, 
                error: action.error
            }
        default:
            return state
    }
}