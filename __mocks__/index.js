// @flow

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Configure enzyme with adapter
Enzyme.configure({ adapter: new Adapter() })

jest.mock('react-native-gesture-handler', () => {})

jest.mock('react-navigation-stack', () => {})

jest.mock('react-navigation', () => ({
  createStackNavigator: jest.fn(),
}))

jest.mock('react-navigation-redux-helpers', () => ({
  createReactNavigationReduxMiddleware: jest.fn(),
  reduxifyNavigator: jest.fn(),
  createNavigationReducer: jest.fn(),
}))

const store = { user: {} }

const Mocks = { store }

export default Mocks
