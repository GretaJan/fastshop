import { GET_SUBCATEGORIES, FRW_TO_SUBCATEGORIES, URL } from './types';
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
    // var subcategories;
    axios.get(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/subcategories/${category}`)
    .then(resp => {
            // JSON.stringify(resp.data),
            console.log("resp:" +  typeof(resp.data.subcategories))
            dispatch({
                type: GET_SUBCATEGORIES,
                payload:  JSON.stringify(resp.data.subcategories)
            })   
        }).catch(err => console.log("Fetch Categories error: ", err))
} 