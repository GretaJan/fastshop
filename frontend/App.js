import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './store';
const { store, persistor } = configureStore();


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
//CRUD
import AddCategory from './componentsAuth/auth_categories/AddCategory';
import AddSubcategory from './componentsAuth/auth_subcategories/AddSubcategory';
import AddProduct from './componentsAuth/auth_products/AddProduct';
import EditCategory from './componentsAuth/auth_categories/EditCategory';
import EditSubcategory from './componentsAuth/auth_subcategories/EditSubcategory';
import EditProduct from './componentsAuth/auth_products/EditProduct';
// COMPARISON
import SelectedProducts from './components/comparison/selectedProducts';


class App extends Component {


  render() {

    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
          <NativeRouter>
              <Switch>
                  <Route exact path="/" component={ifAuthorized(Home)} />
                  <Route path="/dashboard" component={Authorized(Dashboard)} />
                  <Route path="/login" component={ifAuthorized(LoginPage)} />
                  <Route path="/subcategories/:categoryId" component={Subcategories} />
                  <Route path="/subcategories_auth/:categoryId" component={Authorized(Subcategories_Auth)} />
                  <Route path="/products/:subcategoryId" component={Products} />
                  <Route path="/products_auth/:subcategoryId" component={Authorized(Products_Auth)} />
                  <Route path="/product/:subcategoryId/:productId" component={Product} />
                  <Route path="/product_auth/:subcategoryId/:productId" component={Authorized(Product_Auth)} />
                  {/* CRUD */}
                  <Route path="/addCategory" component={Authorized(AddCategory)} />
                  <Route path="/addSubcategory/:categoryId" component={Authorized(AddSubcategory)} />
                  <Route path="/addProduct/:subcategoryId" component={Authorized(AddProduct)} />
                  <Route path="/editCategory/:categoryId" component={Authorized(EditCategory)} />
                  <Route path="/editSubcategory/:categoryId/:subcategoryId" component={Authorized(EditSubcategory)} />
                  <Route path="/editProduct/:subcategoryId/:productId" component={Authorized(EditProduct)} />
                  {/* CALCULATIONS */}
                  <Route path="/selectedProducts" component={SelectedProducts} />
              </Switch>
                <Header />
          </NativeRouter>
          </PersistGate>
      </Provider>
    )
  }
}

export default App

