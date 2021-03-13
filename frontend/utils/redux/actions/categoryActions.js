import { LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, LOADING_POST_CATEGORY, POST_CATEGORY, POST_CATEGORY_ERROR, URL, LOADING_EDIT_CATEGORY, EDIT_CATEGORY, EDIT_CATEGORY_ERROR, DELETE_CATEGORY, DELETE_CATEGORY_ERROR } from './types';
import axios from 'axios';

// export const getCategories = () => (dispatch) => {
//         const sortArray = (a, b) => {
//             const nameA = a.name.toUpperCase();
//             const nameB = b.name.toUpperCase();
    
//             return nameA - nameB;
//         }
//         dispatch({ 
//             type: LOADING_GET_CATEGORIES,
//         })
//         axios.get(`${URL}/categories`)
//             .then(() => ( 
//                     dispatch({
//                         type: GET_CATEGORIES,
//                         payload: categories.data.categories.sort(sortArray),
//                     })
//             )).catch(() => ( 
//                 dispatch({
//                     type: GET_CATEGORIES_ERROR,
//                     error: 'Failed to load categories list... ',
//                 })
//         ));
//         console.log("error..")
//         dispatch({ 
//             type: GET_CATEGORIES_ERROR,
//             error: 'Network error. Updated data may not be presented.',
//         })
// }

export function addCategory(data) {
    function onlineFunc(dispatch){
        axios.post(`${URL}/addCategory`, data)
        .then((response) => (
            dispatch({
                type: POST_CATEGORY,
                payload: response.data,
                error: '',
                loading: false
            })
        )).catch((err) => (
            dispatch({
                type: POST_CATEGORY_ERROR,
                error: 'Failed to create a new category ' + err,
                loading: false
            })
        ));
    }
  
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
        data: data
    };
    return onlineFunc     
}

export function editCategory(category, data){

    function onlineFunc(dispatch){
        axios.post(`${URL}/updateCategory/${category}`, data)
        .then(response => (
            dispatch({
                type: EDIT_CATEGORY,
                payload: response.data,
                error: '',
                loading: false
            }) 
        )).catch(err => (
            dispatch({
                type: EDIT_CATEGORY_ERROR,
                error: 'Failed updating category' + err,
                loading: false
            })            
        ))
    }
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
        data: data
    }
    return onlineFunc
}

export function deleteCategory(category) {

    function onlineFunc(dispatch){
        axios.delete( `${URL}/deleteCategory/${category}`)
            .then(() => (
                dispatch({
                    type: DELETE_CATEGORY,
                    payload: category,
                    error: ''
                })
            )).catch(err => (
                dispatch({
                    type: DELETE_CATEGORY_ERROR,
                    error: 'Failed to delete category: ' + err
                })
        ))
    }
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
    }
    return onlineFunc
}