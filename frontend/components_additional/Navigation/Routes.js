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
    // const AuthNavigation = createStackNavigator();

    return ( 
        <NavigationContainer>
            {!this.props.isAuthorized ? (
                <GuestNavigation.Navigator>
                    <GuestNavigation.Screen name="Categories" component={Categories} options={{title: "SpeedShop"}} />
                    <GuestNavigation.Screen name="Subcategories" component={Subcategories} />
                    <GuestNavigation.Screen name="Products" component={Products} /> 
                    <GuestNavigation.Screen name="Product" component={Product} /> 
                    <GuestNavigation.Screen name="Login" component={LoginPage} />
                </GuestNavigation.Navigator> 
            ) : (
                <GuestNavigation.Navigator>
                    <GuestNavigation.Screen name="Dashboard" component={Categories_Auth} options={{ title: Dashboard}} />
                    <GuestNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} />
                    <GuestNavigation.Screen name="Products_Auth" component={Products_Auth} />
                    <GuestNavigation.Screen name="Product_Auth" component={Product_Auth} /> 
                    <GuestNavigation.Screen name="Add_Category" component={AddCategory} />
                    <GuestNavigation.Screen name="Add_Subcategory" component={AddSubcategory} />
                    <GuestNavigation.Screen name="Add_Product" component={AddProduct} />
                </GuestNavigation.Navigator> 
            )}
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
