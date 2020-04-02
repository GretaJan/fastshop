import { GET_CATEGORIES, FRW_TO_CATEGORIES, URL } from './types';
import axios from 'axios';

export const getCategories = () => (dispatch) => {
    // fetch('http://192.168.0.101:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
    console.log("Categories URL: ", URL);
    fetch( URL + '/categories', {method: 'GET'})
        .then(res => res.json())
        .then(categories => 
            console.log('categories: ', categories),
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

