import { GET_PRODUCTS, FRW_TO_PRODUCTS, URL } from './types';

export const getProducts = (product) => dispatch => {
    fetch( URL + '/products/' + product, {method: 'GET'})
    .then(res => res.json())
    .then(products => 
            dispatch({
                type: GET_PRODUCTS,
                payload: products.products
            })
    ).catch(err => console.log("Fetch Categories error: ", err))
} 