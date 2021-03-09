import { BUY_LIST_BY_DATE, CREATE_CALENDAR } from '../actions/types';

const initialState = {
    calendar: [],
    buyLists: [],
}

export default function(state = initialState, action){
    switch(action.type){
        case CREATE_CALENDAR: 
            return {
                ...state,
                calendar: action.payload
        }
        // case BUY_LIST_BY_DATE:
        //     return {
        //         ...state,
        //         buyLists: buyLists.concat(action.payload)
        //     }
        default:
            return state
    }
}