import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { Provider } from 'react-redux';
import store from './store';

// Components:
import Home from './components/Home';
import Subcategories from './components/subcategories/Subcategories';
import Products from './components/products/Products';
import Product from './components/products/Product';
import LoginPage from './components/auth/Login';
import Header from './components/header/Header';

//Auth Components:
import Dashboard from './componentsAuth/Dashboard';
import Subcategories_Auth from './componentsAuth/auth_subcategories/Subcategories';
import Products_Auth from './componentsAuth/auth_products/Products';
import Product_Auth from './componentsAuth/auth_products/Product';
import Authorized from './componentsAuth/auth/requireAuth';
import ifAuthorized from './componentsAuth/auth/notAuthorized';

class App extends Component {


  render() {

    return (
      <Provider store={store}>
        <NativeRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={ifAuthorized(LoginPage)} />
            <Route path="/subcategories/:categoryId" component={Subcategories} />
            <Route path="/subcategories_auth/:categoryId" component={Authorized(Subcategories_Auth)} />
            <Route path="/products/:subcategoryId" component={Products} />
            <Route path="/products_auth/:subcategoryId" component={Authorized(Products_Auth)} />
            <Route path="/product/:subcategoryId/:productId" component={Product} />
            <Route path="/product_auth/:subcategoryId/:productId" component={Authorized(Product_Auth)} />
          </Switch>
        </NativeRouter>
      </Provider>
    )
  }
}

export default App

