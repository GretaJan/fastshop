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
                loading: true
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
            return state.subcategories.map(item => {
                if(item.id === action.id) {
                    return {
                        ...state,
                        subcategories: state.subcategories.concat(action.payload) 
                    }
                } else {
                    item
                }
            })
        case DELETE_SUBCATEGORY:
            return {
                ...state,
                subcategories: state.subcategories.filter(subcategories.id !== action.payload)
            }
        default:
            return state
    }
}