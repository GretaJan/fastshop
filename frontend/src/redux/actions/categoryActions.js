import { LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, LOADING_POST_CATEGORY, POST_CATEGORY, POST_CATEGORY_ERROR, URL, LOADING_EDIT_CATEGORY, EDIT_CATEGORY, EDIT_CATEGORY_ERROR, DELETE_CATEGORY, DELETE_CATEGORY_ERROR } from './types';
import axios from 'axios';

export const getCategories = () => (dispatch) => {
    const sortArray = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        return nameA - nameB;
    }
    dispatch({ 
        type: LOADING_GET_CATEGORIES,
        loading: true,
        error: '',
    })
    return axios.get(`${URL}/categories`)
        .then(categories => ( 
                dispatch({
                    type: GET_CATEGORIES,
                    payload: categories.data.categories.sort(sortArray),
                    loading: false, 
                    error: ''
                })
        )).catch((error) => ( 
            dispatch({
                type: GET_CATEGORIES_ERROR,
                error: 'Failed to load categories list... ' + error,
                loading: false
            })
        ))
}

export const addCategory = (data) => async (dispatch) => {
    await dispatch({
        type: LOADING_POST_CATEGORY,
        error: '',
        loading: true
    })
    return axios.post(`${URL}/addCategory`, data)
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

export const editCategory = (category, data) => async(dispatch) => {
    await dispatch({
        type: LOADING_EDIT_CATEGORY,
        error: '',
        loading: true
    })
    return axios.post(`${URL}/updateCategory/${category}`, data)
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

export const deleteCategory = (category) => (dispatch) => {
    return axios.delete( `${URL}/deleteCategory/${category}`)
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