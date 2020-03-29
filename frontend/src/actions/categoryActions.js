import { GET_CATEGORIES } from './types';

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
    fetch('127.0.0.1:8081/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
        .then(res => res.json())
        .then(categories => console.log("categories: " + categories ))
        // .then(categories => 
        //     dispatch({
        //         type: GET_CATEGORIES,
        //         payload: categories
        //     })
        // )
}
  

