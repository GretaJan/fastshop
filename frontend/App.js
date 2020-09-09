import React from 'react';
import 'react-native-gesture-handler';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
const { store, persistor } = configureStore();
import configureStore from './src/redux/store';


import Tabs from './src/components_additional/Navigation/Tabs';

const App = () => {
        return (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/* <Routes /> */}
              <Tabs />
            </PersistGate>
          </Provider>
        )
    }
  export default App