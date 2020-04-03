import { GET_PRODUCTS, GET_PRODUCT, URL } from './types';

export const getProducts = (subcategory) => dispatch => {
    fetch( URL + '/products/' + subcategory, {method: 'GET'})
    .then(res => res.json())
    .then(products => {
        console.log("PRODUCTS:", products),
            dispatch({
                type: GET_PRODUCTS,
                payload: products.products
            })
        }
    ).catch(err => console.log("Fetch Categories error: ", err))
} 

export const getProduct = (subcategory, product) => dispatch => {
    fetch( URL + '/product/' + subcategory + product, {method: 'GET'})
    .then(res => res.json())
    .then(product => 
            dispatch({
                type: GET_PRODUCT,
                payload: product.product
            })
    ).catch(err => console.log("Fetch Categories error: ", err))
} 