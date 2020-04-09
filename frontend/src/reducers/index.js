import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import subcategoriesReducer from './subcategoriesReducer';
import productsReducer from './productsReducer';
import authReducer from './authReducer';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import comparisonReducer from './comparisonReducer';

// const authPersistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whitelist: ['authReducer'],
//     stateReconciler: autoMergeLevel2,
// }

// const pReducer = persistReducer(persistConfig, auth);


export default combineReducers({
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    products: productsReducer,
    selectedProducts: comparisonReducer,
    // auth: persistReducer(authPersistConfig, authReducer)
    auth: authReducer
})


// export default combineReducers({
//     categories: categoriesReducer,
//     subcategories: subcategoriesReducer,
//     products: productsReducer,
//     auth: authReducer
// })