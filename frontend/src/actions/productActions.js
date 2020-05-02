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
    axios.get( URL + '/products/' + subcategory)
    .then(products => {
            dispatch({
                type: GET_PRODUCTS,
                payload: products.data.products.sort(sorting),
                loading: false,
                error: ''
            })
        }
    ).catch(err => { 
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
    .then(product => { console.log("product GEET: ", product),
            dispatch({
                type: GET_PRODUCT,
                payload: product.data.product,
                loading: false,
                error: ''
            })
        }
    ).catch(err => { console.log("Product Err: ", err.response)
        dispatch({
            type: GET_PRODUCTS_ERROR,
            error: 'Failed to load: ', err,
            loading: false
        })
    })
       
} 

export const postProduct = (subcategory, data) => dispatch => {
    console.log("subcategory id: ", subcategory, "product id: ", data);
    axios.post(URL + '/addProduct/' + subcategory, data)
    .then((product) => { console.log("product: ", product)
        dispatch({
            type: POST_PRODUCT,
            payload: product.data.product
        })
    }).catch((err) =>console.log("Error:", err))
}

export const editProduct = (subcategory, product, data) => (dispatch) => {
    console.log("subcategory id: ", subcategory, "product id: ", product, " ", data);
    axios.post( URL + `/updateProduct/${subcategory}/${product}`, data)
        .then(item => {  console.log("full product: ", item.data)
            let productTemp = item.data;
            productTemp.id = product;
            productTemp.subcategory_id = subcategory;
            console.log('product.data', productTemp)
            dispatch({
                type: EDIT_PRODUCT,
                payload: item.data,
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