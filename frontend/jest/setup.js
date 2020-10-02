import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import MockAsyncStorage from 'mock-async-storage';
const mockImpl = new MockAsyncStorage();

Enzyme.configure({ 
    adapter: new EnzymeAdapter() 
});

jest.mock('@react-native-community/async-storage', () => mockImpl);

jest.mock('react-navigation', () =>({
    NavigationEvents: 'mockNavigationEvents',
    withNavigation: component => component
  }));

// Mock TouchableOpcity
jest.mock(
    'react-native/Libraries/Components/Touchable/TouchableOpacity.js',
    () => {
      const { TouchableHighlight } = require('react-native')
      const MockTouchable = props => {
        return <TouchableHighlight {...props} />
      }
      MockTouchable.displayName = 'TouchableOpacity'
  
      return MockTouchable
    }
)
