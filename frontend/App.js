import React from 'react';
import 'react-native-gesture-handler';
import { NetworkProvider } from 'react-native-offline';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
const { store, persistor } = configureStore();
import configureStore from './src/redux/store';

import Tabs from './src/components_additional/Navigation/Tabs';

const App = () => {
        return (
          <NetworkProvider>
            <Provider store={ store }>
              <PersistGate loading={null} persistor={persistor}>
                <Tabs />
              </PersistGate>
            </Provider>
          </NetworkProvider>
        )
    }
  export default App