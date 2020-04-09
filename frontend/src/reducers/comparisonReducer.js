import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT } from '../actions/types';

const initialState = {
    comparisonArray: [],
    comparisonItem: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCT_SELECTED:
            return {
                ...state,
                comparisonArray: state.comparisonArray.concat(action.payload)
            }
        case REMOVE_SELECTED_PRODUCT: 
            return {
                ...state,
                comparisonArray: action.payload
            }
        default:
            return state
    }
}