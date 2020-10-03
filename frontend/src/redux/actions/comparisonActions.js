import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, CLEAR_RESULTS, CLEAR_SELECTED_ARRAY,
            SORT_ARRAY, GO_TO_LIST, URL } from './types';
import axios from 'axios';

export const productSelected = (subcategory, product) => dispatch => {
    return axios.get(`${URL}/product/${subcategory}/${product}`)
        .then(result => (
            dispatch({
                type: PRODUCT_SELECTED,
                payload: result.data,
                result: {},
            })
        ))
}

export const deleteProductFromList = (product) => dispatch => {
    return dispatch({
        type: REMOVE_SELECTED_PRODUCT,
        payload: product
    })
}

export const compare = (result) => dispatch => {
    let firstLink = `${URL}/product/${result.healthier.subId}/${result.healthier.id}`;
    let secondLink = `${URL}/product/${result.unhealthier.subId}/${result.unhealthier.id}`;

    const requestOne = axios.get(firstLink);
    const requestTwo = axios.get(secondLink);
    return axios.all([requestOne, requestTwo])
        .then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const result = {
                healthy: responseOne.data.product,
                unhealthy: responseTwo.data.product
            }
            return dispatch({
                type: COMPARE_RESULT,
                payload: result,
            })
        })).catch(err => {console.log("Error", err.response)})
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
        type: CLEAR_RESULTS,
        result: {},
    })
}

export const clearSelectedArray = () => dispatch => {
    dispatch({
        type: CLEAR_SELECTED_ARRAY,
        array: [],
        results: {},
    })
}