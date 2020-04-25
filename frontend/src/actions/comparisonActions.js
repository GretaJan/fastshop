import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, clear_results, 
            SORT_ARRAY, GO_TO_LIST, DIAGRAM_RESULTS, URL } from './types';
import axios from 'axios';

// export const allSelectedProducts = () => dispatch => {
  
//             dispatch({
//                 type: ALL_SELECTED_PRODUCTS,
//             })
// }

export const productSelected = (product, subcategory) => dispatch => {
    axios.get(URL + '/product/' + subcategory + '/' +  product)
        .then(product => {
            dispatch({
                type: PRODUCT_SELECTED,
                payload: product.data.product,
                calculated: false,
                result: {},
                diagram: {},
            })
        })
}

export const deleteProductFromList = (product) => dispatch => {
    dispatch({
        type: REMOVE_SELECTED_PRODUCT,
        payload: product.id
    })
}

export const compare = (result) => dispatch => {
    let firstLink = URL + '/product/' + result.healthier.subId + '/' +  result.healthier.id;
    let secondLink = URL + '/product/' + result.unhealthier.subId + '/' +  result.unhealthier.id;

    const requestOne = axios.get(firstLink);
    const requestTwo = axios.get(secondLink);
    axios.all([requestOne, requestTwo])
        .then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const result = {
                healty: responseOne.data.product,
                unhealty: responseTwo.data.product,
            }
            dispatch({
                type: COMPARE_RESULT,
                payload: result,
                array: [],
                calculated: true
            })
        })).catch(err => {console.log("Error", err.response)})
    
    //  axios.get(URL + '/product/' + result.bestSubId + '/' +  result.bestId)
    //     .then(result => {
    //     }).catch(err => console.log("error: ", err.result))

    //  axios.get(URL + '/product/' + result.lowestSubId + '/' +  result.lowestId)
    // .then(result => {
    //     const worstProduct = result.data.product;
    // }).catch(err => console.log("error: ", err.result));

}

export const diagramResults = (result) => dispatch => {
    const diagram = {
        goodInHealthy: result.healthier.goodComponents,
        badInHealthy: result.healthier.badComponents,
        goodInUnhealthy: result.unhealthier.goodComponents,
        badInUnhealthy: result.unhealthier.badComponents,
    }
    console.log('diagram', diagram);
    dispatch({
        type: DIAGRAM_RESULTS,
        diagram: diagram,
    })

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
        diagram: {},
        calculated: null
    })
}
