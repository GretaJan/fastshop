import { LOADING_GET_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_ERROR, UNMOUNT_PRODUCTS, GET_PRODUCT, POST_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, URL } from './types';
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
    axios.get(`${URL}/products/${subcategory}?page=${page}`)
    .then(products => {
            var lastPageNo = false; 
            if(products.data.meta.last_page === products.data.meta.current_page) {
                lastPageNo = true;                
            }
            dispatch({
                type: GET_PRODUCTS,
                // payload: products.data.data.sort(sorting),
                payload: products.data.data,
                loading: false,
                loadingNext: false,
                error: '',
                currentPage: products.data.meta.current_page,
                lastPage: lastPageNo,
            })
        }).catch(err => { console.log("error:", err)
            dispatch({
            type: GET_PRODUCTS_ERROR,
            error: 'Failed to load product list',
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
    // fetch( URL + '/product/' + subcategory + product, {method: 'GET'})
    // .then(res => res.json())
    // .then(product => {
    //     console.log("ONE PRODUCT: ", product)
    //         dispatch({
    //             type: GET_PRODUCT,
    //             payload: {}
    //         })
    //     }
    // ).catch(err => console.log("Fetch Categories error: ", err))
    dispatch({
        type: LOADING_GET_PRODUCTS,
        loading: true
    })
    axios.get( URL + '/product/' + subcategory + '/' + product)
    .then(product => {
            dispatch({
                type: GET_PRODUCT,
                payload: product.data.product,
                loading: false,
                error: ''
            })
        }
    ).catch(err => { 
        dispatch({
            type: GET_PRODUCTS_ERROR,
            error: 'Failed to load product ', err,
            loading: false
        })
    })
       
} 

export const postProduct = (subcategory, data) => dispatch => {
    axios.post(URL + '/addProduct/' + subcategory, data)
    .then((product) => { 
        dispatch({
            type: POST_PRODUCT,
            payload: product.data.product
        })
    }).catch((err) =>console.log("Error:", err.response))
}

export const editProduct = (subcategory, product, data) => (dispatch) => {
    axios.post( URL + `/updateProduct/${subcategory}/${product}`, data)
        .then(item => { 
            dispatch({
                type: EDIT_PRODUCT,
                payload: item.data.product,
            })
        }).catch(err => 
            console.log("EDIT PRODUCT ERROR: ", err.response))
}

export const deleteProduct = (product) => (dispatch) => {
    axios.delete( URL + `/deleteProduct/${product}`)
        .then(() => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: product,
            })
        }).catch(err => 
            console.log("DELETE PRODUCT ERROR: ", err.response))
}