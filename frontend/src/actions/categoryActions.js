import { LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORY, POST_CATEGORY, URL, EDIT_CATEGORY, DELETE_CATEGORY } from './types';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob'

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
        .then((newCategory) => {
            dispatch({
                type: POST_CATEGORY,
                payload: newCategory.data.category,
            })
        }).catch((err) =>console.log("Error:", err.response))
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

    // axios.post( URL + `/updateCategory/${category}`, data)
    //     .then(category => {
    //         dispatch({
    //             action: EDIT_CATEGORY,
    //             payload: category.data,
    //             id: category.data.id
    //         }) 
    //     }).catch(err => 
    //         console.log("EDIT PRODUCT ERROR: ", err.response))
        //   fetch('POST', 'http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/addCategory', {
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //    },  body: data})
        // .then((response) => response.json())
        // .then((RetrievedData) => {
        //     console.log(RetrievedData);
        // }).catch((err, resp) =>console.log("Error:", err , " and " , resp, "data: ", data))
          RNFetchBlob.fetch('POST', 'http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/addCategory', 
        {
            // Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            body: data})
        .then((response) => response.json())
        .then((RetrievedData) => {
            console.log(RetrievedData);
        }).catch((err, resp) =>console.log("Error:", err , " and " , resp, "data: ", data))
}

export const deleteCategory = (category) => (dispatch) => {
    axios.delete( URL + `/deleteCategory/${category}`)
        .then(() => { 
            dispatch({
                action: DELETE_CATEGORY,
                payload: category,
            })
        }).catch(err => 
            console.log("DELETE CATEGORY ERROR: ", err.response))
}