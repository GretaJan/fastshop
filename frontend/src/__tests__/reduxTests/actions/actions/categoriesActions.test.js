import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCategories, addCategory, editCategory, deleteCategory } from '../../../../redux/actions/categoryActions';
import { URL, LOADING_GET_CATEGORIES, GET_CATEGORIES, GET_CATEGORIES_ERROR, LOADING_POST_CATEGORY, POST_CATEGORY, POST_CATEGORY_ERROR, LOADING_EDIT_CATEGORY, EDIT_CATEGORY, EDIT_CATEGORY_ERROR, DELETE_CATEGORY, DELETE_CATEGORY_ERROR } from '../../../../redux/actions/types';
import expect from 'expect';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

describe('Categories GET request', () => {
    afterEach(() => {
        store.clearActions();
    });
    it('given correct data by GET request, axios passes all categories to Reducer', async () => {
        mock.onGet(`${URL}/categories`).reply(200, { categories: [
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
        ]});
        await store.dispatch(getCategories()).then(() => {
            let expectedActions = [
                {
                    type: LOADING_GET_CATEGORIES,
                    loading: true,
                    error: ''
                },
                {
                    type: GET_CATEGORIES,
                    payload: [
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
                    error: ''
                }
            ];       
                expect(store.getActions()).toEqual(expectedActions);
        })
    });
    it('given incorrect data by GET request, axios fails passing categories to REDUCER and returns error', async () => {
        mock.onGet(`${URL}/categories`).reply(400, { error: { message: 'Failed to load categories list... Error: Request failed with status code 400' } })
        await store.dispatch(getCategories()).then(() => {
            let expectedActions = [
                {
                    type: LOADING_GET_CATEGORIES,
                    loading: true,
                    error: ''
                },
                {
                    type: GET_CATEGORIES_ERROR,
                    error: 'Failed to load categories list... Error: Request failed with status code 400',
                    loading: false, 
                }
            ];              
                expect(store.getActions()).toEqual(expectedActions);
            })
    })
});
describe('categories POST actions', () => {
    beforeEach(() => {
        store.clearActions();
    });
    const postData = {
        id: 5,
        name: 'Category added',
        background: '#f5f5f5'
    };

    it('given correct data by POST request, new category can be added to REDUCER', async() => {
        mock.onPost(`${URL}/addCategory`).reply(201, postData);
        await store.dispatch(addCategory(postData)).then((data) => {
            let expectedActions = [
                {
                    type: LOADING_POST_CATEGORY,
                    loading: true,
                    error: '',
                },
                {
                    type: POST_CATEGORY,
                    payload: postData,
                    error: '',
                    loading: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
    it('given correct data by POST request, error is passed to REDUCER', async() => {
        mock.onPost(`${URL}/addCategory`).reply(400, {
            error: 'Failed to create a new category Error: Request failed with status code 400' 
        });
        await store.dispatch(addCategory()).then(() => {
            let expectedActions = [
                {
                    type: LOADING_POST_CATEGORY,
                    loading: true,
                    error: '',
                },
                {
                    type: POST_CATEGORY_ERROR,
                    error: 'Failed to create a new category Error: Request failed with status code 400',
                    loading: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
})
describe('categories PUT actions',() => {
    beforeEach(() => {
        store.clearActions()
    });
    
    let categoryId = 5;
    let data = {
        id: 5,
        name: 'Updated name',
        '_method' : 'put'
    }
    it('given correct data by PUT request, updated category is passed to REDUCER', async() => {
        mock.onPost(`${URL}/updateCategory/${categoryId}`).reply(201, data );
        await store.dispatch(editCategory(categoryId, data)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_EDIT_CATEGORY,
                    error: '',
                    loading: true
                },
                {
                    type: EDIT_CATEGORY,
                    payload: {
                        id: 5,
                        name: 'Updated name',
                        '_method' : 'put'
                    },
                    error: '',
                    loading: false
                } 
            ]
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
    it('given incorrect data by PUT request, error is passed to REDUCER', async () => {
        mock.onPost(`${URL}/updateCategory/${categoryId}`).reply(400, {
            error: 'Failed updating categoryError: Request failed with status code 400' 
        });
        await store.dispatch(editCategory(categoryId, data)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_EDIT_CATEGORY,
                    error: '',
                    loading: true
                },
                {
                    type: EDIT_CATEGORY_ERROR,
                    error: 'Failed updating categoryError: Request failed with status code 400',
                    loading: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});
describe('categories DELETE actions',() => {
    beforeEach(() => {
        store.clearActions()
    });
    
    let categoryId = 5;
    it('given correct data by DELETE request, id of deleted category is passed to REDUCER', async () => {
        mock.onDelete(`${URL}/deleteCategory/${categoryId}`).reply(200, { data: categoryId });
        await store.dispatch(deleteCategory(categoryId)).then(() => {
            let expectedActions = {
                type: DELETE_CATEGORY,
                payload: categoryId,
                error: '',
            }
            expect(store.getActions()[0]).toEqual(expectedActions);
        })
    })
    it('given incorrect data by DELETE request, fails to pass category id to be deleted to REDUCER', async () => {
        mock.onDelete(`${URL}/deleteCategory/${categoryId}`).reply(400, { 
            error: 'Failed to delete category: Error: Request failed with status code 400'
        });
        await store.dispatch(deleteCategory(categoryId)).then(() => {
            let expectedActions = [
                {
                    type: DELETE_CATEGORY_ERROR,
                    error: 'Failed to delete category: Error: Request failed with status code 400',
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});