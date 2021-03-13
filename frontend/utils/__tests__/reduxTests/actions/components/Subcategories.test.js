import React from 'react';
import { shallow } from 'enzyme';
import { testStore } from '../../../../utils/testing';
import Subcategories from '../../../../components/Subcategories/Subcategories';
import Auth_Subcategories from '../../../../componentsAuth/auth_subcategories/Subcategories';
import Subcategory from '../../../../components/subcategories/Subcategory';
import { getSubcategories } from '../../../../redux/actions/subcategoryActions';
import { URL } from '../../../../redux/actions/types';
import { combineReducers } from 'redux';
import subcategoriesReducer from '../../../../redux/reducers/subcategoriesReducer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
import checkPropTypes from 'check-prop-types';


const setUp = () => {
    const reducer = combineReducers({ subcategories: subcategoriesReducer })
    const store = testStore(reducer);
    return store
}
let store;
let categoryId = 1;
let subName = "Subcategory";
let background = '#fff';
let firstPage = 1;
let secondPage = 2;
let lastPage = 5;

const navigationProps = { params: { categoryId: categoryId, name: subName, background: background } }

beforeEach(() => {
    store = setUp();
})

describe('Guest subcategories component', () => {
    describe('guest subcategories renders a component depending on props', () => {
        it('should show loading component before subcategories are fetched', async () => {
            store.dispatch(getSubcategories(categoryId, firstPage));           
            const wrapper = shallow(<Subcategories store={ store } route={navigationProps} />).childAt(0).dive();
            const loadingComponent = wrapper.find('Loading');
            expect(loadingComponent).toHaveLength(1);
        });
        it('should render subcategories list', async () => {
            mock.onGet(`${URL}/subcategories/${categoryId}?page=${firstPage}`).reply(200, { data: [
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
                    current_page: firstPage,
                    last_page: lastPage
                }
            });
            await store.dispatch(getSubcategories(categoryId, firstPage)).then(() => {
                const wrapper = shallow(<Subcategories  store={ store } route={navigationProps} />).childAt(0).dive();
                const findFlatList = wrapper.find('FlatList');
                expect(findFlatList).toHaveLength(1);
            })
        });       
        it('render error modal if error occures while fetching categories by redux store', async () => {
            mock.onGet(`${URL}/subcategories/${categoryId}?page=${firstPage}`).reply(400, { message: 'Failed to load subcategories list... Error: Request failed with status code 400'});
            await store.dispatch(getSubcategories(categoryId, firstPage)).then(() => {
                const wrapper = shallow(<Subcategories  store={ store } route={ navigationProps } />).childAt(0).dive();
                const errorComponent = wrapper.find('Modal');
                expect(errorComponent).toHaveLength(1);
            })
        });

        it('should render empty list on categories being null', async () => {
            mock.onGet(`${URL}/subcategories/${categoryId}?page=${firstPage}`).reply(200, { data: [],
                meta: {
                    current_page: firstPage,
                    last_page: firstPage
                } });
            await store.dispatch(getSubcategories(categoryId, firstPage)).then(() => {
                const wrapper = shallow(<Subcategories store={ store } route={ navigationProps } />).childAt(0).dive();
                const emptyComponent = wrapper.find('EmptyList');
                expect(emptyComponent).toHaveLength(1);
            })
        });
    });
    describe('guest subcategories component PropTypes', () => {
        it('Should not throw a warning', () => {
            const expectedProps = {
                getSubcategories: (() => console.log("Function")),
                tempArray: [
                    { name: 'Name', image: null,  background: '#565' }
                ],
                subcategories: [
                    { name: 'Name', image: null,  background: '#565' }
                ],
                inputTriggered: false,
                showSearchInput: false,
                currentPage: firstPage,
                lastPage: false,
                loading: false,
                loadingNext: false,
                error: 'error',
            };
            const propErr = checkPropTypes(Subcategories.WrappedComponent.propTypes, expectedProps, 'props');
            expect(propErr).toBeUndefined();
        });
        it('Should throw a warning on empty function', () => {
             const expectedProps = {
                tempArray: [
                    { name: 'Name', image: null,  background: '#565' }
                ],
                subcategories: [
                    { name: 'Name', image: null,  background: '#565' }
                ],
                inputTriggered: false,
                showSearchInput: false,
                currentPage: firstPage,
                lastPage: false,
                loading: false,
                loadingNext: false,
                error: 'error',
            };
            const propErr = checkPropTypes(Subcategories.WrappedComponent.propTypes, expectedProps, 'props');
            expect(propErr).toContain('Failed props type');
        });
        it('Should not throw a warning in single subcategory PropTypes', () => {
            const expectedProps = {
                goToProducts: (() => console.log("Hello") ),
                name: 'Name', 
                image: null,
            };
            const propErr = checkPropTypes(Subcategory.propTypes, expectedProps, 'props');
            expect(propErr).toBeUndefined();
        });
        it('In single category component PropTypes, should throw a warning if goToProducts func is not provided', () => {
            const expectedProps = {
                name: 'Name', 
                image: null 
            };
            const propErr = checkPropTypes(Subcategory.propTypes, expectedProps, 'props');
            expect(propErr).toContain('Failed props type');
        });
    })
});
describe('Admin subcategories component', () => {
    describe('Subcategories components', () => {
        it('should show loading component before subcategories are fetched', async () => {
            store.dispatch(getSubcategories(categoryId, firstPage));
            const wrapper = shallow(<Auth_Subcategories store={ store } route={ navigationProps } />).childAt(0).dive();
            const loadingComponent = wrapper.find('Loading');
            expect(loadingComponent).toHaveLength(1);
        });
        it('in subcategories array page, should render all subcategories', async () => {
            mock.onGet(`${URL}/subcategories/${categoryId}?page=${firstPage}`).reply(200, { data: 
                [
                    { id: 1, name: 'subcategory 1' },
                    { id: 2, name: 'subcategory 2' }
                ],
                meta: {
                    current_page: firstPage,
                    last_page: lastPage
                }
            });
            await store.dispatch(getSubcategories(categoryId, firstPage)).then((data) => {
                const wrapper = shallow(<Auth_Subcategories store={ store } route={ navigationProps } />).childAt(0).dive();
                const findFlatList = wrapper.find('FlatList');
                expect(findFlatList).toHaveLength(1);
            })
        });
        it('render error modal if error occures while fetching subcategories by redux store', async () => {
            mock.onGet(`${URL}/subcategories/${categoryId}?page=${firstPage}`).reply(400, { message: 'Failed to load subcategories list... Error: Request failed with status code 400'});
            await store.dispatch(getSubcategories(categoryId, firstPage)).then(() => {
                const wrapper = shallow(<Auth_Subcategories  store={ store } route={ navigationProps } />).childAt(0).dive();
                const errorComponent = wrapper.find('Modal');
                expect(errorComponent).toHaveLength(1);
            })
        });
        it('should render empty list on subcategories being null', async () => {
            mock.onGet(`${URL}/subcategories/${categoryId}?page=${firstPage}`).reply(200, { data: 
                [],
                meta: {
                    current_page: firstPage,
                    last_page: lastPage 
                }
            });
            await store.dispatch(getSubcategories(categoryId, firstPage)).then(() => {
                const wrapper = shallow(<Auth_Subcategories store={ store } route={ navigationProps } />).childAt(0).dive();
                const emptyComponent = wrapper.find('EmptyList');
                expect(emptyComponent).toHaveLength(1);
            })
        });
    })
});