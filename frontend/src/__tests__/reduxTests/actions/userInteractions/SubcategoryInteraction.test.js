import React from 'react';
import { shallow } from 'enzyme';
import AddSubcategory from '../../../../componentsAuth/auth_subcategories/AddSubcategory';
import Subcategories from '../../../../componentsAuth/auth_subcategories/Subcategories';
import SubcategoryList from '../../../../componentsAuth/auth_subcategories/SubcategoryList';
import { combineReducers } from 'redux';
import subcategoriesReducer from '../../../../redux/reducers/subcategoriesReducer';
import { testStore } from '../../../../utils/testing';

const setUp = (customReducer) => {
    const reducer = combineReducers({ subcategories: customReducer })
    const store = testStore(reducer);
    return store
}
const initialState = {
    subcategories: [
        { id: 1, category_id: 10, name: 'subcategory 1' },
        { id: 2, category_id: 10, name: 'subcategory 2' }
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
let params = { params: {categoryId: 10, name: 'Category', background: null} }
let store;
let propsEditState;
let propsNotEdit;
describe('admin interactions', () => {
    describe('AddSubcategory component actions', () => {
        beforeEach(() => {
            store = setUp(subcategoriesReducer);
        })
        it('add name input value', () => {
            const wrapper = shallow(<AddSubcategory store={ store } route={params} />).dive();
            const spy = jest.spyOn(wrapper.instance(), 'addInput');
            const nameInput = wrapper.find('Component').first();
            nameInput.simulate('changeText', 'test');
            expect(wrapper.state().name).toEqual('test');
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('add background input value', () => {
            const wrapper = shallow(<AddSubcategory store={ store }  route={params} />).dive();
            const spy = jest.spyOn(wrapper.instance(), 'addInput');
            const nameInput = wrapper.find('Component').last();
            nameInput.simulate('changeText', 'test background');
            expect(wrapper.state().background).toEqual('test background');
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    describe('Edit subcategory actions', () => {
        beforeEach(() => {
            store = setUp(customReducer);
            propsEditState = {
                item: store.getState().subcategories.subcategories[1],
                editId: store.getState().subcategories.subcategories[1].id,
                goToSubcategories: jest.fn(),
                triggerEdit: jest.fn(),
                changeImage: jest.fn(),
                cancelEdit: jest.fn(),
                validateSubmit: jest.fn(),
                deleteCategory: jest.fn(),
                changeStateText: jest.fn()
            }
            propsNotEdit = {
                item: store.getState().subcategories.subcategories[1],
                editId: store.getState().subcategories.subcategories[0].id,
                goToSubcategories: jest.fn(),
                triggerEdit: jest.fn(),
                changeImage: jest.fn(),
                cancelEdit: jest.fn(),
                validateSubmit: jest.fn(),
                deleteSubcategory: jest.fn(),
            }
        })
        it('should invoke validate edit function on press in child component', () => {
            const child = shallow(<SubcategoryList {...propsEditState} />);
            const spy = jest.spyOn(child.instance(), 'validateSubmit');
            child.instance().forceUpdate();
            const validationBtn = child.find('TouchableOpacity').first();
            validationBtn.props().onPress();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('child component background edit input should get triggered from child component', () => {
            const child = shallow(<SubcategoryList {...propsEditState} />);
            const spy = jest.spyOn(child.instance(), 'changeStateText');
            const changeText = child.find('Component').last();
            changeText.simulate('changeText', 'Background was updated');
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('should trigger edit function on press in child component', () => {
            const child = shallow(<SubcategoryList {...propsNotEdit} />);
            const spy = jest.spyOn(child.instance(), 'triggerEdit');
            child.instance().forceUpdate();
            const editBtn = child.find('TouchableOpacity').first();
            editBtn.props().onPress();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('should trigger delete function on press in child component', () => {
            const child = shallow(<SubcategoryList {...propsNotEdit} />);
            const spy = jest.spyOn(child.instance(), 'deleteFunction');
            child.instance().forceUpdate();
            const editBtn = child.find('TouchableOpacity').at(1);
            editBtn.props().onPress();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

