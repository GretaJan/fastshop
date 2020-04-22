import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, CLEARE_RESULTS, URL } from './types';
import axios from 'axios';

export const productSelected = (product, subcategory) => dispatch => {
    axios.get(URL + '/product/' + subcategory + '/' +  product)
        .then(product => {
            dispatch({
                type: PRODUCT_SELECTED,
                payload: product.data.product,
                calculated: false
            })
        })
}

export const deleteProductFromList = (product) => dispatch => {
    dispatch({
        type: REMOVE_SELECTED_PRODUCT,
        payload: product.id
    })
}

export const compare = async(result, countAll) => dispatch => {

    await axios.get(URL + '/product/' + result.bestSubId + '/' +  bestId)
        .then(result => {
            console.log("result", result)
        }).catch(err => console.log("error: ", err))

    if(countAll) {
        dispatch({
            calculatedAll: true,
            type: COMPARE_RESULT,
            payload: result,
            array: [],
            calculated: true
        })
    } else {
        dispatch({
            calculatedAll: false,
            type: COMPARE_RESULT,
            payload: result,
            array: [],
            calculated: true
        })
    }
}

export const clearResults = () => dispatch => {
    dispatch({
        type: CLEARE_RESULTS,
        array: [],
        result: {},
        calculated: null
    })
}