import React from 'react';
import { shallow } from 'enzyme';
import AddProduct from '../../../../componentsAuth/auth_products/AddProduct';
import AddProductRow from '../../../../componentsAuth/auth_products/AddProductRow';
import Product from '../../../../componentsAuth/auth_products/Product';
import ProductRows from '../../../../componentsAuth/auth_products/DetailsRows';
import { combineReducers } from 'redux';
import productsReducer from '../../../../redux/reducers/productsReducer';
import { testStore } from '../../../../utils/testing';


const setUp = (customReducer) => {
    const reducer = combineReducers({ products: customReducer })
    const store = testStore(reducer);
    return store
}
const initialState = {
    products: [
        { id: 1, subcategory_id: 10, name: 'Product 1', energy: 10.5 },
        { id: 2, subcategory_id: 10, name: 'Product 2', sugar: 10.5 }
    ],
    product: { id: 1, subcategory_id: 10, name: 'Product 1', energy: 10.5 },
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
    describe('AddProduct component actions', () => {
        beforeEach(() => {
            store = setUp(productsReducer);
        })
        const paramsAddProduct = { params: {subcategoryId: 10, background: null} }
        const childProps = {
            props: {
                name: 'energy', measure: 'kcal', input: 'Added a product'
            },
            inputChange: jest.fn(),
            index: 0
        }
        it('add input value from parent comp', () => {
            const wrapper = shallow(<AddProduct store={store} route={paramsAddProduct}><AddProductRow {...childProps} /></AddProduct>);
            const spy = jest.spyOn(wrapper.props().children.props, 'inputChange');
            const child = shallow(<AddProductRow {...childProps} />);
            const inputComponent = child.find('Component');
            inputComponent.simulate('changeText', '10.5');
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
    describe('Edit product actions', () => {
        beforeEach(() => {
            store = setUp(customReducer);
        });
        const paramsEditProduct = { params: {subcategoryId: 10, productId: 1,title: 'Product name 2', background: null} }
            propsEditState = {
                // props: store.getState().products.products[1],
                props: { title: 'Name', component: 'Product name 2' },
                triggeredName: 'Name',
                changeText: jest.fn(),
                editName: jest.fn(),
                editBackground: jest.fn(),
                editEnergy: jest.fn(),
                editDecimals: jest.fn(),
                errorMsg: 'Incorrect data given',
                cancelEdit: jest.fn() 
            }
            propsNotEdit = {
                // props: store.getState().products.products[1],
                // editId: store.getState().products.products[0].id,
                props: { title: 'Name', component: 'Product name' },
                triggeredName: 'Product 2',
                changeText: jest.fn(),
                triggerEdit: jest.fn(),
                editName: jest.fn(),
                editBackground: jest.fn(),
                editEnergy: jest.fn(),
                editDecimals: jest.fn(),
                // errorMsg: '',
                cancelEdit: jest.fn() 
            }
        it('should add new value on edit input in child component', () => {
            const wrapper = shallow(<Product store={store} route={paramsEditProduct}><ProductRows {...propsEditState} /></Product>);
            const spy = jest.spyOn(wrapper.props().children.props.children.props, 'changeText');
            const child = shallow(<ProductRows {...propsEditState} />).dive();
            const input = child.find('Component');
            input.simulate('changeText', 'Updated product name');
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('should trigger edit on edit button press', () => {
            const wrapper = shallow(<Product store={store} route={paramsEditProduct}><ProductRows {...propsNotEdit} /></Product>);
            const spy = jest.spyOn(wrapper.props().children.props.children.props, 'triggerEdit');
            const child = shallow(<ProductRows {...propsNotEdit} />);
            const touchableOpacity = child.find('TouchableOpacity');
            touchableOpacity.props().onPress();
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('should open delete confirm modal on button press in parent component', () => {
            const wrapper = shallow(<Product store={store} route={paramsEditProduct} />).childAt(0).dive();
            const spy = jest.spyOn(wrapper.instance(), 'setState');
            const deleteBtn = wrapper.find('TouchableOpacity').at(1);
            deleteBtn.props().onPress();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});

