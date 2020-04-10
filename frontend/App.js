import React, { Component } from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { View, TabBarIOS } from 'react-native';
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


//Navigation:

// const Body_not_authorized = StackNavigator({
//     Home: {
//       screen: Home
//     },
//     Detail: {
//       screen: RepoDetail
//     },
//     subcategories: {
//         screen: Subcategories
//     },
//     products: {
//         screen: Products
//     },
//     product: {
//         screen: Product
//     },
// });

// const Body_authorized = StackNavigator({
//     dashboard: {
//       screen: Dashboard
//     },
//     subcategories_auth: {
//       screen: Subcategories_Auth
//     },
//     products_auth: {
//         screen: Products_Auth
//     },
//     product_auth: {
//         screen: Product_Auth
//     },
//     addCategory: {
//         screen: AddCategory
//     },
//     addSubcategory: {
//     screen: AddSubcategory
//     },
//     addProduct: {
//         screen: AddProduct
//     }
// });

// const Footer_not_authorized = TabNavigator({
//     home: {
//         screen: Home
//     },
//     login: {
//         screen: Login
//     },
//     selected_products: {
//         screen: SelectedProducts
//     }
// })
// const Footer_authorized = TabNavigator({
//     dashboard: {
//         screen: Dashboard
//     },
//     login: {
//         screen: Login
//     }
// })

const AuthNavigation = createStackNavigator();
const Footer = createBottomTabNavigator();
 

let Navigation = ({ isAuthorized }) => {

    logOut = () => {
        this.props.logOut(this.props.admin);
        navigation.navigate('home')
    }

        return (
            <NavigationContainter>
                <AuthNavigation.Navigator>
                    <AuthNavigation.Screen name="Login" component={LoginPage} />
                    <AuthNavigation.Screen name="Dashboard" component={Dashboard} options={{ title: Dashboard}} />
                    <AuthNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
                    <AuthNavigation.Screen name="Products_Auth" component={Products_Auth} />
                    <AuthNavigation.Screen name="Product_Auth" component={Product_Auth} />
                </AuthNavigation.Navigator>
                <Tabs.Navigator>
                    <Tabs.Screen name="Home" component={Home} />
                    <Tabs.Screen name="Login" component={Login} />
                    <Tabs.Screen name="SelectedProducts" component={SelectedProducts} />
                </Tabs.Navigator>
            </NavigationContainter>
        )
}

const mapStateToProps = (state) => ({
    admin: state.auth.admin,
    isAuthorized: state.auth.isAuthorized,
    selectedProducts: state.selectedProducts.comparisonArray
});

Navigation = connect(mapStateToProps, { logOut })(Navigation)


class App extends components {


  render() {

    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Navigation />
          </PersistGate>
      </Provider>
    )
  }
}

export default App

