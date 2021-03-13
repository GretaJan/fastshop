import { 
    LOADING_POST_PRODUCT, 
    POST_PRODUCT, 
    POST_PRODUCT_ERROR, 
    LOADING_EDIT_PRODUCT, 
    EDIT_PRODUCT, 
    EDIT_PRODUCT_ERROR, 
    DELETE_PRODUCT,
    DELETE_PRODUCT_ERROR, 
    URL,
} from './types';
import { asyncStorageFunc } from './generalActions';
import axios from 'axios';



export async function getProducts(subcategoryId, page){
    return asyncStorageFunc().then(response => {
        const dataReducer = JSON.parse(response.dataUpload)
        const allProducts = dataReducer.allProducts.find(item => item.parentId == subcategoryId);
        const currentProducts = allProducts.data[page];
        if(page === 0){
            return {
                products: currentProducts,
                lastPage: allProducts.lastPage
            };
        }
        return currentProducts;
    }).catch(() => {
        return null
    })
} 

export async function getProduct(productId, subcategoryId){
    return asyncStorageFunc().then(response => {
        let dataReducer = JSON.parse(response.dataUpload);
        let subcategoryProducts = dataReducer.allProducts.find(item => item.parentId == subcategoryId); //get all products of the same subcategory
        let data = subcategoryProducts.data;
        let product;
        for(let i = 0; i < data.length; i++){
            product = data[i].find(item => item.id == productId)
            if(typeof(product) === 'object') break;
        }
        return product
    }).catch(() => {
        return null;
    })
}

export function addProduct(subcategory, data, access_token){
   
    function onlineFunc(dispatch){
        axios.post(`${URL}/addProduct/${subcategory}`, data, { headers: {
            'Authorization': `Bearer ${access_token}` }
        }, {withCredentials: true}).then((response) => ( 
            dispatch({
                type: POST_PRODUCT,
                payload: response.data,
                loading: false,
                error: '',
            })
        )).catch((err) => (
            dispatch({
                type: POST_PRODUCT_ERROR,
                error: 'Failed creating a product ' + err,
                loading: false,
            })    
        ))
    }
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
        data: data
    }
    return onlineFunc
}

export function editProduct(subcategory, product, data, token) {
    
    function onlineFunc(dispatch){
        axios.post( `${URL}/updateProduct/${subcategory}/${product}`, data, { 
            headers: {
                'Authorization': `Bearer ${ token }` }
            }, { withCredentials: true }).then(response => ( 
            dispatch({
                type: EDIT_PRODUCT,
                payload: response.data,
                loading: false,
                error: ''
            })
        )).catch(err => {
            dispatch({
                type: EDIT_PRODUCT_ERROR,
                error: 'Failed editing product' + err,
                loading: false,
            })
        })
    }
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
        data: data
    }
    return onlineFunc
}

export function deleteProduct(product) {

    function onlineFunc(dispatch){
        axios.delete( URL + `/deleteProduct/${product}`)
        .then(() => (
            dispatch({
                type: DELETE_PRODUCT,
                payload: product,
                error: ''
            })
        )).catch(err => (
            dispatch({
                type: DELETE_PRODUCT_ERROR,
                error: 'Failed to delete product: ' + err
            })
        ))
    }
    onlineFunc.interceptInOffline = true;
    onlineFunc.meta = {
        retry: true,
        name: "onlineFunc",
    }
    return onlineFunc;
}