import { 
    URL,
    LIKE_PRODUCT,
    LIKE_PRODUCT_ERROR,
    GET_LIKED_PRODUCTS,
    GET_LIKED_PRODUCTS_ERROR
} from './types';
import axios from 'axios';

function likeFuncOnline(dispatch, subcategoryId, productId, token){
    console.log("token", token)
    axios.get(`${URL}/like-product/${subcategoryId}/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, { withAuthorization: true })
        .then((response) => {
            console.log("response", response)
            dispatch({
                type: LIKE_PRODUCT,
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
                type: LIKE_PRODUCT_ERROR,
                payload: message
            })
        })
}

function likeFuncOffline(dispatch, accountId, productId, subcategoryId){
   //or if offline
   dispatch({
        account_id: accountId,
        product_id: productId,
        subcategory_id: subcategoryId
    })
}


export const likeProduct = (subcategoryId, productId, token, accountId, isOnline) => dispatch => {
    if(isOnline) likeFuncOnline(dispatch, subcategoryId, productId, token)
        else likeFuncOffline(dispatch, accountId, productId, subcategoryId)
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

function getLikedProductsOffline(dispatch, categoryId, accountId){
    AsyncStorage.getItem("persist:root").then((value) => {
        let root = JSON.parse(value);
            let productsReducer = JSON.parse(root.products);
            let products = productsReducer.likedProducts;
            let likedProducts = products.filter(item => (item.category_id == categoryId && item.account_id == account));
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

export const getLikedProducts = (categoryId, accountId, isOnline) => dispatch => {
    if(isOnline) getLikedProductsOnline(dispatch, categoryId)
        else getLikedProductsOffline(dispatch, categoryId, accountId)
      
}