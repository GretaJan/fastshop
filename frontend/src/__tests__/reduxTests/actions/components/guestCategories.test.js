import React from 'react';
import { shallow } from 'enzyme';
import { testStore } from '../../../../utils/testing';
import Categories from '../../../../components/Categories/Categories';
import { getCategories } from '../../../../redux/actions/categoryActions';
import { URL } from '../../../../redux/actions/types';
import { combineReducers } from 'redux';
import categoriesReducer from '../../../../redux/reducers/categoriesReducer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);

const setUp = () => {
    const reducer = combineReducers({ categories: categoriesReducer })
    const store = testStore(reducer);
    return store
}

describe('guest categories component', () => {
    let store;
    beforeEach(() => {
        store = setUp();
    })
    it('should show loading component before categories are fetched', async () => {
        store.dispatch(getCategories());
        const wrapper = shallow(<Categories store={ store } />).childAt(0).dive();
        const loadingComponent = wrapper.find('Loading');
        expect(loadingComponent).toHaveLength(1);
    })

    it('should render categories list', async () => {
        mock.onGet(`${URL}/categories`).reply(200, { categories: [
            { id: 1, name: 'category 1' },
            { id: 2, name: 'category 2' }
        ]});
        await store.dispatch(getCategories()).then(() => {
            const wrapper = shallow(<Categories  store={ store }/>).childAt(0).dive();
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
    })

    it('should render empty list on categories being null', async () => {
        mock.onGet(`${URL}/categories`).reply(200, { categories: [] });
        await store.dispatch(getCategories()).then(() => {
            const wrapper = shallow(<Categories store={ store } />).childAt(0).dive();
            const emptyComponent = wrapper.find('EmptyList');
            expect(emptyComponent).toHaveLength(1);
        })
    });
})
