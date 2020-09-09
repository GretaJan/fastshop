import { LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORY, POST_CATEGORY, URL, EDIT_CATEGORY, DELETE_CATEGORY } from './types';
import axios from 'axios';

export const getCategories = () => (dispatch) => {
    const sortArray = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        return nameA - nameB;
    }
    dispatch({ 
        type: LOADING_GET_CATEGORIES,
        loading: true
    })
    return axios.get( URL + '/categories')
        .then(categories => { 
                return dispatch({
                    type: GET_CATEGORIES,
                    payload: categories.data.categories.sort(sortArray),
                    // payload:  [
                    //     {
                    //         id: 1,
                    //         name: "Beverage",
                    //         image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
                    //         background: null,
                    //         created_at: "2020-09-06 19:34:14",
                    //         updated_at: "2020-09-06 19:51:50"
                    //         },
                    //         {
                    //         id: 2,
                    //         name: "Food",
                    //         image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/u597O8p8ph.png",
                    //         background: null,
                    //         created_at: "2020-09-06 19:34:14",
                    //         updated_at: "2020-09-06 19:51:33"
                    //         }
                    //     ],
                    loading: false, 
                    error: ''
                })
            }
        ).catch((error) => { 
            return dispatch({
                type: GET_CATEGORIES_ERROR,
                error: 'Failed to load categories list... ' + error,
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
        .then((newCategory) => { 
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