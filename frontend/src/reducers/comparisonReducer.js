import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT } from '../actions/types';

const initialState = {
    comparisonArray: [],
    result: {},
    calculated: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCT_SELECTED:
            return {
                ...state,
                comparisonArray: state.comparisonArray.concat(action.payload),
                calculated: action.calculated
                // comparisonArray: []
            }
            // function newObject(value, obj) {
            //     obj[1] = value;
            //     return obj;
            // }
            // return {
            //     ...state,
            //     comparisonArray: comparisonArray.push(newObject(action.payload, {}))
            // }

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
                calculated: action.calculated
            }
        default:
            return state
    }
}