import { GET_PRODUCTS, GET_PRODUCT, URL } from './types';
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
    axios.get( URL + '/products/' + subcategory)
    .then(products => {
            dispatch({
                type: GET_PRODUCTS,
                payload: products.data.products
            })
        }
    ).catch(err => console.log("Fetch Categories error: ", err))
} 

export const getProduct = (subcategory, product) => dispatch => {
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
    axios.get( URL + '/product/' + subcategory + '/' + product)
    .then(product => {
            dispatch({
                type: GET_PRODUCT,
                payload: product.data.product[0]
            })
        }
    ).catch(err => console.log("Fetch Categories error: ", err))
} 