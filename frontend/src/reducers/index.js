import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import subcategoriesReducer from './subcategoriesReducer';
import productsReducer from './productsReducer';
import authReducer from './authReducer';

export default combineReducers({
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    products: productsReducer,
    auth: authReducer
})
