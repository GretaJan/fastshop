import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_ERROR, POST_SUBCATEGORY, EDIT_SUBCATEGORY, URL } from './types';
import axios from 'axios';

// export const getSubcategories = (category) => dispatch => {
//     console.log("URL:" + URL + '/subcategories/' + category)
//     fetch(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/subcategories/${category}`, {method: 'GET'})
//     .then(res => res.json(), console.log(JSON.stringify(res)))
//     .then(subcategories => console.log(subcategories.data),
//             dispatch({
//                 type: GET_SUBCATEGORIES,
//                 payload: {}
//             })
//     ).catch(err => console.log("Fetch Categories error: ", err))
// } 

export const getSubcategories = (category) => (dispatch) => {
    dispatch({
        type: LOADING_GET_SUBCATEGORIES,
        loading: true
    })
    axios.get(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/subcategories/${category}`)
    .then(resp => {
            dispatch({
                type: GET_SUBCATEGORIES,
                payload: resp.data.subcategories,
                loading: false
            })   
        }).catch(err => 
            dispatch({
                action: GET_SUBCATEGORIES_ERROR,
                error: 'Failed to load subcategories list...',
                loading: false
            }))
} 

export const addSubcategory = (subcategory, category) => dispatch => {
    console.log('URL: ',  URL + '/addSubcategory/' + category);
    axios.post(`http://10.0.2.2:80/2019%20Reproduction/fastshop/backend/laravel/public/api/addSubcategory/${category}`, subcategory )
        .then(subcategory => {
            dispatch({
                action: POST_SUBCATEGORY,
                dispatch: subcategory.data.subcategory
            })
        }).catch(err => 
            console.log("POST SUBCATEGORY ERROR: ", err.response))
}

export const editSubcategory = (subcategory, category, data) => (dispatch) => {
    axios.post( URL + `/updateSubcategory/${category}/${subcategory}`, data)
        .then(subcategory => { console.log("show: ", subcategory)
            dispatch({
                action: EDIT_SUBCATEGORY,
                payload: subcategory.data,
                id: subcategory.data.id,
            })
        }).catch(err => 
            console.log("EDIT SUBCATEGORY ERROR: ", err.response))
}

// export const editSubcategory = (subcategory, category,) => (dispatch) => {
//     axios.post( URL + `/deleteProduct/${category}/${subcategory}`, data)
//         .then(subcategory => { console.log("show: ", subcategory)
//             dispatch({
//                 action: EDIT_SUBCATEGORY,
//                 payload: subcategory.data,
//                 id: subcategory.data.id,
//             })
//         }).catch(err => 
//             console.log("EDIT SUBCATEGORY ERROR: ", err.response))
// }