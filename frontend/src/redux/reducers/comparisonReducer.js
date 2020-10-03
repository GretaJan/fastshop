import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, CLEAR_RESULTS, CLEAR_SELECTED_ARRAY, SORT_ARRAY, GO_TO_LIST, DIAGRAM_RESULTS } from '../actions/types';

const initialState = {
    comparisonArray: [],
    result: {},
    sorted: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCT_SELECTED:
                let pushToArray = state.comparisonArray.concat(action.payload.product);
                let filteredArray = Array.from(new Set(pushToArray.map(item => item.id)))
                .map(id => {
                    return pushToArray.find(firstItem => firstItem.id === id)
                })
            return {
                ...state,
                comparisonArray: filteredArray,
                result: action.result,
            }
        case REMOVE_SELECTED_PRODUCT: 
            return {
                ...state,
                comparisonArray: state.comparisonArray.filter((item) => (
                    action.payload !== item.id
               )),
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
            comparisonArray: action.payload,
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
                result: action.result,
            }
            case CLEAR_SELECTED_ARRAY:
                return {
                    ...state,
                    result: action.results,
                    comparisonArray: action.array,
                }
        default:
            return state
    }
}