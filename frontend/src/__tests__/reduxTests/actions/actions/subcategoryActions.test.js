import { getSubcategories, addSubcategory, editSubcategory, deleteSubcategory } from '../../../../redux/actions/subcategoryActions';
import { LOADING_GET_SUBCATEGORIES, GET_SUBCATEGORIES, GET_SUBCATEGORIES_ERROR, URL, LOADING_POST_SUBCATEGORY, POST_SUBCATEGORY, POST_SUBCATEGORY_ERROR,  LOADING_EDIT_SUBCATEGORY, EDIT_SUBCATEGORY, EDIT_SUBCATEGORY_ERROR, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_ERROR } from '../../../../redux/actions/types';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});

describe('Subcategory GET request', () => {
    beforeEach(() => {
        store.clearActions();
    });
    let category = 1;
    let page = 1;
    
    it('given correct data by GET request, axios passes all subcategories to Reducer', async () => {
        mock.onGet(`${URL}/subcategories/${category}?page=${page}`).reply(200, { data: [
            {
                id: 1,
                name: "subcategory",
                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
            },
            {
                id: 2,
                name: "subcategory 2",
                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
            }
        ],
        meta: {
            current_page: page,
            last_page: 2
        }
        });
        await store.dispatch(getSubcategories(1, page)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_GET_SUBCATEGORIES,
                    error: '',
                    loading: true,
                    loadingNext: false
                },
                {
                    type: GET_SUBCATEGORIES,
                    payload: [
                        {
                            id: 1,
                            name: "subcategory",
                            image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
                        },
                        {
                            id: 2,
                            name: "subcategory 2",
                            image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
                        }
                    ],
                    loading: false,
                    loadingNext: false,
                    error: '',
                    currentPage: page,
                    lastPage: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
    it('given incorrect data by GET request, axios fails passing subcategories to REDUCER and returns error', async () => {
        mock.onGet(`${URL}/subcategories/${category}?page=${page}`).reply(400, { error: { 
            message: 'Failed to load subcategories list.Error: Request failed with status code 400' 
        } })
        await store.dispatch(getSubcategories(category, page)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_GET_SUBCATEGORIES,
                    error: '',
                    loading: true,
                    loadingNext: false
                },
                {
                    type: GET_SUBCATEGORIES_ERROR,
                    error: 'Failed to load subcategories list.Error: Request failed with status code 400',
                    loading: false, 
                }
            ];              
                expect(store.getActions()).toEqual(expectedActions);
            })
    })

});
describe('Subcategory POST request', () => {
    beforeEach(() => {
        store.clearActions();
    });
    let categoryId = 5;
    let data = {
        name: 'Subcategory added',
        image: 'data.png'
    }
    it('given correct data by POST request, new subcategory can be added to REDUCER', async () => {
        mock.onPost(`${URL}/addSubcategory/${categoryId}`).reply(201, {
            name: 'Subcategory added',
            image: 'data.png'
        })
        await store.dispatch(addSubcategory(categoryId, data)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_POST_SUBCATEGORY,
                    error: '',
                    loading: true
                },
                {
                    type: POST_SUBCATEGORY,
                    payload: {
                        name: 'Subcategory added',
                        image: 'data.png'
                    },
                    loading: false,
                    error: ''
            }];
            expect(store.getActions()).toEqual(expectedActions);
        })
    }),
    it('given correct data by POST request, error is passed to REDUCER', async () => {
        mock.onPost(`${URL}/addSubcategory/${categoryId}`).reply(400, { data: {
            error: 'Failed creating a subcategory Error: Request failed with status code 400',
        } })
        await store.dispatch(addSubcategory(categoryId, data)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_POST_SUBCATEGORY,
                    error: '',
                    loading: true
                },
                {
                    type: POST_SUBCATEGORY_ERROR,
                    error: 'Failed creating a subcategory Error: Request failed with status code 400',
                    loading: false,
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});
describe('subcategories PUT actions',() => {
    beforeEach(() => {
        store.clearActions()
    });
    let categoryId = 5;
    let subcategoryId = 7;
    let data = {
        id: 7,
        name: 'Updated name',
        '_method' : 'put'
    }
    it('given correct data by PUT request, updated subcategory is passed to REDUCER', async () => {
        mock.onPost(`${URL}/updateSubcategory/${categoryId}/${subcategoryId}`).reply(201,
            {
                id: 7,
                name: 'Updated name',
            }
        );
        await store.dispatch(editSubcategory(categoryId, subcategoryId, data)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_EDIT_SUBCATEGORY,
                    error: '',
                    loading: true
                },
                {
                    type: EDIT_SUBCATEGORY,
                    payload: {
                        id: 7,
                        name: 'Updated name',
                    },
                    error: '',
                    loading: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
    it('given incorrect data by PUT request, error is passed to REDUCER', async () => {
        mock.onPost(`${URL}/updateSubcategory/${categoryId}/${subcategoryId}`).reply(400, { data: 
            {
            error: 'Failed updating subcategory: Error: Request failed with status code 400' 
            }
        });
        await store.dispatch(editSubcategory(categoryId, subcategoryId, data)).then(() => {
            let expectedActions = [
                {
                    type: LOADING_EDIT_SUBCATEGORY,
                    error: '',
                    loading: true
                },
                {
                    type: EDIT_SUBCATEGORY_ERROR,
                    error: 'Failed updating subcategory: Error: Request failed with status code 400',
                    loading: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});
describe('subcategories DELETE actions',() => {
    beforeEach(() => {
        store.clearActions()
    });
    
    let subcategoryId = 7;
    it('given correct data by DELETE request, id of deleted subcategory is passed to REDUCER', async () => {
        mock.onDelete(`${URL}/deleteSubcategory/${subcategoryId}`).reply(200, { data: subcategoryId });
        await store.dispatch(deleteSubcategory(subcategoryId)).then(() => {
            let expectedActions = [{
                type: DELETE_SUBCATEGORY,
                payload: subcategoryId,
                error: '',
            }];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
    it('given incorrect data by DELETE request, fails to pass subcategory id to be deleted to REDUCER', async () => {
        mock.onDelete(`${URL}/deleteSubcategory/${subcategoryId}`).reply(400, { data: { 
            error: 'Failed to delete subcategory: Error: Request failed with status code 400'
        } });
        await store.dispatch(deleteSubcategory(subcategoryId)).then(() => {
            let expectedActions = [
                {
                    type: DELETE_SUBCATEGORY_ERROR,
                    error: 'Failed to delete subcategory: Error: Request failed with status code 400',
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
});