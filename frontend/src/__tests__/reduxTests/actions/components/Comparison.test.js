import React from 'react';
import { shallow } from 'enzyme';
import { testStore } from '../../../../utils/testing';
import { combineReducers } from 'redux';
import productsReducer from '../../../../redux/reducers/productsReducer';
import comparisonReducer from '../../../../redux/reducers/comparisonReducer';
import MainPage from '../../../../components/comparison/selectedProducts';
const setUp = (customReducer) => {
    const reducer = combineReducers({ selectedProducts: customReducer, products: productsReducer });
    const store = testStore(reducer);
    return store;
}

let store;

describe('Main page components', () => {
    it('Loads empty list when no products selected', () => {
        store = setUp(comparisonReducer);
        const component = shallow(<MainPage store={ store } />).childAt(0).dive();
        const emptyList = component.find('EmptyList');
        expect(emptyList).toHaveLength(1);
    });
    it('Loads Product list when products selected', () => {
        const initialState = {
            comparisonArray: [
                    { energy: 1000, fat: 20.5, id: 5, name: "Product 1",subcategory_id: 6 },
                    { energy: 720, fat: 2.5, id: 6, subId: 10, name: "Product 2", subcategory_id: 10 }
                ],
            result: {},
            sorted: null
        }
        function comparisonReducerMock(state = initialState, action) {
            switch(action.type) {
                default:
                    return state
            }
        }
        store = setUp(comparisonReducerMock);
        const component = shallow(<MainPage store={ store } />).childAt(0).dive();
        const FlatList = component.find('FlatList');
        expect(FlatList).toHaveLength(1);
    });
    it('Buttons press', () => {
        store = setUp(comparisonReducer);
        const wrapper = shallow(<MainPage store={ store } />).childAt(0).dive();
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'goToDescAscPage');
        instance.forceUpdate();
        wrapper.find('TouchableOpacity').at(0).props().onPress();
        expect(spy).toHaveBeenCalledTimes(1);
    })
})