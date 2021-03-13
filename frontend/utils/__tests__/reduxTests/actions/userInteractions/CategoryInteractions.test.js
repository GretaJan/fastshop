import React from 'react';
import { shallow } from 'enzyme';
import AddCategory from '../../../../componentsAuth/auth_categories/AddCategory';
import Categories from '../../../../componentsAuth/auth_categories/Categories';
import CategoryList from '../../../../componentsAuth/auth_categories/CategoryList';
import { combineReducers } from 'redux';
import categoriesReducer from '../../../../redux/reducers/categoriesReducer';
import { testStore } from '../../../../utils/testing';
import { mock } from 'fetch-mock';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// const mock = new MockAdapter(axios);

const setUp = (customReducer) => {
    const reducer = combineReducers({ categories: customReducer })
    const store = testStore(reducer);
    return store
}
const initialState = {
    categories: [
        { id: 1, name: 'category 1' },
        { id: 2, name: 'category 2' }
    ],
    loading: false,
    error: ''
}

function customReducer(state = initialState, action){
    switch(action.type){
        default:
            return state
    }
}

let store;
let propsEditState;
let propsNotEdit;
describe('admin interactions', () => {
    describe('AddCategory component actions', () => {
        beforeEach(() => {
            store = setUp(categoriesReducer);
        })
        it('add name input value', () => {
            const wrapper = shallow(<AddCategory store={ store } />).dive();
            const spy = jest.spyOn(wrapper.instance(), 'addInput');
            const nameInput = wrapper.find('Component').first();
            nameInput.simulate('changeText', 'test');
            expect(wrapper.state().name).toEqual('test');
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('add background input value', () => {
            const wrapper = shallow(<AddCategory store={ store } />).dive();
            const spy = jest.spyOn(wrapper.instance(), 'addInput');
            const nameInput = wrapper.find('Component').last();
            nameInput.simulate('changeText', 'test background');
            expect(wrapper.state().background).toEqual('test background');
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    describe('Edit category actions', () => {
        beforeEach(() => {
            store = setUp(customReducer);
            propsEditState = {
                item: store.getState().categories.categories[1],
                editId: store.getState().categories.categories[1].id,
                goToSubcategories: jest.fn(),
                triggerEditFunc: jest.fn(),
                changeImage: jest.fn(),
                cancelEdit: jest.fn(),
                validateSubmit: jest.fn(),
                deleteCategory: jest.fn(),
                changeStateText: jest.fn()
            }
            propsNotEdit = {
                item: store.getState().categories.categories[1],
                editId: store.getState().categories.categories[0].id,
                goToSubcategories: jest.fn(),
                triggerEditFunc: jest.fn(),
                changeImage: jest.fn(),
                cancelEdit: jest.fn(),
                validateSubmit: jest.fn(),
                deleteCategory: jest.fn(),
            }
        })
        it('should invoke validate edit function on press in child component', () => {
            const child = shallow(<CategoryList {...propsEditState} />);
            const spy = jest.spyOn(child.instance(), 'validateSubmit');
            child.instance().forceUpdate();
            const validationBtn = child.find('TouchableOpacity').first();
            validationBtn.props().onPress();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('child component background edit input should get triggered from child component', () => {
            const child = shallow(<CategoryList {...propsEditState} />);
            const spy = jest.spyOn(child.instance(), 'changeStateText');
            const changeText = child.find('Component').last();
            changeText.simulate('changeText', 'Background was updated');
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('should trigger edit function on press in child component', () => {
            const child = shallow(<CategoryList {...propsNotEdit} />);
            const spy = jest.spyOn(child.instance(), 'triggerEditFunc');
            child.instance().forceUpdate();
            const editBtn = child.find('TouchableOpacity').first();
            editBtn.props().onPress();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('should trigger delete function on press in child component', () => {
            const child = shallow(<CategoryList {...propsNotEdit} />);
            const spy = jest.spyOn(child.instance(), 'deleteFunction');
            child.instance().forceUpdate();
            const editBtn = child.find('TouchableOpacity').at(1);
            editBtn.props().onPress();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

