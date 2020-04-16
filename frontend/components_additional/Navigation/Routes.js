import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

// Components:
import Categories from '../../components/Categories/Categories';
import Subcategories from '../../components/subcategories/Subcategories';
import Products from '../../components/products/Products';
import Product from '../../components/products/Product';
import LoginPage from '../../components/auth/Login';
import Header from '../../components/header/Header';

//Auth Components:
import Dashboard from '../../componentsAuth/Dashboard';
import Categories_Auth from '../../componentsAuth/auth_categories/Categories';
import Subcategories_Auth from '../../componentsAuth/auth_subcategories/Subcategories';
import Products_Auth from '../../componentsAuth/auth_products/Products';
import Product_Auth from '../../componentsAuth/auth_products/Product';
import Authorized from '../../componentsAuth/auth/requireAuth';
import ifAuthorized from '../../componentsAuth/auth/notAuthorized';
//CRUD
import AddCategory from '../../componentsAuth/auth_categories/AddCategory';
import AddSubcategory from '../../componentsAuth/auth_subcategories/AddSubcategory';
import AddProduct from '../../componentsAuth/auth_products/AddProduct';
// COMPARISON
import SelectedProducts from '../../components/comparison/selectedProducts';
import { StackActions } from 'react-navigation';



class Navigator extends Component {
   
render() {
    const GuestNavigation = createStackNavigator();
    const AuthNavigation = createStackNavigator();

    return ( 
        <NavigationContainer>
            {/* {this.props.isAuthorized && */}
                <GuestNavigation.Navigator initialRouteName="Categories">
                    <GuestNavigation.Screen name="Categories" component={Categories} options={{title: "SpeedShop"}} />
                    <GuestNavigation.Screen name="Subcategories" component={Subcategories} options={{title: "Subcategories"}} />
                    <GuestNavigation.Screen name="Products" component={Products} options={{title: "Products List"}} /> 
                    <GuestNavigation.Screen name="Product" component={Product} options={{title: "Product"}} /> 
                    <GuestNavigation.Screen name="Login" component={LoginPage} options={{title: "Please Login"}} />
                </GuestNavigation.Navigator> 
              {/* {!this.props.isAuthorized && 
                  <AuthNavigation.Navigator  initialRouteName="Add_Product">
                     <AuthNavigation.Screen name="Dashboard" component={Categories_Auth} options={{ title: Dashboard}} />
                     <AuthNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
                     <AuthNavigation.Screen name="Products_Auth" component={Products_Auth} />
                     <AuthNavigation.Screen name="Product_Auth" component={Product_Auth} /> 
                     <AuthNavigation.Screen name="Add_Category" component={AddCategory} />
                     <AuthNavigation.Screen name="Add_Subcategory" component={AddSubcategory} />
                    <AuthNavigation.Screen name="Add_Product" component={AddProduct} />
                 </AuthNavigation.Navigator> 
             }  */}
        </NavigationContainer>
    ) 
 }
}

const mapStateToProps = state => ({
    admin: state.auth.admin,
    isAuthorized: state.auth.isAuthorized,
    selectedProducts: state.selectedProducts.comparisonArray
})

export default connect(mapStateToProps)(Navigator)