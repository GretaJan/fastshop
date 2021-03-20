import { 
     LOADING_POST_SUBCATEGORY, 
     POST_SUBCATEGORY, 
     POST_SUBCATEGORY_ERROR, 
     LOADING_EDIT_SUBCATEGORY, 
     EDIT_SUBCATEGORY, 
     EDIT_SUBCATEGORY_ERROR, 
     DELETE_SUBCATEGORY, 
     DELETE_SUBCATEGORY_ERROR 
} from '../actions/types';

const initialState = {
    subcategories: [],
    subcategory: {},
    favGlobalDrinks: [],
    favGlobalFoods: [],
    loading: null,
    actionLoading: null,
    loadingNext: null,
    error: '',
    nextPage: 0,
    lastPage: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
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
        case "GET_TOP_GLOBAL_1":
            const globalDrinks = action.payload.map(item => {
                const data = {
                    id: item.id,
                    count: item.count
                }
                return data
            })
            return {
                ...state,
                favGlobalDrinks: globalDrinks
            }
        default:
            return state
    }
}