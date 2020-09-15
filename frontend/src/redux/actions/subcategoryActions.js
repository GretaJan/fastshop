import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_ERROR, UNMOUNT_SUBCATEGORIES,  LOADING_POST_SUBCATEGORY, POST_SUBCATEGORY, POST_SUBCATEGORY_ERROR, EDIT_SUBCATEGORY, EDIT_SUBCATEGORY_ERROR, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_ERROR, URL } from './types';
import axios from 'axios';

export const getSubcategories = (category, page) => (dispatch) => {
    dispatch({ 
        type: LOADING_GET_SUBCATEGORIES,
        loading: page === 1 ? true : false,
        nextLoading:  page > 1 ? true : false,
    })
    const sorting = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        // if(nameA < nameB) {
        //     return -1;
        // } else if (nameA > nameB) {
        //     return 1;
        // }
        return nameA - nameB;
    }
    return axios.get(`${URL}/subcategories/${category}?page=${page}`)
    .then(resp => {
            var lastPageNo = false; 
            if(resp.data.meta.last_page === resp.data.meta.current_page) {
                lastPageNo = true;                
            }
            return dispatch({
                type: GET_SUBCATEGORIES,
                payload: resp.data.data,
                loading: false,
                loadingNext: false,
                error: '',
                currentPage: resp.data.meta.current_page,
                lastPage: lastPageNo,
            })   
        }).catch(err => {
            return dispatch({
                type: GET_SUBCATEGORIES_ERROR,
                error: 'Failed to load subcategories list.' + err,
                loading: false
            })
        })
    
} 

// export const unmountSubcategories = () => dispatch => {
//     dispatch({
//         type: UNMOUNT_SUBCATEGORIES,
//         payload: [],
//         currentPage: 1,
//         lastPage: false,
//     })
// }

export const addSubcategory = (category, data) => dispatch => {
    dispatch({
        type: LOADING_POST_SUBCATEGORY,
        error: '',
        loading: true
    })
    return axios.post(`${URL}/addSubcategory/${category}`, data)
        .then((response) => (
            dispatch({
                type: POST_SUBCATEGORY,
                payload: response.data.subcategory,
                loading: false,
                error: ''
            })
        )).catch((err) => (
            dispatch({
                type: POST_SUBCATEGORY_ERROR,
                error: 'Failed creating a subcategory ' + err,
                loading: false
            })
        ))
}

export const editSubcategory = (category, subcategory, data, subAll) => (dispatch) => {
    console.log("data", subAll)
    return axios.post(`${URL}/updateSubcategory/${category}/${subcategory}`, data)
        .then(response => (
            dispatch({
                type: EDIT_SUBCATEGORY,
                payload: response.data.subcategory,
                subcategories: subAll,
                error: ''
            })
        )).catch(err => (
            console.log("errrrr", err),
            dispatch({
                type: EDIT_SUBCATEGORY_ERROR,
                error: 'Failed updating subcategory: ' + err,
            })
        ))
    }

export const deleteSubcategory = (subcategory) => (dispatch) => {
    return axios.delete( `${URL}/deleteSubcategory/${subcategory}`)
        .then(() => ( 
            dispatch({
                type: DELETE_SUBCATEGORY,
                payload: subcategory,
                error: ''
            })
        )).catch(err => (
            dispatch({
                type: DELETE_SUBCATEGORY_ERROR,
                error: 'Failed to delete subcategory: ' + err,
            })
        ))
}
