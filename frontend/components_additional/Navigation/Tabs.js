import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import { styles } from '../styles/TabStyles';
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
    logOut = () => {
        this.props.logOut(this.props.admin)
    }   

render() {
    const Tabs = createBottomTabNavigator();
    const GuestNavigation = createStackNavigator();
    const SelectedProductsNav = createStackNavigator();
    const AdminNavigation = createStackNavigator();

    const GuestNavigationScreens = () => (
        <GuestNavigation.Navigator initialRouteName="Categories">
            <GuestNavigation.Screen name="Categories" component={Categories} 
                options={{
                    title: "SPEEDSHOP",
                    headerStyle: {
                        backgroundColor: '#ffcc33',
                      },
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        color: '#394032',
                      },
                      headerTitleAlign: 'center'
                    }} />
            <GuestNavigation.Screen name="Subcategories" component={Subcategories} 
                                options={{
                                    title: "SUBCATEGORIES",  
                                    headerStyle: {
                                    backgroundColor: '#ffcc33',
                                },
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    color: '#394032',
                                },
                                headerTitleAlign: 'center'
            }} />
            <GuestNavigation.Screen name="Products" component={Products} 
                                options={{
                                    title: "PRODUCTS LIST",
                                    headerStyle: {
                                        backgroundColor: '#ffcc33',
                                    },
                                    headerTitleStyle: {
                                        fontWeight: 'bold',
                                        color: '#394032',
                                    },
                                    headerTitleAlign: 'center'
                                    }} /> 
            <GuestNavigation.Screen name="Product" component={Product} 
                                    options={{
                                        title: "PRODUCT DETAILS",
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                            color: '#394032',
                                        },
                                        headerStyle: {
                                            backgroundColor: '#ffcc33',
                                        },
                                        headerTitleAlign: 'center'
                                        }} /> 
            <GuestNavigation.Screen name="Login" component={LoginPage} options={{title: "Please Login"}} />
            {/* <GuestNavigation.Screen name="SelectedProducts" component={SelectedProducts} options={{title: "Calculate"}} /> */}
        </GuestNavigation.Navigator>
    )

    const SelectedProductsScreen = () => (
        <SelectedProductsNav.Navigator>
            <SelectedProductsNav.Screen name="SelectedProducts" component={SelectedProducts} options={{title: (!this.props.calculated) ? "Calculate" : "Results"}} />
        </SelectedProductsNav.Navigator>
    )
    
    const AdminNavigationScreens = () => (
        <AdminNavigation.Navigator >
            <AdminNavigation.Screen name="Dashboard" component={Categories_Auth} 
            options={{ 
                title: "Dashboard",
                headerStyle: {
                    backgroundColor: '#ffcc33',
                  },
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#394032', 
                  },
                  headerTitleAlign: 'center'
            }} />
            <AdminNavigation.Screen name="Subcategories_Auth" component={Subcategories_Auth} options={{ title: "Subcategories"}} />
            <AdminNavigation.Screen name="Products_Auth" component={Products_Auth} options={{ title: "Products"}}  />
            <AdminNavigation.Screen name="Product_Auth" component={Product_Auth} options={{ title: "Product"}}  /> 
            <AdminNavigation.Screen name="Add_Category" component={AddCategory} options={{ title: "Add Category"}}  />
            <AdminNavigation.Screen name="Add_Subcategory" component={AddSubcategory} options={{ title: "Add Subcategory"}}  />
            <AdminNavigation.Screen name="Add_Product" component={AddProduct} options={{ title: "Add Product" }}  />
        </AdminNavigation.Navigator> 
    )
    return ( 
        <NavigationContainer>
            {(!this.props.isAuthorized) ? (
                <Tabs.Navigator  tabBarOptions={{
                    // backgroundColor: '#335c67',
                    inactiveBackgroundColor: '#335c67',
                    activeBackgroundColor: '#335c67',
                    // inactiveBackgroundColor: '#ce7f75',
                    // activeBackgroundColor: '#ce7f75',3a434c
                    inactiveBackgroundColor: '#3a434c',
                    activeBackgroundColor: '#3a434c',
                    style: { 
                        // backgroundColor: '#335c67',
                        backgroundColor: '#ad9b9a',
                        height: 60,
                    },
                  }}>
                    <Tabs.Screen name="Home" component={GuestNavigationScreens}
                    options = {{ 
                        tabBarLabel: () => (null),
                        tabBarIcon: () => (
                            <IonIcon name="ios-home" style={styles().iconItem} />
                        )}
                    } />
                    <Tabs.Screen name="Login" component={LoginPage} 
                    options = {{ 
                        tabBarLabel: () => (null),
                        tabBarIcon: () => (
                            <Icon name="sign-in" style={styles().iconItem} />
                        )
                    }} />
                    <Tabs.Screen name="SelectedProducts" component={SelectedProductsScreen} 
                    options = {{ 
                            tabBarLabel: () => (null),
                            tabBarIcon: () => (
                            // <Icon name="list-alt" size={40} />
                            <View>
                                <IonIcon name="ios-calculator" style={styles().iconItem} />
                                <View style={styles().counter}>
                                    <Text style={styles().counterNo} > {this.props.selectedProducts.length}</Text>
                                </View>
                            </View>
                        )
                        }} />
                </Tabs.Navigator>           
            ) : (
                <Tabs.Navigator>
                    <Tabs.Screen name="Dashboard" component={AdminNavigationScreens} 
                        options = {
                            { tabBarIcon: () => (
                                <Icon name="list-alt" style={styles().iconItem} />
                            )}
                    } />
                    <Tabs.Screen name="Logout" component={null} component={Categories}
                        options = {
                            { tabBarIcon: () => (
                                <Icon name="sign-out" style={styles().iconItem} />
                            )}
                        }
                        listeners={
                            { tabPress: () => (
                                this.logOut()
                            )}
                        }                 
                    />
                </Tabs.Navigator> 
            )}
        </NavigationContainer> 
    ) 
 }
}

const mapStateToProps = state => ({
    admin: state.auth.admin,
    isAuthorized: state.auth.isAuthorized,
    selectedProducts: state.selectedProducts.comparisonArray,
    calculated: state.selectedProducts.calculated
})

export default connect(mapStateToProps, { logOut })(Tabs)
