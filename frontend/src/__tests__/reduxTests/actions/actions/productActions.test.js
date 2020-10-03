import { getProducts, getProduct, addProduct, editProduct, deleteProduct } from '../../../../redux/actions/productActions';
import { URL, LOADING_GET_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_ERROR, LOADING_GET_PRODUCT, GET_PRODUCT, GET_PRODUCT_ERROR, LOADING_POST_PRODUCT, POST_PRODUCT, POST_PRODUCT_ERROR, EDIT_PRODUCT, EDIT_PRODUCT_ERROR, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, LOADING_EDIT_PRODUCT } from '../../../../redux/actions/types';
import ConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = ConfigureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});

describe('Product GET requests', () => {
    beforeEach(() => {
        store.clearActions();
    });
    let subcategory = 1;
    let page = 2;
    
    it('given correct data by GET request, axios passes all products to Reducer', async () => {
        mock.onGet(`${URL}/products/${subcategory}?page=${page}`).reply(200, { data: [
            {
                id: 1,
                name: "Beverage",
                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
            },
            {
                id: 2,
                name: "Food",
                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/u597O8p8ph.png",
            }
        ], 
        meta: {
            current_page: 2,
            last_page: 3
        }
    });
        await store.dispatch(getProducts(subcategory, page)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_GET_PRODUCTS,
                    loading: false,
                    loadingNext: true,
                    error: ''
                },
                {
                    type: GET_PRODUCTS,
                    payload:  [
                        {
                        id: 1,
                        name: "Beverage",
                            image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
                        },
                        {
                            id: 2,
                            name: "Food",
                            image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/u597O8p8ph.png",
                        }
                    ],
                        loading: false,
                        loadingNext: false,
                        error: '',
                        currentPage: 2,
                        lastPage: false
                    }
                ];
                  
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('given incorrect data by GET request, axios fails passing products to REDUCER and returns error', async() => {
        mock.onGet(`${URL}/products/${subcategory}?page=${page}`).reply(400, { data: {
            error: 'Failed to load product listError: Request failed with status code 404'
        }});
        await store.dispatch(getProducts(1, 1)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_GET_PRODUCTS,
                    loading: true,
                    loadingNext: false,
                    error: ''
                },
                {
                    type: GET_PRODUCTS_ERROR,
                    error: 'Failed to load product listError: Request failed with status code 404',
                    loading: false,
                    loadingNext: false,
                }
            ];       
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    let subcategoryId = 10;
    let productId = 1;
    it('given correct data by GET a single product request, axios passes product to Reducer', async () => {
        mock.onGet(`${URL}/product/${subcategoryId}/${productId}`).reply(200, 
            {
                id: 1,
                name: "Beverage product",
                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
            }
        );
        await store.dispatch(getProduct(subcategoryId, productId)).then((data) => {
            // let expectedActions = [
            //     {
            //         type: LOADING_GET_PRODUCT, 
            //         error: '',
            //         loading: true
            //     },
            //     {
            //         type: GET_PRODUCT, 
            //         payload: {
            //             id: 1,
            //             name: "Beverage product",
            //             image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png"
            //         },
            //         loading: false,
            //         error: ''
            //     }
            // ];
            expect(store.getActions()[1]).toEqual(data);
        })
    });
    it('given incorrect data by GET single product request, axios fails passing single product to REDUCER and returns error', async () => {
        mock.onGet(`${URL}/product/${subcategoryId}/${subcategoryId}`).reply(400, { data: {
            error: 'Failed to load product Error: Request failed with status code 400'
        }});
        await store.dispatch(getProduct(subcategoryId, subcategoryId)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_GET_PRODUCT, 
                    error: '',
                    loading: true
                },
                {
                    type: GET_PRODUCT_ERROR,
                    error: 'Failed to load product Error: Request failed with status code 400',
                    loading: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});
describe('product POST actions', () => {
    beforeEach(() => {
        store.clearActions();
    });
    let subcategoryId = 5;
    let data = {
        id: 12,
        name: "Product added",
        fat: 10.5
    }
    it('given correct data by POST request, new product can be added to REDUCER', async () => {
        mock.onPost(`${URL}/addProduct/${subcategoryId}`).reply(201, 
            data
        );
        await store.dispatch(addProduct(subcategoryId, data)).then((data) => {
            // let expectedActions = [
            //     {
            //         type: LOADING_POST_PRODUCT,
            //         error: '',
            //         loading: true
            //     },
            //     {
            //         type: POST_PRODUCT,
            //         payload: {
            //             id: 12,
            //             name: "Product added",
            //             fat: 10.5
            //         },
            //         error: '',
            //         loading: false 
            //     }
            // ];
            expect(store.getActions()[1]).toEqual(data);
        })
    });
    it('given correct data by POST request, error is passed to REDUCER', async () => {
        mock.onPost(`${URL}/addProduct/${subcategoryId}`).reply(400, {  
                error: 'Failed creating a product Error: Request failed with status code 400'
            })
        await store.dispatch(addProduct(subcategoryId, data)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_POST_PRODUCT,
                    error: '',
                    loading: true
                },
                {
                    type: POST_PRODUCT_ERROR,
                    error: 'Failed creating a product Error: Request failed with status code 400',
                    loading: false,
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});
describe('products PUT actions',() => {
    beforeEach(() => {
        store.clearActions()
    });
    let subcategoryId = 7;
    let productId = 5;
    let data = {
        id: 5,
        name: 'Updated name',
        '_method' : 'put'
    }
    it('given correct data by PUT request, updated product is passed to REDUCER', async () => {
        mock.onPost(`${URL}/updateProduct/${subcategoryId}/${productId}`).reply(201,
            {
                id: 5,
                name: 'Updated name',
            }
        );
        await store.dispatch(editProduct(subcategoryId, productId, data)).then((data) => {
            let expectedActions = [
                {
                    type: LOADING_EDIT_PRODUCT,
                    error: '',
                    loading: true
                },
                {
                    type: EDIT_PRODUCT,
                    payload: {
                        id: 5,
                        name: 'Updated name',
                    },
                    error: '',
                    loading: false
                }
            ];
            expect(store.getActions()[1]).toEqual(data);
        })
    })
    it('given incorrect data by PUT request, error is passed to REDUCER', async () => {
        mock.onPost(`${URL}/updateProduct/${subcategoryId}/${productId}`).reply(400, { data: {
            error: 'Failed editing productError: Request failed with status code 400' 
        } });
        await store.dispatch(editProduct(subcategoryId, productId, data)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_EDIT_PRODUCT,
                    error: '',
                    loading: true
                },
                {
                    type: EDIT_PRODUCT_ERROR,
                    error: 'Failed editing productError: Request failed with status code 400',
                    loading: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});
describe('products DELETE actions', () => {
    beforeEach(() => {
        store.clearActions()
    });
    
    let productId = 7;
    it('given correct data by DELETE request, id of deleted product is passed to REDUCER', async  () => {
        mock.onDelete(`${URL}/deleteProduct/${productId}`).reply(200, { data: productId });
        await store.dispatch(deleteProduct(productId)).then(() => {
            let expectedActions = [{
                type: DELETE_PRODUCT,
                payload: productId,
                error: '',
            }];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
    it('given incorrect data by DELETE request, fails to pass product id to be deleted to REDUCER', async () => {
        mock.onDelete(`${URL}/deleteProduct/${productId}`).reply(400, { data: { 
            error: 'Failed to delete product: Error: Request failed with status code 400'
        } });
        await store.dispatch(deleteProduct(productId)).then(() => {
            let expectedActions = [
                {
                    type: DELETE_PRODUCT_ERROR,
                    error: 'Failed to delete product: Error: Request failed with status code 400',
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});