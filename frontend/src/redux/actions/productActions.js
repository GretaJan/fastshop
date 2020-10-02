import { LOADING_GET_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_ERROR, UNMOUNT_PRODUCTS, LOADING_GET_PRODUCT, GET_PRODUCT, GET_PRODUCT_ERROR, LOADING_POST_PRODUCT, POST_PRODUCT, POST_PRODUCT_ERROR, LOADING_EDIT_PRODUCT, EDIT_PRODUCT, EDIT_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, URL } from './types';
import axios from 'axios';

export const getProducts = (subcategory, page) => async (dispatch) => {
    await dispatch({
        type: LOADING_GET_PRODUCTS,
        loading: page == 1 ? true : false,
        loadingNext: page > 1 ? true : false,
        error: ''
    });
    return axios.get(`${URL}/products/${subcategory}?page=${page}`)
        .then(response => {
                return dispatch({
                        type: GET_PRODUCTS,
                        payload: response.data.data,
                        loading: false,
                        loadingNext: false,
                        error: '',
                        currentPage: response.data.meta.current_page,
                        lastPage: response.data.meta.last_page === response.data.meta.current_page ? true : false,
                    })
            }).catch(err => { 
                return dispatch({
                    type: GET_PRODUCTS_ERROR,
                    error: 'Failed to load product list' + err,
                    loading: false,
                    loadingNext: false,
                })
        })
} 

export const getProduct = (subcategory, product) => async (dispatch) => {
    await dispatch({
        type: LOADING_GET_PRODUCT,
        loading: true,
        error: ''
    })
    return axios.get(`${URL}/product/${subcategory}/${product}`)
        .then(response => (
                dispatch({
                    type: GET_PRODUCT,
                    payload: response.data,
                    loading: false,
                    error: ''
                })
            )
        ).catch(err => { 
            return dispatch({
                type: GET_PRODUCT_ERROR,
                error: 'Failed to load product ' + err,
                loading: false
            })
        })   
} 

export const addProduct = (subcategory, data) => async dispatch => {
    await dispatch({
        type: LOADING_POST_PRODUCT,
        loading: true,
        error: ''
    })
    return axios.post(`${URL}/addProduct/${subcategory}`, data)
        .then((response) => ( 
            dispatch({
                type: POST_PRODUCT,
                payload: response.data,
                loading: false,
                error: '',
            })
        )).catch((err) => (
            dispatch({
                type: POST_PRODUCT_ERROR,
                error: 'Failed creating a product ' + err,
                loading: false,
            })    
        ))
}

export const editProduct = (subcategory, product, data) => async (dispatch) => {
    await dispatch({
        type: LOADING_EDIT_PRODUCT,
        loading: true,
        error: ''
    })
    return axios.post( `${URL}/updateProduct/${subcategory}/${product}`, data)
        .then(response => ( 
            dispatch({
                type: EDIT_PRODUCT,
                payload: response.data,
                loading: false,
                error: ''
            })
        )).catch(err => (
            dispatch({
                type: EDIT_PRODUCT_ERROR,
                error: 'Failed editing product' + err,
                loading: false,
            })
        ))
}

export const deleteProduct = (product) => (dispatch) => {
    return axios.delete( URL + `/deleteProduct/${product}`)
        .then(() => (
            dispatch({
                type: DELETE_PRODUCT,
                payload: product,
                error: ''
            })
        )).catch(err => (
            dispatch({
                type: DELETE_PRODUCT_ERROR,
                error: 'Failed to delete product: ' + err
            })
        ))
}