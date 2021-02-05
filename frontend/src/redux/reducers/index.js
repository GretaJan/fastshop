import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import subcategoriesReducer from './subcategoriesReducer';
import productsReducer from './productsReducer';
import authReducer from './authReducer';
import comparisonReducer from './comparisonReducer';
import { reducer as network } from 'react-native-offline';

export default combineReducers({
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    products: productsReducer,
    selectedProducts: comparisonReducer,
    auth: authReducer,
    network
})
