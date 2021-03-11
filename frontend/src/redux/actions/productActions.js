import { 
    LOADING_GET_PRODUCTS, 
    GET_PRODUCTS, 
    GET_PRODUCTS_APPEND,
    GET_PRODUCTS_ERROR, 
    REMOVE_GET_PRODUCTS_ERROR,
    LOADING_GET_PRODUCT, 
    GET_PRODUCT, 
    GET_PRODUCT_ERROR, 
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



export const getProducts = (allProducts, subcategoryId, page) => async (dispatch) => {
    await dispatch({
        type: LOADING_GET_PRODUCTS,
        loading: page == 1 ? true : false,
        loadingNext: page > 1 ? true : false,
        error: ''
    });
    let filteredProducts = [];
    let lastPage = 1;
    allProducts.forEach(item => {
        if(item.parentId == subcategoryId){
            lastPage = item.lastPage;
            filteredProducts = item.data[page];
        }
    });
    dispatch({ 
        type: page == 0 ? GET_PRODUCTS : GET_PRODUCTS_APPEND,
        payload: filteredProducts,
        nextPage: page + 1,
        lastPage: lastPage,
    });
    // axios.get(`${URL}/products/${subcategory}?page=${page}`)
    //     .then(response => {
    //             return dispatch({
    //                     type: GET_PRODUCTS,
    //                     payload: response.data.data,
    //                     currentPage: response.data.meta.current_page,
    //                     lastPage: response.data.meta.last_page === response.data.meta.current_page ? true : false,
    //                 })
    //         }).catch(() => { 
    //             return dispatch({
    //                 type: GET_PRODUCTS_ERROR,
    //                 error: 'Failed to load product list',
    //             })
    //     })
    
    dispatch({
        type: REMOVE_GET_PRODUCTS_ERROR,
    })
} 

// export const getProduct = (productId) => dispatch => {
//     dispatch({
//         type: GET_PRODUCT,
//         productId: productId,
//     })
    // axios.get(`${URL}/product/${subcategoryId}/${productId}`)
    //     .then(response => (
    //             dispatch({
    //                 type: GET_PRODUCT,
    //                 payload: response.data,
    //                 loading: false,
    //                 error: ''
    //             })
    //         )
    //     ).catch(err => { 
    //         return dispatch({
    //             type: GET_PRODUCT_ERROR,
    //             error: 'Failed to load product ' + err,
    //             loading: false
    //         })
    //     })
    // dispatch({
    //     type: GET_PRODUCT,
    //     payload: product,
    //     loading: false,
    //     error: ''
    // })   
// } 
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
    })
}

export const addProduct = (subcategory, data, access_token) => async dispatch => {
    await dispatch({
        type: LOADING_POST_PRODUCT,
        loading: true,
        error: ''
    })
    return axios.post(`${URL}/addProduct/${subcategory}`, data, { headers: {
        'Authorization': `Bearer ${access_token}` }
    }, {withCredentials: true})
        .then((response) => ( 
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

export const editProduct = (subcategory, product, data, token) => async (dispatch) => {
    await dispatch({
        type: LOADING_EDIT_PRODUCT,
        loading: true,
        error: ''
    })
    return axios.post( `${URL}/updateProduct/${subcategory}/${product}`, data, { headers: {
        'Authorization': `Bearer ${access_token}` }}, { withCredentials: true })
        .then(response => ( 
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

export const deleteProduct = (product) => (dispatch) => {
    return axios.delete( URL + `/deleteProduct/${product}`)
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