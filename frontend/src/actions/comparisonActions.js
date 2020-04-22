import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, clear_results, 
            SORT_ARRAY, GO_TO_LIST, URL } from './types';
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

export const compare = (result, countAll) => dispatch => {
    axios.get(URL + '/product/' + result.bestSubId + '/' +  result.bestId)
        .then(result => {
            console.log("result", result)
        }).catch(err => console.log("error: ", err.result))

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

export const sortArray = (sortedArray) => dispatch => {
    dispatch({
        type: SORT_ARRAY,
        payload: sortedArray,
        sorted: true
    })
}

export const goToList = (show) => dispatch => {
        dispatch({
            type: GO_TO_LIST,
            sorted: show
        })
}

export const clearResults = () => dispatch => {
    dispatch({
        type: clear_results,
        array: [],
        result: {},
        calculated: null
    })
}
