import React from 'react';
import { shallow } from 'enzyme';
import { testStore } from '../../../../utils/testing';
import Categories from '../../../../components/Categories/Categories';
import Auth_Categories from '../../../../componentsAuth/auth_categories/Categories';
import Category from '../../../../components/Categories/Category';
import Categories_List from '../../../../componentsAuth/auth_categories/CategoryList';
import { getCategories } from '../../../../redux/actions/categoryActions';
import { URL } from '../../../../redux/actions/types';
import { combineReducers } from 'redux';
import categoriesReducer from '../../../../redux/reducers/categoriesReducer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
import checkPropTypes from 'check-prop-types';


const setUp = () => {
    const reducer = combineReducers({ categories: categoriesReducer })
    const store = testStore(reducer);
    return store
}
let store;
beforeEach(() => {
    store = setUp();
})

describe('Guest categories component', () => {
    describe('guest categories renders a component depending on props', () => {
        it('should show loading component before categories are fetched', async () => {
            store.dispatch(getCategories());
            const wrapper = shallow(<Categories store={ store } />).childAt(0).dive();
            const loadingComponent = wrapper.find('Loading');
            expect(loadingComponent).toHaveLength(1);
        });

        it('should render categories list', async () => {
            mock.onGet(`${URL}/categories`).reply(200, { categories: [
                { id: 1, name: 'category 1' },
                { id: 2, name: 'category 2' }
            ]});
            await store.dispatch(getCategories()).then((data) => {
                const wrapper = shallow(<Categories  store={ store } />).childAt(0).dive();
                const findFlatList = wrapper.find('FlatList');
                expect(findFlatList).toHaveLength(1);
            })
        });

        it('render error modal if error occures while fetching categories by redux store', async () => {
            mock.onGet(`${URL}/categories`).reply(400, { message: 'Failed to load categories list... Error: Request failed with status code 400'});
            await store.dispatch(getCategories()).then(() => {
                const wrapper = shallow(<Categories  store={ store }/>).childAt(0).dive();
                const errorComponent = wrapper.find('Modal');
                expect(errorComponent).toHaveLength(1);
            })
        });

        it('should render empty list on categories being null', async () => {
            mock.onGet(`${URL}/categories`).reply(200, { categories: [] });
            await store.dispatch(getCategories()).then(() => {
                const wrapper = shallow(<Categories store={ store } />).childAt(0).dive();
                const emptyComponent = wrapper.find('EmptyList');
                expect(emptyComponent).toHaveLength(1);
            })
        });
    });
    describe('guest categories component PropTypes', () => {
        it('Should not throw a warning', () => {
            const expectedProps = {
                getCategories: (() => console.log("Function")),
                categories: [
                    { name: 'Name', image: null,  background: '#565' }
                ]
            };
            const propErr = checkPropTypes(Categories.WrappedComponent.propTypes, expectedProps, 'props');
            expect(propErr).toBeUndefined();
        });
        it('Should throw a warning on empty function', () => {
            const expectedProps = {
                categories: [
                    { name: 'Name', image: null }
                ]
            };
            const propErr = checkPropTypes(Categories.WrappedComponent.propTypes, expectedProps, 'props');
            expect(propErr).toContain('Failed props type');
        });
        it('Should not throw a warning in single category PropTypes', () => {
            const expectedProps = {
                goToSubcategories: (() => console.log("Hello") ),
                name: 'Name', 
                image: null,
            };
            const propErr = checkPropTypes(Category.propTypes, expectedProps, 'props');
            expect(propErr).toBeUndefined();
        });
        it('In single category component PropTypes, should throw a warning if goToSubcategories func is not provided', () => {
            const expectedProps = {
                name: 'Name', 
                image: null 
            };
            const propErr = checkPropTypes(Category.propTypes, expectedProps, 'props');
            expect(propErr).toContain('Failed props type');
        });
    })
});
describe('Admin categories component', () => {
    describe('Categories components', () => {
        it('should show loading component before categories are fetched', async () => {
            store.dispatch(getCategories());
            const wrapper = shallow(<Auth_Categories store={ store } />).childAt(0).dive();
            const loadingComponent = wrapper.find('Loading');
            expect(loadingComponent).toHaveLength(1);
        });
        it('in categories array page, should render all categories', async () => {
            mock.onGet(`${URL}/categories`).reply(200, { categories: [
                { id: 1, name: 'category 1' },
                { id: 2, name: 'category 2' }
            ]});
            await store.dispatch(getCategories()).then((data) => {
                const wrapper = shallow(<Auth_Categories store={ store } />).childAt(0).dive();
                const findFlatList = wrapper.find('FlatList');
                expect(findFlatList).toHaveLength(1);
            })
        });
        it('render error modal if error occures while fetching categories by redux store', async () => {
            mock.onGet(`${URL}/categories`).reply(400, { message: 'Failed to load categories list... Error: Request failed with status code 400'});
            await store.dispatch(getCategories()).then(() => {
                const wrapper = shallow(<Auth_Categories  store={ store }/>).childAt(0).dive();
                const errorComponent = wrapper.find('Modal');
                expect(errorComponent).toHaveLength(1);
            })
        });
        it('should render empty list on categories being null', async () => {
            mock.onGet(`${URL}/categories`).reply(200, { categories: [] });
            await store.dispatch(getCategories()).then(() => {
                const wrapper = shallow(<Auth_Categories store={ store } />).childAt(0).dive();
                const emptyComponent = wrapper.find('EmptyList');
                expect(emptyComponent).toHaveLength(1);
            })
        });
        it('reach child component', async () => {
            const category = {
                id: 1, 
                name: 'category 1', 
                background: '#fff'
            }
            const props = {
                item: category,
                goToSubcategories: jest.fn(),
                triggerEditFunc: jest.fn(),
                changeImage: jest.fn(),
                cancelEdit: jest.fn(),
                validateSubmit: jest.fn(),
                deleteCategory: jest.fn(),
                editId: category.id,
                editName: category.name,
                editBackground: category.background,
                imageData: category.image,
                onChangeNameText: jest.fn(),
                onChangeBackground: jest.fn(),
            }
            let component = shallow(<Categories_List { ...props} /> ).dive();
            let inputComponents = component.find('Component');
            expect(inputComponents).toHaveLength(2);
        })
    })
});
