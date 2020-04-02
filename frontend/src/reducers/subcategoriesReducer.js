import { GET_SUBCATEGORIES, FRW_TO_SUBCATEGORIES } from '../actions/types';

const initialState = {
    subcategories: [],
    subcategory: {},
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SUBCATEGORIES:
            return {
                ...state,
                subcategories: action.payload
            }
        case FRW_TO_SUBCATEGORIES:
            return {
                ...state,
            }
        default:
            return state
    }
}