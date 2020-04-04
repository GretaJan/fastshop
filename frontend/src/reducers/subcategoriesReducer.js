import { GET_SUBCATEGORIES, FRW_TO_SUBCATEGORIES, POST_SUBCATEGORY } from '../actions/types';

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
        case POST_SUBCATEGORY:
            return {
                ...state,
                subcategories: subcategories.concat(action.payload)
            }
        default:
            return state
    }
}