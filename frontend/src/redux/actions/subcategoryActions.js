import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_ERROR, UNMOUNT_SUBCATEGORIES, POST_SUBCATEGORY, EDIT_SUBCATEGORY, DELETE_SUBCATEGORY, DIAGRAM_RESULTS, URL } from './types';
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

        if(nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    }
    axios.get(`${URL}/subcategories/${category}?page=${page}`)
    .then(resp => {
            var lastPageNo = false; 
            if(resp.data.meta.last_page === resp.data.meta.current_page) {
                lastPageNo = true;                
            }
            dispatch({
                type: GET_SUBCATEGORIES,
                payload: resp.data.data,
                loading: false,
                loadingNext: false,
                error: '',
                currentPage: resp.data.meta.current_page,
                lastPage: lastPageNo,
            })   
        }).catch(err => {
            dispatch({
                type: GET_SUBCATEGORIES_ERROR,
                error: 'Failed to load subcategories list.',
                loading: false
            })
        })
    
} 

export const unmountSubcategories = () => dispatch => {
    dispatch({
        type: UNMOUNT_SUBCATEGORIES,
        payload: [],
        currentPage: 1,
        lastPage: false,
    })
}

export const addSubcategory = (subcategory, category) => dispatch => {
    axios.post(`${URL}/addSubcategory/${category}`, subcategory)
    .then((subcategory) => {
        dispatch({
            type: POST_SUBCATEGORY,
            payload: subcategory.data.subcategory,
        })
    }).catch((err) =>console.log("Error:", err.response))
}

export const editSubcategory = (category, subcategory, data) => (dispatch) => {
    axios.post( URL + `/updateSubcategory/${category}/${subcategory}`, data)
        .then(subcategory => {
            dispatch({
                type: EDIT_SUBCATEGORY,
                payload: subcategory.data.subcategory,
            })
        }).catch(err => 
            console.log("EDIT SUBCATEGORY ERROR: ", err.response))
}

export const deleteSubcategory = (subcategory) => (dispatch) => {
    axios.delete( URL + `/deleteSubcategory/${subcategory}`)
        .then(() => { 
            dispatch({
                type: DELETE_SUBCATEGORY,
                payload: subcategory,
            })
        }).catch(err => 
            console.log("EDIT SUBCATEGORY ERROR: ", err.response))
}
