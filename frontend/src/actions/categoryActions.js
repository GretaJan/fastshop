import { LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORY, POST_CATEGORY, URL, EDIT_CATEGORY, DELETE_CATEGORY } from './types';
import axios from 'axios';

export const getCategories = () => (dispatch) => {
    // fetch('http://192.168.0.101:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
    // console.log("Categories URL: ", 'http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories' );
    const sortArray = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1
        } else if( a > b) {
            return 1
        }
        return 0;
    }
    dispatch({
        type: LOADING_GET_CATEGORIES,
        loading: true
    })
    fetch( URL + '/categories', {method: 'GET'})
        .then(res => res.json())
        .then(categories => { 
                dispatch({
                    type: GET_CATEGORIES,
                    payload: categories.categories.sort(sortArray),
                    loading: false, 
                    error: ''
                })
            }
        ).catch((error) => { 
            console.log("error: ", error.response),
            dispatch({
                type: GET_CATEGORIES_ERROR,
                error: 'Failed to load categories list... ',
                loading: false
            })
        })
}

  
// export const getCategories = () => (dispatch) => {
//     dispatch({
//         type: LOADING_GET_CATEGORIES,
//         loading: true
//     })
//     axios.get('http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
//         .then(categories => 
//             dispatch({
//                 type: GET_CATEGORIES,
//                 payload: categories.data.categories
//             })
//         ).catch(() =>
//         dispatch({
//             type: GET_CATEGORIES_ERROR,
//             error: 'Failed to load categories list... ',
//             loading: false
//         }))
// }

export const addCategory = (data) => (dispatch) => {
    axios.post(URL + '/addCategory', data)
        .then((newCategory) => { console.log(newCategory.data)
            dispatch({
                type: POST_CATEGORY,
                payload: newCategory.data.category,
            })
        }).catch((err) =>console.log("Error:", err.response))
}


export const editCategory = (category, data) => (dispatch) => {
    console.log("Cat: ", data)
    axios.post( URL + `/updateCategory/${category}`, data)
        .then(category => { console.log("categories: ", category.data.category)
            dispatch({
                type: EDIT_CATEGORY,
                payload: category.data.category,
                id: category.data.id
            }) 
        }).catch(err => 
            console.log("EDIT CATEGORY ERROR: ", err.response))
}

export const deleteCategory = (category) => (dispatch) => {
    axios.delete( URL + `/deleteCategory/${category}`)
        .then(() => { 
            dispatch({
                type: DELETE_CATEGORY,
                payload: category,
            })
        }).catch(err => 
            console.log("DELETE CATEGORY ERROR: ", err.response))
}