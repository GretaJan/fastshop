import { GET_CATEGORIES, GET_CATEGORY, POST_CATEGORY, URL } from './types';
import axios from 'axios';

export const getCategories = () => (dispatch) => {
    // fetch('http://192.168.0.101:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
    // console.log("Categories URL: ", 'http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories' );
    fetch( URL + '/categories', {method: 'GET'})
        .then(res => res.json())
        .then(categories => {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: categories.categories
                })
            }
        ).catch(err => console.log("Fetch Categories error: ", err))
}

  
// export const getCategories = () => (dispatch) => {
//     axios.get('http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
//         .then(categories => 
//             dispatch({
//                 type: GET_CATEGORIES,
//                 payload: categories.data.categories
//             })
//         )
// }

export const addCategory = (data) => (dispatch) => {
    // fetch(URL + '/addCategory', {method: 'POST'})
    //     .then(data => data.json())
    //     .then(category => {console.log("newCategory", category)
    //         dispatch({
    //             type: POST_CATEGORY,
    //             payload: {}
    //         })
    //         history.push('/dashboard')
    //     }
    //         ).catch(err =>
    //             console.log("Error:", err))
    axios.post(URL + '/addCategory', data)
    .then(newCategory => 
            dispatch({
                type: POST_CATEGORY,
                payload: newCategory.data.category,
            })).catch(err =>console.log("Error:", err.response))
}