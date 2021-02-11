import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_APPEND, GET_SUBCATEGORIES_ERROR,  LOADING_POST_SUBCATEGORY, POST_SUBCATEGORY, POST_SUBCATEGORY_ERROR, LOADING_EDIT_SUBCATEGORY, EDIT_SUBCATEGORY, EDIT_SUBCATEGORY_ERROR, REMOVE_GET_SUBCATEGORIES_ERR, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_ERROR, URL } from './types';
import axios from 'axios';
import store from '../store';

export const getSubcategories = (subcategories, categoryId, page) => async (dispatch) => {
    dispatch({ 
        type: LOADING_GET_SUBCATEGORIES,
        loading: page === 0 ? true : false,
        loadingNext:  page > 0 ? true : false,
        error: ''
    });

    let filteredSubcategories = [];
    let lastPage = 1;
    subcategories.forEach(item => {
        if(item.parentId == categoryId){
            lastPage = item.lastPage;
            filteredSubcategories = item.data[page];
        }
    })
    dispatch({ 
        type: page == 0 ? GET_SUBCATEGORIES : GET_SUBCATEGORIES_APPEND,
        payload: filteredSubcategories,
        nextPage: page + 1,
        lastPage: lastPage,
    });
}

export const getSubcategoriesPrepend = (subcategories, categoryId, page) => dispatch => {
    fetchSubcategoriesWithPagination(dispatch, subcategories, categoryId, GET_SUBCATEGORIES_APPEND, page)
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
