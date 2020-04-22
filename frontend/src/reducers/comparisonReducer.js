import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, clear_results, SORT_ARRAY, GO_TO_LIST } from '../actions/types';

const initialState = {
    comparisonArray: [],
    result: {},
    calculated: false,
    calculatedAll: null,
    sorted: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCT_SELECTED:
            var pushToArray = state.comparisonArray.concat(action.payload);
            var filteredArray = Array.from(new Set(pushToArray.map(item => item.id)))
                .map(id => {
                    return pushToArray.find(firstItem => firstItem.id === id)
                })
            return {
                ...state,
                comparisonArray: filteredArray,
                calculated: action.calculated
            }

        case REMOVE_SELECTED_PRODUCT: 
            return {
                ...state,
                comparisonArray: state.comparisonArray.filter((item) => (
                    action.payload !== item.id
               )),
            }
        case COMPARE_RESULT:
            return {
                ...state,
                comparisonArray: action.array,
                result: action.payload,
                calculated: action.calculated,
                calculatedAll: action.calculatedAll,
            }
        case SORT_ARRAY: 
        return {
            ...state,
            comparisonArray: action.payload,
            sorted: action.sorted
        }
        case GO_TO_LIST: 
        console.log("go to list selector")
        return {
            ...state,
            sorted: action.sorted
        }
        case clear_results: 
            return {
                ...state,
                comparisonArray: action.array,
                result: action.result,
                calculated: action.calculated
            }
        default:
            return state
    }
}