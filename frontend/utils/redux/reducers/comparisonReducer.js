import { 
    PRODUCT_SELECTED, 
    REMOVE_SELECTED_PRODUCT, 
    COMPARE_RESULT, 
    CLEAR_RESULTS, 
    CLEAR_SELECTED_ARRAY, 
    SORT_ARRAY, 
    GO_TO_LIST, 
    SAVE_RESULT,
    REMOVE_RESULT
 } from '../actions/types';

const initialState = {
    selectedProducts: [],
    result: {},
    sorted: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCT_SELECTED:
            return {
                ...state,
                selectedProducts: state.selectedProducts.concat(action.payload),
                result: {},
            }
        case REMOVE_SELECTED_PRODUCT: 
            return {
                ...state,
                selectedProducts: state.selectedProducts.filter(item => item.id != action.payload),
               result: {},
            }
        case COMPARE_RESULT:
            return {
                ...state,
                result: action.payload,
            }
        case SORT_ARRAY: 
        return {
            ...state,
            selectedProducts: action.payload,
            sorted: action.sorted,
        }
        case GO_TO_LIST: 
        return {
            ...state,
            sorted: action.sorted,
        }
        case CLEAR_RESULTS: 
            return {
                ...state,
                result: {},
            }
        case CLEAR_SELECTED_ARRAY:
            return {
                ...state,
                result: action.results,
                selectedProducts: action.array,
            }
        case SAVE_RESULT:
            let saveResults = {...state.result}
            saveResults.created_at = action.payload.created_at
            return {
                ...state,
                // savedResults: state.savedResults.concat(action.payload),
                result: saveResults
            }
            //remove from saved results list
        case REMOVE_RESULT: 
            let removeResults = {...state.result}
            removeResults.created_at = null
            return {
                ...state,
                result: removeResults
            }
        default:
            return state
    }
}