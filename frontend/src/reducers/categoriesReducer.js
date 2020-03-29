import { GET_CATEGORIES } from '../actions/types';

const initialState = {
   categoriesArray: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categoriesArray: action.payload
            }
        default:
            return state; 
    }

}