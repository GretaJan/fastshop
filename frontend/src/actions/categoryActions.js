import { GET_CATEGORIES } from './types';

// export const getCategories = () => dispatch => {
//     fetch('http://localhost/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
//         .then(res => res.json())
//         .then(categories =>
//             dispatch({
//                 type: GET_CATEGORIES,
//                 payload: 'first'
//             })
//         )
// }

export function getCategories() {
    return {
        type: GET_CATEGORIES,
        payload: 'first'
    }
}