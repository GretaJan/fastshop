import { LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORY, POST_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY } from '../actions/types';

const initialState = {
       categories:[],
       category:{},
       loading: null,
       error: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_GET_CATEGORIES:
            return {
                ...state,
                loading: action.loading
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: action.loading,
                error: action.error
            }
        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: action.loading
            }
        case POST_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat(action.payload),
                category: action.payload
            }
            // return Object.assign({}, state, {
            //     categories: [...state.categories, action.payload]
            // })
      
            // return Object.assign({}, state, {
            //         categories: [...state.categories, action.payload]
            //     })
            
        case EDIT_CATEGORY:
            // return state.categories.map((item) => {
            //     if (item.id === action.id) {
            //         return {
            //             ...state, 
            //             categories: state.categories.concat(action.payload),
            //         }
            //     } else {
            //         return item
            //     }
            // })
            return {
                ...state, 
                // categories: state.categories.concat(action.payload),
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter((item) => item.id !== action.payload)
            }       
        default:
            return state; 
    }

}