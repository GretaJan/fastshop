import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { Provider } from 'react-redux';
import store from './store';

// Components:
import Home from './components/Home';
import Subcategories from './components/subcategories/Subcategories';
import Products from './components/products/Products';
import LoginPage from './components/auth/Login';
import Header from './components/header/Header';

//Auth Components:
import Dashboard from './componentsAuth/Dashboard';
import Subcategories_Auth from './componentsAuth/auth_subcategories/Subcategories';
import Products_Auth from './componentsAuth/auth_products/Products';

class App extends Component {


  render() {

    return (
      <Provider store={store}>
        <NativeRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={LoginPage} />
            <Route path="/subcategories" component={Subcategories_Auth} />
            <Route path="/products" component={Products_Auth} />
          </Switch>
        </NativeRouter>
      </Provider>
    )
  }
}

export default App

