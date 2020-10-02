import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { middleware } from '../../redux/store';

const persistConfig = {
}
export const testStore = (reducer) => {
    const createTestStore = createStore(reducer, applyMiddleware(...middleware));
    return createTestStore;
}