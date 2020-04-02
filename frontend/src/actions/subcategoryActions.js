import { GET_SUBCATEGORIES, FRW_TO_SUBCATEGORIES, URL } from '../actions/types';

export const getSubcategories = () => dispatch => {
    fetch( URL + '/subcategories', {method: 'GET'})
    .then(res => res.json())
    .then(subcategories => 
            dispatch({
                type: GET_SUBCATEGORIES,
                payload: subcategories.subcategories
            })
    ).catch(err => console.log("Fetch Categories error: ", err))
} 