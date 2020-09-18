import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
// import { Categories } from '../../../../components/Categories/Categories';
import { Categories } from '../../../../componentsAuth/auth_categories/Categories';
import { Flatlist } from 'react-native';
import expect from 'expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middleware = [thunk];
const mockStore = configureStore(middleware);
// import { getCategories } from '../../../../redux/actions/categoryActions';
// import { URL } from '../../../../redux/actions/types';

// import ConfigureStore from 'redux-mock-store';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// const middlewares = [thunk];
// const mockStore = ConfigureStore(middlewares);
// const mock = new MockAdapter(axios);
// const store = mockStore({});

const categories = [
    { id: 0, name: 'category 1', image: 'http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png' },
    { id: 1, name: 'category 2', image: 'http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png' },
    { id: 2, name: 'category 3', image: 'http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png' },
    { id: 3, name: 'category 4', image: 'http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png' },
    { id: 4,  name: 'category 5', image: 'http://10.0.2.2:80/Asmeniniai/fastshop/backend/laravel/public/uploads/categories/4IcCdyAKyX.png' }
];

it('categories component render all children', () => {
    const initialState = { categories: { categories: categories } };
    const store = mockStore(initialState);
    const navigation = {
        navigate: jest.fn()
    }
    const wrapper = shallow(
        // <Provider store={store}>
            <Categories store={store} />
        // </Provider>
    );
    const component = shallow(wrapper.getElement());
    expect(component.find(Flatlist).length).toEqual(1);
    expect(toJson(component)).toMatchSnapshot();
    // mock.onGet(`${URL}/categories`).reply(200, {data : [
    //     {
    //         id: 1,
    //         name: 'category 1'
    //     },
    //     {
    //         id: 2,
    //         name: 'category 2'
    //     },
    //     {
    //         id: 3,
    //         name: 'category 3'
    //     },
    // ]});
    // const wrapper = shallow(
    //     // <Provider store={store}>
    //         <Categories />,
    //         { context: { store: store } },
    //     // </Provider>
    // );
    // const component = shallow(wrapper.getElement());
    // expect(component.find(Flatlist).length).toEqual(1);
    // expect(toJson(component)).toMatchSnapshot();
    // await store.dispatch(getCategories()).then(() => {
    // })
   
})