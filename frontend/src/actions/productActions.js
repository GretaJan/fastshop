import { LOADING_GET_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_ERROR, GET_PRODUCT, POST_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, URL } from './types';
import axios from 'axios';

export const getProducts = (subcategory) => dispatch => {
    // fetch( URL + '/products/' + subcategory, {method: 'GET'})
    // .then(res => {res.json(), console.log("RESP JSON: ", res.json(res))})
    // .then(products => {
    //     console.log("PRODUCTS:", products),
    //         dispatch({
    //             type: GET_PRODUCTS,
    //             payload: {}
    //         })
    //     }
    // ).catch(err => console.log("Fetch Categories error: ", err))
    dispatch({
        type: LOADING_GET_PRODUCTS,
        loading: true
    });
    axios.get( URL + '/products/' + subcategory)
    .then(products => { console.log("produts: ",products),
            dispatch({
                type: GET_PRODUCTS,
                payload: products.data.products,
                loading: false,
                error: ''
            })
        }
    ).catch(err => { console.log(err.response),
        dispatch({
            type: GET_PRODUCTS_ERROR,
            error: 'Failed to load product list...',
            loading: false
        })
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
    .then(product => { console.log("THIS PRODUCT: ", product.data.product)
            dispatch({
                type: GET_PRODUCT,
                payload: product.data.product,
                loading: false,
                error: ''
            })
        }
    ).catch(err =>  
        dispatch({
            type: GET_PRODUCTS_ERROR,
            error: 'Failed to load: ', err,
            loading: false
        }))
} 

export const addProduct = (product, subcategory) => dispatch => {
    axios.post( URL + '/addProduct/' + subcategory, product )
        .then(product => { console.log("Product: ", product),
            dispatch({
                action: POST_PRODUCT,
                payload: product.data
            })
        }).catch(err => 
            console.log("POST PRODUCT ERROR: ", err.response))
}

export const editProduct = (product, subcategory, data) => (dispatch) => {
    axios.post( URL + `/updateProduct/${subcategory}/${product}`, data)
        .then(product => { console.log("show: ", product)
            dispatch({
                action: EDIT_PRODUCT,
                payload: product.data,
                edited: true
            })
        }).catch(err => 
            console.log("EDIT PRODUCT ERROR: ", err))
}

export const deleteProduct = (product) => (dispatch) => {
    axios.delete( URL + `/deleteProduct/${product}`)
        .then(() => {
            dispatch({
                action: DELETE_PRODUCT,
                payload: product,
            })
        }).catch(err => 
            console.log("DELETE PRODUCT ERROR: ", err.response))
}