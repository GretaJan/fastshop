import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_ERROR,  LOADING_POST_SUBCATEGORY, POST_SUBCATEGORY, POST_SUBCATEGORY_ERROR, LOADING_EDIT_SUBCATEGORY, EDIT_SUBCATEGORY, EDIT_SUBCATEGORY_ERROR, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_ERROR, URL } from './types';
import axios from 'axios';

export const getSubcategories = (category, page) => (dispatch) => {
    dispatch({ 
        type: LOADING_GET_SUBCATEGORIES,
        loading: page === 1 ? true : false,
        loadingNext:  page > 1 ? true : false,
        error: ''
    })

    return axios.get(`${URL}/subcategories/${category}?page=${page}`)
        .then(resp => {
                return dispatch({
                    type: GET_SUBCATEGORIES,
                    payload: resp.data.data,
                    loading: false,
                    loadingNext: false,
                    error: '',
                    currentPage: resp.data.meta.current_page,
                    lastPage: resp.data.meta.last_page === resp.data.meta.current_page ? true : false,
                })   
            }).catch(err => {
                return dispatch({
                    type: GET_SUBCATEGORIES_ERROR,
                    error: 'Failed to load subcategories list.' + err,
                    loading: false
                })
            })
    
} 
export const addSubcategory = (category, data) => async (dispatch) => {
    await dispatch({
        type: LOADING_POST_SUBCATEGORY,
        error: '',
        loading: true
    })
    return axios.post(`${URL}/addSubcategory/${category}`, data)
        .then((response) => (
            dispatch({
                type: POST_SUBCATEGORY,
                payload: response.data,
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

export const editSubcategory = (category, subcategory, data, subAll) => async (dispatch) => {
    await dispatch({
        type: LOADING_EDIT_SUBCATEGORY,
        error: '',
        loading: true
    });
    return axios.post(`${URL}/updateSubcategory/${category}/${subcategory}`, data)
        .then(response => (
            dispatch({
                type: EDIT_SUBCATEGORY,
                payload: response.data,
                error: '',
                loading: false
            })
        )).catch(err => (
            dispatch({
                type: EDIT_SUBCATEGORY_ERROR,
                error: 'Failed updating subcategory: ' + err,
                loading: false
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
