import { productSelected, removeProductFromSelected, compare } from '../../../../redux/actions/comparisonActions';
import { URL, PRODUCT_SELECTED, REMOVE_SELECTED_PRODUCT, COMPARE_RESULT } from '../../../../redux/actions/types';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore();

const subcategoryId = 2;
const productId = 5;
describe('comparison redux actions', () => {
    describe('main page', () => {
        afterEach(() => {
            store.clearActions();
        });
        it('fetch selected products', async() => {
            mock.onGet(`${URL}/product/${subcategoryId}/${productId}`).reply(200,
                {
                    id: 5,
                    name: 'Product'
                }
           );
            await store.dispatch(productSelected(subcategoryId, productId )).then((data) => {
                const expectedActions = [
                    {
                        type: PRODUCT_SELECTED,
                        payload:
                            {
                                id: 5,
                                name: 'Product'
                            },
                        result: {}
                    }
                ];
                expect(store.getActions()).toEqual(expectedActions);
            })
        });
        it('fetch selected products', async() => {
            mock.onGet(`${URL}/product/${subcategoryId}/${productId}`).reply(200,
                {
                    id: 5,
                    name: 'Product 1'
                }
            );
            mock.onGet(`${URL}/product/${subcategoryId}/${productId}`).reply(200,
                {
                    id: 6,
                    name: 'Product 2'
                }
            );
            store.dispatch(removeProductFromSelected(productId))
            const expectedActions = [
                {
                    type: REMOVE_SELECTED_PRODUCT,
                    payload: 5
                }
            ];
            expect(store.getActions()).toEqual(expectedActions);
        });
        const compareProducts = {
            healthier: {
                energy: 1000,
                fat: 20.5,
                id: 5,
                name: "Product 1",
                subcategory_id: 6,
            },
            unhealthier: {
                energy: 720,
                fat: 2.5,
                id: 6,
                subId: 10,
                name: "Product 2",
                subcategory_id: 10,
            } 
        };    
        it('Compare two products', async() => {
            mock.onGet(`${URL}/product/${compareProducts.healthier.subId}/${compareProducts.healthier.id}`).reply(200,
                compareProducts.healthier
            );
            mock.onGet(`${URL}/product/${compareProducts.unhealthier.subId}/${compareProducts.unhealthier.id}`).reply(200,
                compareProducts.unhealthier
            );
            await store.dispatch(compare(compareProducts)).then((data) => {
                expect(store.getActions()[0]).toEqual(data);
            });
        })
    })
})