import { GET_CATEGORIES, GET_CATEGORY, URL } from './types';
import axios from 'axios';

export const getCategories = () => (dispatch) => {
    // fetch('http://192.168.0.101:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
    // console.log("Categories URL: ", 'http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories' );
    fetch( URL + '/categories', {method: 'GET'})
        .then(res => res.json())
        .then(categories => 
                dispatch({
                    type: GET_CATEGORIES,
                    payload: categories.categories
                })
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

export const getCategory = (category) => (dispatch) => {
    fetch(URL + '/category' + category)
        .then(data => data.json())
        .then(category => console.log(category)
            // dispatch({
            //     type: GET_CATEGORY,
            //     payload: category
            // })
            ).catch(err =>
                console.log("Error:", err))
}