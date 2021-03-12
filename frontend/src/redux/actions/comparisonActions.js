import { PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT, CLEAR_RESULTS, CLEAR_SELECTED_ARRAY,
            SORT_ARRAY, GO_TO_LIST, URL, SAVE_COMBINATION        } from './types';
import AsyncStorage from '@react-native-community/async-storage';

export const selectProductToCalc = (selectedProducts, productId) => dispatch => {
    const existInSelected = selectedProducts.length == 0 ? [] : selectedProducts.find(item => item.id == productId);
    if(!existInSelected || existInSelected.length == 0){
        return AsyncStorage.getItem("persist:root").then((value) => {
            let root = JSON.parse(value);
                let productsReducer = JSON.parse(root.products);
                let products = productsReducer.products;
                let getProduct = products.find(item => item.id == productId);
                dispatch({
                    type: PRODUCT_SELECTED,
                    payload: getProduct,
                    error: ''
                })
        }).catch((error) => {
            const message = 'Error occurred. Please try again.';
            return message;
        });
    }
}

export const removeProductFromSelected = (productId) => dispatch => {
    return dispatch({
        type: REMOVE_SELECTED_PRODUCT,
        payload: productId
    })
}

export const compare = (result) => dispatch => {
    console.log("result", result)
    const match = splitComponents(result.match);
    const mismatch = splitComponents(result.mismatch)
    dispatch({
        type: COMPARE_RESULT,
        payload : {
            match: match,
            mismatch: mismatch
        }
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

// Local functions
//Split all numbers of products components
function splitComponents(component){
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
        category_id: component.category_id,
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