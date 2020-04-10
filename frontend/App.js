import React, { Component } from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { View } from 'react-native';
import { NavigationContainter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';
const { store, persistor } = configureStore();

import { logOut } from './src/actions/authActions';


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



let AppNavigation = () => {
  const GuestNavigation = createStackNavigator();
const AuthNavigation = createStackNavigator();
const Footer = createBottomTabNavigator();
const AuthFooter = createBottomTabNavigator();


  return (
        <NavigationContainter>
          {/* <GuestNavigation.Navigator>
            <GuestNavigation.Screen name="Login" component={LoginPage} />
            <GuestNavigation.Screen name="Dashboard" component={Dashboard} options={{ title: Dashboard}} />
            <GuestNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
            <GuestNavigation.Screen name="Products_Auth" component={Products_Auth} />
            <GuestNavigation.Screen name="Product_Auth" component={Product_Auth} />
          </GuestNavigation.Navigator> */}
          <AuthNavigation.Navigator>
              <AuthNavigation.Screen name="Login" component={LoginPage} />
              {/* <AuthNavigation.Screen name="Dashboard" component={Dashboard} options={{ title: Dashboard}} />
              <AuthNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
              <AuthNavigation.Screen name="Products_Auth" component={Products_Auth} />
              <AuthNavigation.Screen name="Product_Auth" component={Product_Auth} /> */}
          </AuthNavigation.Navigator>
          <Footer.Navigator>
              <Footer.Screen name="Home" component={Home} />
              <Footer.Screen name="Login" component={LoginPage} />
              <Footer.Screen name="SelectedProducts" component={SelectedProducts} />
          </Footer.Navigator>
        </NavigationContainter>
    )
}

const mapStateToProps = (state) => ({
  admin: state.auth.admin,
  isAuthorized: state.auth.isAuthorized,
  selectedProducts: state.selectedProducts.comparisonArray
})

AppNavigation = connect(mapStateToProps, {logOut})(AppNavigation)

const App = () => {

    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <AppNavigation />
          </PersistGate>
      </Provider>
    )
  }

export default App

