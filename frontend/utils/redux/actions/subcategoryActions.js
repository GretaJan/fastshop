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

export function addSubcategory(category, data){
   
    function onlineFunc(dispatch){
        axios.post(`${URL}/addSubcategory/${category}`, data)
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
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
        data: data
    };
    return onlineFunc     
}

export function editSubcategory(category, subcategory, data){
    
    function onlineFunc(dispatch){
        axios.post(`${URL}/updateSubcategory/${category}/${subcategory}`, data)
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
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
        data: data
    };
    return onlineFunc
}

export function deleteSubcategory(subcategory){
    
    function onlineFunc(dispatch){
        axios.delete( `${URL}/deleteSubcategory/${subcategory}`)
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
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
        data: data
    };
    return onlineFunc
}
