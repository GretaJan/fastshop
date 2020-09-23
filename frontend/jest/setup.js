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