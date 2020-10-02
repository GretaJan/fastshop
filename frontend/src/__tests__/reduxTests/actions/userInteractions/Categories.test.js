import React from 'react';
import { shallow } from 'enzyme';
import AddCategory from '../../../../componentsAuth/auth_categories/AddCategory';
import { combineReducers } from 'redux';
import categoriesReducer from '../../../../redux/reducers/categoriesReducer';
import { testStore } from '../../../../utils/testing';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// const mock = new MockAdapter(axios);

const setUp = () => {
    const reducer = combineReducers({ categories: categoriesReducer })
    const store = testStore(reducer);
    return store
}
let store;
beforeEach(() => {
    store = setUp();
})

describe('admin interactions', () => {
    describe('AddCategory component actions', () => {
        it('add name input value', () => {
            const addInput = jest.fn();
            const wrapper = shallow(<AddCategory store={ store } />).dive();
            const nameInput = wrapper.find('Component').first();
            nameInput.simulate('changeText', 'test');
            expect(wrapper.state().name).toEqual('test')
        });
        it('add background input value', () => {
            const addInput = jest.fn();
            const wrapper = shallow(<AddCategory store={ store } />).dive();
            const nameInput = wrapper.find('Component').last();
            nameInput.simulate('changeText', 'test background');
            expect(wrapper.state().background).toEqual('test background')
        });
    });
})