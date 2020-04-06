import { GET_SUBCATEGORIES, FRW_TO_SUBCATEGORIES, POST_SUBCATEGORY, EDIT_SUBCATEGORY } from '../actions/types';

const initialState = {
    subcategories: [],
    subcategory: {},
    edited: false
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
                subcategories: state.subcategories.concat(action.payload)
            }
        case EDIT_SUBCATEGORY:
            return state.subcategories.map(item => {
                if(item.id === action.id) {
                    return {
                        ...state,
                        subcategories: state.subcategories.concat(action.payload) 
                    }
                } else {
                    item
                }
            })
        default:
            return state
    }
}