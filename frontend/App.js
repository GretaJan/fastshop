import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { ReduxNetworkProvider } from 'react-native-offline';
import { PersistGate } from 'redux-persist/es/integration/react';
const { store, persistor } = configureStore();
import configureStore from './utils/redux/store';

import Tabs from './utils/Navigation/Tabs';

const App = () => {
        return (
          <Provider store={ store }>
            <ReduxNetworkProvider>
              <PersistGate loading={null} persistor={persistor}>
                <Tabs />
              </PersistGate>
            </ReduxNetworkProvider>
          </Provider>
        )
    }
  export default App