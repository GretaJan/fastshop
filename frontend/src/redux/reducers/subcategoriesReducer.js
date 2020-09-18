import { ActionSheetIOS } from 'react-native';
import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_ERROR, UNMOUNT_SUBCATEGORIES, FRW_TO_SUBCATEGORIES, LOADING_POST_SUBCATEGORY, POST_SUBCATEGORY, POST_SUBCATEGORY_ERROR,  LOADING_EDIT_SUBCATEGORY, EDIT_SUBCATEGORY, EDIT_SUBCATEGORY_ERROR, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_ERROR } from '../actions/types';

const initialState = {
    subcategories: [],
    subcategory: {},
    loading: null,
    actionLoading: null,
    loadingNext: null,
    error: '',
    currentPage: 1,
    lastPage: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_GET_SUBCATEGORIES:
            return {
                ...state,
                loading: action.loading,
                error: ''
            }
        case GET_SUBCATEGORIES:
            return {
                ...state,
                subcategories: action.payload,
                loading: action.loading,
                error: action.error
            }
        case GET_SUBCATEGORIES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: action.loading
            }
        case UNMOUNT_SUBCATEGORIES: 
            return {
                ...state,
                products: action.payload,
                currentPage: action.currentPage,
                lastPage: action.lastPage
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