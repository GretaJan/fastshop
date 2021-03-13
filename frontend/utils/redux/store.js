import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createNetworkMiddleware } from 'react-native-offline';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const initialState = {};

const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle: 200,
  });

export const middleware = [networkMiddleware, thunk];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['auth'],
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default() => {
    const store = createStore(persistedReducer, applyMiddleware(...middleware));
    const persistor = persistStore(store);
    return { store: store, persistor: persistor }
}

// export default {store, persistStore(store)}      

