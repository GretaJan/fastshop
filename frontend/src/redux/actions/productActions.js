import { LOADING_GET_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_ERROR, UNMOUNT_PRODUCTS, GET_PRODUCT, LOADING_POST_PRODUCT, POST_PRODUCT, POST_PRODUCT_ERROR, LOADING_EDIT_PRODUCT, EDIT_PRODUCT, EDIT_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, URL } from './types';
import axios from 'axios';

export const getProducts = (subcategory, page) => dispatch => {
    dispatch({
        type: LOADING_GET_PRODUCTS,
        loading: page == 1 ? true : false,
        loadingNext: page > 1 ? true : false,
    });
    const sorting = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
     
        if(nameA < nameB) {
            return -1;
        } else if(nameA > nameB) {
            return 1;
        } 
        return 0;
    }
    return axios.get(`${URL}/products/${subcategory}?page=${page}`)
    .then(products => {
            var lastPageNo = false; 
            if(products.data.meta.last_page === products.data.meta.current_page) {
                lastPageNo = true;                
            }
            return dispatch({
                    type: GET_PRODUCTS,
                    // payload: products.data.data.sort(sorting),
                    payload: products.data.data,
                    loading: false,
                    loadingNext: false,
                    error: '',
                    currentPage: products.data.meta.current_page,
                    lastPage: lastPageNo,
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

export const unmountProducts = () => dispatch => {
    dispatch({
        type: UNMOUNT_PRODUCTS,
        payload: [],
        currentPage: 1,
        lastPage: false,
    })
}

export const getProduct = (subcategory, product) => (dispatch) => {
    dispatch({
        type: LOADING_GET_PRODUCTS,
        loading: true
    })
    return axios.get( `${URL}/product/${subcategory}/${product}`)
        .then(product => {
                return dispatch({
                    type: GET_PRODUCT,
                    payload: product.data.product,
                    loading: false,
                    error: ''
                })
            }
        ).catch(err => { 
            return dispatch({
                type: GET_PRODUCTS_ERROR,
                error: 'Failed to load product ', err,
                loading: false
            })
        })   
} 

export const addProduct = (subcategory, data) => dispatch => {
    dispatch({
        type: LOADING_POST_PRODUCT,
        error: '',
        loading: true,
    })
    return axios.post(`${URL}/addProduct/${subcategory}`, data)
        .then((product) => ( 
            dispatch({
                type: POST_PRODUCT,
                payload: product.data.product,
                error: '',
                loading: false,
            })
        )).catch((err) => (
            dispatch({
                type: POST_PRODUCT_ERROR,
                error: 'Failed creating a product ' + err,
                loading: false,
            })    
        ))
}

export const editProduct = (subcategory, product, data) => (dispatch) => {
    dispatch({
        type: LOADING_EDIT_PRODUCT,
        loading: true,
        error: ''
    })
    return axios.post( `${URL}/updateProduct/${subcategory}/${product}`, data)
        .then(response => ( 
            dispatch({
                type: EDIT_PRODUCT,
                payload: response.data.product,
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