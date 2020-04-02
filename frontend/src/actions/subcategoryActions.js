import { GET_SUBCATEGORIES, FRW_TO_SUBCATEGORIES, URL } from '../actions/types';

export const getSubcategories = (category) => dispatch => {
    fetch( URL + '/subcategories/' + category, {method: 'GET'})
    .then(res => res.json())
    .then(subcategories => 
            dispatch({
                type: GET_SUBCATEGORIES,
                payload: subcategories.subcategories
            })
    ).catch(err => console.log("Fetch Categories error: ", err))
} 