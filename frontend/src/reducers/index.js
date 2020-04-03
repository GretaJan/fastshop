import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import subcategoriesReducer from './subcategoriesReducer';
import productsReducer from './productsReducer';
import authReducer from './authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
    key: 'root',
    storage: storage,
    whitelst: ['rootReducer']
}


export default combineReducers({
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    products: productsReducer,
    auth: authReducer
})
