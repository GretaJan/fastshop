import { 
    URL,
    LIKE_PRODUCT,
    UNLIKE_PRODUCT,
    GET_LIKED_PRODUCTS,
    GET_LIKED_PRODUCTS_ERROR
} from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

function likeProductLocalStorageFunc(productId, bool){
    AsyncStorage.getItem("persist:root").then((value) => {
        let root = JSON.parse(value);
        let productsReducer = JSON.parse(root.products);
        let products = productsReducer.products;
        let index = products.map(item => item.id).indexOf(productId);
        let product = products.filter(item => item.id == productId);
        let modifiedProduct = {...product[0]};
        modifiedProduct.isLiked = bool;
        products.splice(index, 1, modifiedProduct);
        return products;
    }).catch(() => {
        return false
    })
}

function likeFuncOnline(dispatch, categoryId, productId, token){
    return axios.get(`${URL}/like-product/${categoryId}/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, { withAuthorization: true })
        .then( () => {
            const productsArray = likeProductLocalStorageFunc(productId, true) // replace product from original products array (isLiked attribute)
            if(productsArray)
                dispatch({
                    type: LIKE_PRODUCT,
                    productId: productId,
                    array: productsArray
                })
        }).catch((error) => {
            const errorResp = error.response;
            let message = '';
            if(errorResp && errorResp.status == 400){
                message = errorResp.data;
            } else {
                message = 'Error occurred. Please try again.';
            }
            return message;
        })
}

function likeFuncOffline(dispatch, productId){
   //or if offline
   const productsArray = likeProductLocalStorageFunc(productId, true) // replace product from original products array (isLiked attribute)
    if(productsArray){
        dispatch({
            type: LIKE_PRODUCT,
            productId: productId,
            array: productsArray
        })
    }
}


export const likeProduct = (categoryId, productId, token, isOnline) => dispatch => {
    if(isOnline) return likeFuncOnline(dispatch, categoryId, productId, token)
        else return likeFuncOffline(dispatch, productId, categoryId)
}

function unlikeFuncOnline(dispatch, productId, token){
    axios.get(`${URL}/unlike-product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, { withAuthorization: true })
        .then( () => {
            const productsArray = likeProductLocalStorageFunc(productId, false) // replace product from original products array (isLiked attribute)
            if(productsArray)
                dispatch({
                    type: UNLIKE_PRODUCT,
                    productId: productId,
                    array: productsArray
                })
        }).catch((error) => {
            const errorResp = error.response;
            let message = '';
            if(errorResp && errorResp.status != 401){
                message = errorResp.data;
            } else {
                message = 'Error occurred. Please try again.';
            }
            console.log("message: ", message);
        })
}

function unlikeFuncOffline(dispatch, productId){
    const productsArray = likeProductLocalStorageFunc(productId, false) // replace product from original products array (isLiked attribute)
    if(productsArray){
        dispatch({
            type: UNLIKE_PRODUCT,
            product_id: productId,
            array: productsArray
        })
    }
}

export const unlikeProduct = (productId, token, isOnline) => dispatch => {
    if(isOnline) unlikeFuncOnline(dispatch, productId, token)
        else unlikeFuncOffline(dispatch, productId)
}


function getLikedProductsOnline(dispatch, categoryId){
    axios.get(`/api/get-personal-favorites/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, { withAuthorization: true })
        .then(response => {
            dispatch({
                type: GET_LIKED_PRODUCTS,
                payload: response.data
            })
        }).catch(error => {
            console.log(error.response)
            const errorResp =  error.response;
            let message = '';
            if(errorResp && errorResp.status != 401){
                message = errorResp.data;
            }
            message = 'Error occurred. Please try again.';
            dispatch({
                type: GET_LIKED_PRODUCTS_ERROR,
                payload: message
            })
        })
}

function getLikedProductsOffline(dispatch, categoryId){
    AsyncStorage.getItem("persist:root").then((value) => {
        let root = JSON.parse(value);
            let productsReducer = JSON.parse(root.products);
            let products = productsReducer.likedProducts;
            let likedProducts = products.filter(item => item.category_id == categoryId);
            console.log('likedProducts: ', likedProducts)
            dispatch({
                type: GET_LIKED_PRODUCTS,
                payload: likedProducts
            })
        }).catch(() => {
            dispatch({
                type: GET_LIKED_PRODUCTS_ERROR,
                error: 'Error occurred. Please try again.',
            })
        });
}

export const getLikedProducts = (categoryId, isOnline) => dispatch => {
    if(isOnline) getLikedProductsOnline(dispatch, categoryId)
        else getLikedProductsOffline(dispatch, categoryId)
}
