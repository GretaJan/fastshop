import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { logOut } from '../../src/actions/authActions';
// Components:
import Home from '../../components/Home';
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



class Tabs extends Component {

    componentDidUpdate(nextProps) {
        if (nextProps.isAuthorized !== this.props.isAuthorized) {
            console.log("Next props: ", nextProps.isAuthorized);
        }
    } 
   
render() {

    const Tabs = createBottomTabNavigator();
    // const AuthFooter = createBottomTabNavigator();

    return ( 
        <NavigationContainer>
            {(!this.props.isAuthorized) ? (
                <Tabs.Navigator>
                    <Tabs.Screen name="Home" component={Categories} 
                    options = {
                        { tabBarIcon: () => (
                            <Icon name="home" size={40}  />
                        )}
                    } />
                    <Tabs.Screen name="Login" component={LoginPage} 
                    options = {
                        { tabBarIcon: () => (
                            <Icon name="sign-in" size={40}  />
                        )}
                    } />
                    <Tabs.Screen name="SelectedProducts" component={SelectedProducts} 
                    options = {
                        { tabBarIcon: () => (
                            <Icon name="list-alt" size={40} />
                        )}
                    } />
                </Tabs.Navigator>           
            ) : (
                <Tabs.Navigator>
                    <Tabs.Screen name="Dashboard" component={Categories_Auth} 
                        options = {
                            { tabBarIcon: () => (
                                <Icon name="list-alt" size={40} />
                            )}
                    } />
                    <Tabs.Screen name="Logout" component={null} component={Categories}
                        options = {
                            { tabBarIcon: () => (
                                <Icon name="sign-out" size={40}  />
                            )},
                            { tabBarOnPress: () => (
                                this.props.logOut(this.props.admin)
                            )}
                    } />
                </Tabs.Navigator> 
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

export default connect(mapStateToProps, { logOut })(Tabs)
