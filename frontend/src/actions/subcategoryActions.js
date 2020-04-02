import { GET_SUBCATEGORIES, FRW_TO_SUBCATEGORIES, URL } from '../actions/types';

export const getSubcategories = (category) => dispatch => {
    console.log("URL:" + URL + '/subcategories/' + category)
    fetch( URL + `/subcategories/${category}`, {method: 'GET'})
    .then(res => res.json())
    .then(subcategories => console.log(subcategories),
            dispatch({
                type: GET_SUBCATEGORIES,
                payload: subcategories.subcategories
            })
    ).catch(err => console.log("Fetch Categories error: ", err))
} 