import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import authReducer from './authReducer';

export default combineReducers({
    categories: categoriesReducer,
    auth: authReducer
})
