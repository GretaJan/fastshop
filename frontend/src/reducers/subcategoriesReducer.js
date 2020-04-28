import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_ERROR, FRW_TO_SUBCATEGORIES, POST_SUBCATEGORY, EDIT_SUBCATEGORY, DELETE_SUBCATEGORY } from '../actions/types';

const initialState = {
    subcategories: [],
    subcategory: {},
    loading: null,
    error: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_GET_SUBCATEGORIES:
            return {
                ...state,
                loading: action.loading,
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
        case POST_SUBCATEGORY:
            return {
                ...state,
                subcategories: state.subcategories.concat(action.payload)
            }
        case EDIT_SUBCATEGORY:
            const tempArray = state.subcategories.filter(item => item.id === action.payload.id );
            return {
                ...state,
                // subcategories: tempArray
            }
               
        case DELETE_SUBCATEGORY:
            return {
                ...state,
                subcategories: state.subcategories.filter((item) => item.id !== action.payload)
            }
        default:
            return state
    }
}