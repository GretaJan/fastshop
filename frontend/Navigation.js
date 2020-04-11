import React, { Component } from 'react';
// import { createStackNavigator } from "react-navigation-stack";
// import { createAppContainter } from 'react-navigation';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from 'react-navigation-stack';
import Hello from './Hello';
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
import { StackActions } from 'react-navigation';



class NavigatorContainer extends Component {
   
render() {

    // const GuestNavigation = createStackNavigator();
    return ( 
    //     <NavigationContainer>
    //     <GuestNavigation.Navigator>
    //         <GuestNavigation.Screen name="Home" component={Home} options={{title: "Home"}}/>
    //     </GuestNavigation.Navigator>
    // </NavigationContainer>
<Hello />
    ) 
 
    }
}

export default NavigatorContainer