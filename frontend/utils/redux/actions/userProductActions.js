import { 
    URL,
    LIKE_PRODUCT,
    UNLIKE_PRODUCT,
    SAVE_RESULT,
    REMOVE_RESULT
} from './types';
import axios from 'axios';
import { asyncStorageFunc } from './generalActions';

function likeProductLocalStorageFunc(productId, subcategoryId, bool){
    return asyncStorageFunc().then(response => {
        let data = JSON.parse(response.dataUpload);
        let allProducts = data.allProducts;
        let products = allProducts.find(item => item.parentId == subcategoryId);
        let productsPaginated = products.data;
        const arrayLength = productsPaginated.length;
        for(let i = 0; i < arrayLength; i++){
            const productIndex = productsPaginated[i].map(item => item.id).indexOf(productId)
            if(productIndex > -1){
                productsPaginated[i][productIndex]
                let modifiedProduct = {...productsPaginated[i][productIndex]}
                modifiedProduct.isLiked = bool;
                productsPaginated[i].splice(productIndex, 1, modifiedProduct);
                break;
            }
        }
        return allProducts;
    }).catch(() => {
        return false
    })
}

function likeFuncOnline(categoryId, productId, token){
    return axios.get(`${URL}/like-product/${categoryId}/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, { withAuthorization: true }).catch((error) => {
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

function likeFuncOffline(dispatch, productId, subcategoryId){
   //or if offline
   const productsArray = likeProductLocalStorageFunc(productId, subcategoryId, true) // replace product from original products array (isLiked attribute)
    productsArray.then(response => {
        if(response){
            dispatch({
                type: LIKE_PRODUCT,
                productId: productId,
                array: response
            })
        }
    })
}


export function likeProduct(categoryId, productId, subcategoryId, token){

    function thunkFunc(dispatch){
        likeFuncOffline(dispatch, productId, subcategoryId)
        likeFuncOnline(categoryId, productId, token)
    }
  
    thunkFunc.interceptInOffline = true;
    thunkFunc.meta = {
       retry: true,
       name: "thunkFunc",
       args: [subcategoryId, categoryId, productId, token]
   }

   return thunkFunc
}

function unlikeFuncOnline(productId, token){
    axios.get(`${URL}/unlike-product/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, { withAuthorization: true }).catch((error) => {
            const errorResp = error.response;
            let message = '';
            if(errorResp && errorResp.status != 401){
                message = errorResp.data;
            } else {
                message = 'Error occurred. Please try again.';
            }
        })
}

function unlikeFuncOffline(dispatch, productId, subcategoryId){
    const productsArray = likeProductLocalStorageFunc(productId, subcategoryId, false) // replace product from original products array (isLiked attribute)
    productsArray.then(response => {
        if(response){
            dispatch({
                type: UNLIKE_PRODUCT,
                productId: productId,
                array: response
            })
        }
    })
}

export function unlikeProduct(productId, subcategoryId, token) {
    function thunkFunc(dispatch){
        unlikeFuncOffline(dispatch, productId, subcategoryId)
        unlikeFuncOnline(productId, token)
    }

    thunkFunc.interceptInOffline = true;
    thunkFunc.meta = {
        retry: true,
        name: "thunkFunc"
    }
    return thunkFunc
}

function saveResultsOffline(dispatch, result){
    dispatch({
        type: SAVE_RESULT,
        payload: result
    })
}

function removeResultsOffline(dispatch, result){
    dispatch({
        type: REMOVE_RESULT,
        payload: result
    })
}

function saveResultsOnline(result, token){
    const data = {
        result: result
    }
    axios.post(`${URL}/save-results`, data, { 
        headers: {
        Authorization: `Bearer ${ token }`
    }}, { withCredentials: true }).then(response => {
        console.log("HHHH: ", response)
    }).catch(error => {
        console.log("ERRR: ", error)
    })
}

export function saveResults(result, token){
    console.log("result::: ", result)
    function thunkOffline(dispatch){
        if(result.matchId) saveResultsOffline(dispatch, result)
            else removeResultsOffline(dispatch, result)
        saveResultsOnline(result, token)
    }
    thunkOffline.interceptInOffline = true;
    thunkOffline.meta = {
        retry: true,
        name: "thunkOffline"
    }
    return thunkOffline;
}


// function getLikedProductsOnline(dispatch, categoryId){
//     axios.get(`/api/get-personal-favorites/${categoryId}`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }, { withAuthorization: true })
//         .then(response => {
//             dispatch({
//                 type: GET_LIKED_PRODUCTS,
//                 payload: response.data
//             })
//         }).catch(error => {
//             console.log(error.response)
//             const errorResp =  error.response;
//             let message = '';
//             if(errorResp && errorResp.status != 401){
//                 message = errorResp.data;
//             }
//             message = 'Error occurred. Please try again.';
//             dispatch({
//                 type: GET_LIKED_PRODUCTS_ERROR,
//                 payload: message
//             })
//         })
// }

// export function getLikedProducts(categoryId){
//     return asyncStorageFunc(response => {
//         let productsReducer = JSON.parse(response.products);
//         let products = productsReducer.likedProducts;
//         let likedProducts = products.filter(item => item.category_id == categoryId);
//         let filterIds = likedProducts.map(item => item.id)
//         return filterIds;
//     }).catch(() => {
//         return null
//     });
// }