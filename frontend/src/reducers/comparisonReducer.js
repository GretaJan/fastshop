import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, CLEARE_RESULTS } from '../actions/types';

const initialState = {
    comparisonArray: [],
    result: {},
    calculated: false,
    calculatedAll: null,
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
        case CLEARE_RESULTS: 
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