import React from 'react';
import { shallow } from 'enzyme';
import { testStore } from '../../../../utils/testing';
import Products from '../../../../components/products/Products';
import ProductDetails from '../../../../components/products/ProductDetails';
import Auth_Products from '../../../../componentsAuth/auth_products/Products';
import Auth_ProductDetails from '../../../../componentsAuth/auth_products/Product';
import ProductList from '../../../../components/products/ProductList';
import { getProducts, getProduct } from '../../../../redux/actions/productActions';
import { URL } from '../../../../redux/actions/types';
import { combineReducers } from 'redux';
import productsReducer from '../../../../redux/reducers/productsReducer';
import comparisonReducer from '../../../../redux/reducers/comparisonReducer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
import checkPropTypes from 'check-prop-types';

let store;
let firstPage = 1;
let lastPage = 7;
let subcategoryId = 10;
let productId = 5;
let navigationProps = { params: { subcategoryId: subcategoryId, name: "Product", background: "#fff" } };
let navigationPropsProduct = { params: { subcategoryId: subcategoryId, productId: productId, name: "Product", background: "#fff" } };
const setUp = () => {
    const reducer = combineReducers({ products: productsReducer, selectedProducts: comparisonReducer })
    const store = testStore(reducer);
    return store
}
beforeEach(() => {
    store = setUp();
})

