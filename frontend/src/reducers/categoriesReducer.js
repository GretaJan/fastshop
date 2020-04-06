import { GET_CATEGORIES, GET_CATEGORY, POST_CATEGORY, EDIT_CATEGORY } from '../actions/types';

const initialState = {
       categories:[],
       category:{},
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
            }
        case POST_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat(action.payload)
            }
            // return Object.assign({}, state, {
            //     categories: [...state.categories, action.payload]
            // })
      
            // return Object.assign({}, state, {
            //         categories: [...state.categories, action.payload]
            //     })
            
        case EDIT_CATEGORY:
            return state.categories.map((item) => {
                if (item.id === action.id) {
                    return {
                        ...state, 
                        categories: state.categories.concat(action.payload),
                    }
                } else {
                    return item
                }
            })

            // return {
            //     ...state,
            //     categories: categories.map(item => {
            //         if(item.id !== action.id) {
            //             return item
            //         } else {
            //             return action.payload
            //         }
            //     })
            // }
                // return {
                //     categories: state.categories.map(item => {
                //                 if(item.name !== action.payload.name) {
                //                     return item
                //                 } else {
                //                     return action.payload
                //                 }
                //             }
                //     } 
                
        default:
            return state; 
    }

}