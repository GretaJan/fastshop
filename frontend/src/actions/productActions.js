import { GET_PRODUCTS, FRW_TO_PRODUCTS, URL } from '../actions/types';

export const getProducts = () => dispatch => {
    fetch( URL + '/products', {method: 'GET'})
    .then(res => res.json())
    .then(products => 
            dispatch({
                type: GET_PRODUCTS,
                payload: products.products
            })
    ).catch(err => console.log("Fetch Categories error: ", err))
} 