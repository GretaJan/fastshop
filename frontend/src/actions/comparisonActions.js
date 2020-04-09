import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, URL } from './types';
import axios from 'axios';

export const productSelected = (product, subcategory) => dispatch => {
    axios.get(URL +'/product/' + subcategory +'/' +  product)
        .then(product => { 
            dispatch({
                type: PRODUCT_SELECTED,
                payload: product.data.product
            })
        })
}

export const deleteProductFromList = (product) => dispatch => {
    dispatch({
        type: REMOVE_SELECTED_PRODUCT,
        payload: product
    })
}