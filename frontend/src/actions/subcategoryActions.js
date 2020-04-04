import { GET_SUBCATEGORIES, POST_SUBCATEGORY, URL } from './types';
import axios from 'axios';

// export const getSubcategories = (category) => dispatch => {
//     console.log("URL:" + URL + '/subcategories/' + category)
//     fetch(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/subcategories/${category}`, {method: 'GET'})
//     .then(res => res.json(), console.log(JSON.stringify(res)))
//     .then(subcategories => console.log(subcategories.data),
//             dispatch({
//                 type: GET_SUBCATEGORIES,
//                 payload: {}
//             })
//     ).catch(err => console.log("Fetch Categories error: ", err))
// } 

export const getSubcategories = (category) => (dispatch) => {
    axios.get(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/subcategories/${category}`)
    .then(resp => {
            dispatch({
                type: GET_SUBCATEGORIES,
                payload: resp.data.subcategories
            })   
        }).catch(err => console.log("Fetch Categories error: ", err))
} 

export default addSubcategory = (subcategory, category) => dispatch => {
    console.log('URL: ',  URL + '/addSubcategory/' + category);
    axios.post(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/addSubcategory/${category}`, subcategory )
        .then(response => {
            console.log("Product response: ", response),
            dispatch({
                action: POST_SUBCATEGORY,
                dispatch: {}
            })
        }).catch(err => 
            console.log("POST SUBCATEGORY ERROR: ", err.response))
}