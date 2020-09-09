import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCategories } from '../../../src/redux/actions/categoryActions';
import { URL, GET_CATEGORIES, GET_CATEGORIES_ERROR } from '../../../src/redux/actions/types';
import expect from 'expect';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});


describe('get categories actions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    it('dispatches GET_CATEGORIES_SUCCESS after fetching categories', () => {
        mock.onGet('/categories').reply(200, { response: [
            {
                id: 1,
                name: "Beverage",
                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
                background: null,
                },
                {
                id: 2,
                name: "Food",
                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/u597O8p8ph.png",
                background: null,
                }
        ]});
        store.dispatch(getCategories()).then(() => {
                let expectedActions = [
                    { type: 'LOADING_GET_CATEGORIES', loading: true },
                    {
                        type: GET_CATEGORIES,
                        payload:  [
                            {
                                id: 1,
                                name: "Beverage",
                                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png",
                                background: null,
                                },
                                {
                                id: 2,
                                name: "Food",
                                image: "http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/u597O8p8ph.png",
                                background: null,
                                }
                            ],
                        loading: false, 
                        error: ''
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
        }).catch(error => {
            let expectedActions = [
                {
                    type: GET_CATEGORIES_ERROR,
                    error: 'Failed to load categories list... ' + error,
                    loading: false
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
})