import { 
    LOADING_POST_SUBCATEGORY, 
    POST_SUBCATEGORY, 
    POST_SUBCATEGORY_ERROR, 
    LOADING_EDIT_SUBCATEGORY, 
    EDIT_SUBCATEGORY, 
    EDIT_SUBCATEGORY_ERROR, 
    DELETE_SUBCATEGORY, 
    DELETE_SUBCATEGORY_ERROR, 
    URL 
} from './types';
import axios from 'axios';
import { asyncStorageFunc } from './generalActions';

export async function getSubcategories(categoryId, page){
    return asyncStorageFunc().then(response => {
        const dataReducer = JSON.parse(response.dataUpload)
        const allSubcategories = dataReducer.allSubcategories.find(item => item.parentId == categoryId);
        const currentSubcategories = allSubcategories.data[page];
        if(page === 0){
            return {
                subcategories: currentSubcategories,
                lastPage: allSubcategories.lastPage
            };
        }
        return currentSubcategories;
    }).catch(() => {
        return null
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
