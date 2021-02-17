import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, CLEAR_RESULTS, CLEAR_SELECTED_ARRAY,
            SORT_ARRAY, GO_TO_LIST, URL, SAVE_COMBINATION        } from './types';
import axios from 'axios';
import store from '../store';
import AsyncStorage from '@react-native-community/async-storage';

// export const selectProductToCalc = (subcategory, product) => dispatch => {
//     return axios.get(`${URL}/product/${subcategory}/${product}`)
//         .then(result => (
//             dispatch({
//                 type: PRODUCT_SELECTED,
//                 payload: result.data,
//                 result: {},
//             })
//         ))
// }
export const selectProductToCalc = (selectedProducts, productId) => dispatch => {
    // return axios.get(`${URL}/product/${subcategory}/${product}`)
    //     .then(result => (
    //         dispatch({
    //             type: PRODUCT_SELECTED,
    //             payload: result.data,
    //             result: {},
    //         })
    //     ))
   console.log("IDDD:: ", productId)
    const existInSelected = selectedProducts.length == 0 ? [] : selectedProducts.find(item => item.id == productId);
    if(!existInSelected || existInSelected.length == 0){
        AsyncStorage.getItem("persist:root").then((value) => {
            let root = JSON.parse(value);
                let productsReducer = JSON.parse(root.products);
                let products = productsReducer.products;
                let getProduct = products.find(item => item.id == productId);
                console.log(getProduct)
                dispatch({
                    type: PRODUCT_SELECTED,
                    payload: getProduct,
                    result: {},
                    error: ''
                })
        }).catch(() => {
            dispatch({
                type: PRODUCT_SELECTED_ERROR,
                error: 'Error occurred. Please try again.',
            })
        });
    }
}

export const removeProductFromSelected = (productId) => dispatch => {
    console.log(productId)
    return dispatch({
        type: REMOVE_SELECTED_PRODUCT,
        payload: productId
    })
}

export const compare = (result) => dispatch => {
    console.log("ressss:: ", result)
    const match = splitComponents(result.match);
    const mismatch = splitComponents(result.mismatch)
    dispatch({
        type: COMPARE_RESULT,
        payload : {
            match: match,
            mismatch: mismatch
        }
    })
    // let firstLink = `${URL}/product/${result.healthier.subId}/${result.healthier.id}`;
    // let secondLink = `${URL}/product/${result.unhealthier.subId}/${result.unhealthier.id}`;

    // const requestOne = axios.get(firstLink);
    // const requestTwo = axios.get(secondLink);
    // return axios.all([requestOne, requestTwo])
    //     .then(axios.spread((...responses) => {
    //         const responseOne = responses[0];
    //         const responseTwo = responses[1];
    //         const result = {
    //             healthy: responseOne.data.product,
    //             unhealthy: responseTwo.data.product
    //         }
    //         return dispatch({
    //             type: COMPARE_RESULT,
    //             payload: result,
    //         })
    //     })).catch(err => {console.log("Error", err.response)})
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

export const saveCombination = (productOne, productTwo) => (dispatch) => {
    dispatch({
        type: SAVE_COMBINATION,
        payload: {
            productOne,
            productTwo
        }
    })
} 

// Loal functions
//Split all numbers of products components
function splitComponents(component){
    console.log("COMMMMM: ", component)
    let energy = component.energy;
    let fat = component.fat;
    let saturated = component.saturated;
    let carbs = component.carbs;
    let sugar = component.sugar;
    let fiber = component.fiber;
    let protein = component.protein;
    let salt = component.salt;
    let vitamins = component.vitamins;
    let energyArr = energy ? createArrayFromNumbers(energy.toString().split('')) : null;
    let fatArr = fat ? createArrayFromNumbers(fat.toString().split('')) : null
    let saturatedArr = saturated ? createArrayFromNumbers(saturated.toString().split('')) : null
    let carbsArr = carbs ? createArrayFromNumbers(carbs.toString().split('')) : null
    let sugarArr = sugar ? createArrayFromNumbers(sugar.toString().split('')) : null
    let fiberArr = fiber ? createArrayFromNumbers(fiber.toString().split('')) : null
    let proteinArr = protein ? createArrayFromNumbers(protein.toString().split('')) : null
    let saltArr = salt ? createArrayFromNumbers(salt.toString().split('')) : null
    let vitaminsArr = vitamins ? createArrayFromNumbers(vitamins.toString().split('')) : null
    return {
        id: component.id,
        subcategory_id: component.subcategory_id,
        name: component.name,
        image: component.image,
        energy: energy,
        energyArr: energyArr,
        fat: fat,
        fatArr: fatArr,
        saturated: saturated,
        saturatedArr: saturatedArr,
        carbs: carbs,
        carbsArr: carbsArr,
        sugar: sugar,
        sugarArr: sugarArr,
        fiber: fiber,
        fiberArr: fiberArr,
        protein: protein,
        proteinArr: proteinArr,
        salt: salt,
        saltArr: saltArr,
        vitamins: vitamins,
        vitaminsArr: vitaminsArr
    }
}

function createArrayFromNumbers(numArr){
    const arraysArr = [];
    numArr.forEach(item => {
        let currentNumArr = [];
        if(item != '.'){
            for(let i = 0; i <= parseInt(item); i++){
                currentNumArr.push(i);
            }
            arraysArr.push(currentNumArr);
        } else {
            arraysArr.push(['.']);
        }
    })
    return arraysArr;
}