describe('Guest products component', () => {
    describe('guest products renders a component depending on props', () => {
        it('should show loading component before products are fetched', async () => {
            store.dispatch(getProducts(subcategoryId, firstPage));
            const wrapper = shallow(<Products store={ store } route={ navigationProps } />).childAt(0).dive();
            const loadingComponent = wrapper.find('Loading');
            expect(loadingComponent).toHaveLength(1);
        });

        it('should render products list', async () => {
            mock.onGet(`${URL}/products/${subcategoryId}?page=${firstPage}`).reply(200, { data: 
                [
                    { id: 1, name: 'product 1' },
                    { id: 2, name: 'product 2' }
                ],
                meta: {
                    current_page: firstPage,
                    last_page: lastPage
                }
            });
            await store.dispatch(getProducts(subcategoryId, firstPage)).then(() => {
                const wrapper = shallow(<Products  store={ store } route={ navigationProps } />).childAt(0).dive();
                const findFlatList = wrapper.find('FlatList');
                expect(findFlatList).toHaveLength(1);
            })
        });

        it('render error modal if error occures while fetching categories by redux store', async () => {
            mock.onGet(`${URL}/products/${subcategoryId}?page=${firstPage}`).reply(400, { message: 'Failed to load products list... Error: Request failed with status code 400'});
            await store.dispatch(getProducts(subcategoryId, firstPage)).then(() => {
                const wrapper = shallow(<Products  store={ store } route={ navigationProps } />).childAt(0).dive();
                const errorComponent = wrapper.find('Modal');
                expect(errorComponent).toHaveLength(1);
            })
        });

        it('should render empty list on products being null', async () => {
            mock.onGet(`${URL}/products/${subcategoryId}?page=${firstPage}`).reply(200, { data: 
                [],
                meta: {
                    current_page: firstPage,
                    last_page: lastPage
                }
             });
            await store.dispatch(getProducts(subcategoryId, firstPage)).then(() => {
                const wrapper = shallow(<Products store={ store } route={ navigationProps } />).childAt(0).dive();
                const emptyComponent = wrapper.find('EmptyList');
                expect(emptyComponent).toHaveLength(1);
            })
        });
        it('product details page should render product info', async () => {
            mock.onGet(`${URL}/product/${subcategoryId}/${productId}`).reply(200, 
                {
                    id: productId,
                    name: 'Product',
                    energy: 1000,
                    fat: 10.5,
                    saturated: 55.5,
                    sugar: 15.52
                }
            );
            await store.dispatch(getProduct(subcategoryId, productId)).then(() => {
                const wrapper = shallow(<ProductDetails store={ store } route={ navigationPropsProduct } />).childAt(0).dive();
                const flatList = wrapper.find('FlatList');
                expect(flatList).toHaveLength(1);
            })
        });
        it('product details page should render error component on error', async () => {
            mock.onGet(`${URL}/product/${subcategoryId}/${productId}`).reply(400, { 
                error: 'Error'
            });
            await store.dispatch(getProduct(subcategoryId, productId)).then(() => {
                const wrapper = shallow(<ProductDetails store={ store } route={ navigationPropsProduct } />).childAt(0).dive();
                const errorModal = wrapper.find('Modal');
                expect(errorModal).toHaveLength(1);
            })
        })
    });
    describe('guest products component PropTypes', () => {
        it('Should not throw a warning', () => {
            const expectedProps = {
                getProducts: (() => console.log("Function")),
                products: [
                    { 
                        name: 'Name', 
                        image: null,  
                        background: null,
                    }
                ]
            };
            const propErr = checkPropTypes(Products.WrappedComponent.propTypes, expectedProps, 'props');
            expect(propErr).toBeUndefined();
        });
        it('Should throw a warning on empty function', () => {
            const expectedProps = {
                products: [
                    { name: 'Name', image: null }
                ]
            };
            const propErr = checkPropTypes(Products.WrappedComponent.propTypes, expectedProps, 'props');
            expect(propErr).toContain('Failed props type');
        });
        it('Should not throw a warning in productList PropTypes', () => {
            const expectedProps = {
                goToProduct: (() => console.log("Test") ),
                selectProduct: (() => console.log("Test") ),
                name: 'Name', 
                image: null,
            };
            const propErr = checkPropTypes(ProductList.propTypes, expectedProps, 'props');
            expect(propErr).toBeUndefined();
        });
        it('In productList component PropTypes, should throw a warning if goToProduct func is not provided', () => {
            const expectedProps = {
                selectProduct: (() => console.log("Test") ),
                name: 'Name', 
                image: null 
            };
            const propErr = checkPropTypes(ProductList.propTypes, expectedProps, 'props');
            expect(propErr).toContain('Failed props type');
        })
    });
describe('Admin Products component', () => {
    describe('Products components', () => {
        it('should show loading component before products are fetched', async () => {
            store.dispatch(getProducts(subcategoryId, firstPage));
            const wrapper = shallow(<Auth_Products store={ store } route={ navigationProps } />).childAt(0).dive();
            const loadingComponent = wrapper.find('Loading');
            expect(loadingComponent).toHaveLength(1);
        });
        it('in products array page, should render all products', async () => {
            mock.onGet(`${URL}/products/${subcategoryId}?page=${firstPage}`).reply(200, { data: [
                    { id: 1, name: 'product 1' },
                    { id: 2, name: 'product 2' }
                ],
                meta: {
                    current_page: firstPage,
                    last_page: lastPage
                }
            });
            await store.dispatch(getProducts(subcategoryId, firstPage)).then(() => {
                const wrapper = shallow(<Auth_Products store={ store } route={ navigationProps } />).childAt(0).dive();
                const findFlatList = wrapper.find('FlatList');
                expect(findFlatList).toHaveLength(1);
            })
        });
        it('render error modal if error occures while fetching products by redux store', async () => {
            mock.onGet(`${URL}/products/${subcategoryId}?page=${firstPage}`).reply(400, { message: 'Failed to load products list... Error: Request failed with status code 400'});
            await store.dispatch(getProducts(subcategoryId, firstPage)).then(() => {
                const wrapper = shallow(<Auth_Products  store={ store } route={ navigationProps } />).childAt(0).dive();
                const errorComponent = wrapper.find('Modal');
                expect(errorComponent).toHaveLength(1);
            })
        });
        it('should render empty list on products being null', async () => {
            mock.onGet(`${URL}/products/${subcategoryId}?page=${firstPage}`).reply(200, { data: 
                [],
                meta: {
                    current_page: firstPage,
                    last_page: lastPage
                }
            });
                await store.dispatch(getProducts(subcategoryId, firstPage)).then(() => {
                    const wrapper = shallow(<Auth_Products store={ store } route={ navigationProps } />).childAt(0).dive();
                    const emptyComponent = wrapper.find('EmptyList');
                    expect(emptyComponent).toHaveLength(1);
                })
            })
            it('product details page should render product info', async () => {
                mock.onGet(`${URL}/product/${subcategoryId}/${productId}`).reply(200, 
                    {
                        id: productId,
                        name: 'Product',
                        energy: 1000,
                        fat: 10.5,
                        saturated: 55.5,
                        sugar: 15.52
                    }
                );
                await store.dispatch(getProduct(subcategoryId, productId)).then(() => {
                    const wrapper = shallow(<Auth_ProductDetails store={ store } route={ navigationPropsProduct } />).childAt(0).dive();
                    const flatList = wrapper.find('FlatList');
                    expect(flatList).toHaveLength(1);
                })
            });
            it('product details page should render error component on error', async () => {
                mock.onGet(`${URL}/product/${subcategoryId}/${productId}`).reply(400, { 
                    error: 'Error'
                });
                await store.dispatch(getProduct(subcategoryId, productId)).then(() => {
                    const wrapper = shallow(<Auth_ProductDetails store={ store } route={ navigationPropsProduct } />).childAt(0).dive();
                    const errorModal = wrapper.find('Error');
                    expect(errorModal).toHaveLength(1);
                })
            })
        })
    })
});