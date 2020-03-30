import { GET_CATEGORIES } from './types';
import axios from 'axios';

// export const fetchPosts = () => dispatch => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//         .then(res => res.json())
//         .then(posts => 

//             dispatch({
//                 type: FETCH_POSTS,
//                 payload: posts
//         })
//     );
// }

export const getCategories = () => (dispatch) => {
    // fetch('http://192.168.0.101:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
    fetch('http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories', {method: 'GET'})
        .then(res => res.json())
        .then(categories => 
                dispatch({
                    type: GET_CATEGORIES,
                    payload: categories.categories
                })
        )
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
