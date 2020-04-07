import { LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORY, POST_CATEGORY, URL, EDIT_CATEGORY } from './types';
import axios from 'axios';

export const getCategories = () => (dispatch) => {
    // fetch('http://192.168.0.101:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories')
    // console.log("Categories URL: ", 'http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/categories' );
    dispatch({
        type: LOADING_GET_CATEGORIES,
        loading: true
    })
    fetch( URL + '/categories', {method: 'GET'})
        .then(res => res.json())
        .then(categories => {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: categories.categories,
                    loading: false
                })
            }
        ).catch(err =>
            dispatch({
                type: GET_CATEGORIES_ERROR,
                error: 'Failed to load: ', err,
                loading: false
            }))
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


export const editCategory = (category, data) => (dispatch) => {
    // console.log("SUBID: ", data );

    // const NewArray = [{
    //     id: 1,
    //     name: 'Scott'
    // },{
    //     id: 3,
    //     name: 'Benjamin'}];

    // const sudurtas = Object.assign({}, NewArray, {
    //     newArray: data
    // });

    // sudurtas.map(sudurtas)

    // console.log("sudurtas",sudurtas);

    axios.post( URL + `/updateCategory/${category}`, data)
        .then(category => {
            dispatch({
                action: EDIT_CATEGORY,
                payload: category.data,
                id: category.data.id
            }) 
        }).catch(err => 
            console.log("EDIT PRODUCT ERROR: ", err.response))
}