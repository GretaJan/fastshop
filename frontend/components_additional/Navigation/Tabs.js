import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
    counter: {
        position: 'absolute',
        top: -6,
        left: 27,
        backgroundColor: 'orange',
        width: 23,
        height: 23,
        borderRadius: 23/2
    },
    counterNo: {
        textAlign: 'center',
        textAlignVertical: 'center',
        right: 1,
        top: 2
    }
});


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
    const SelectedProducts = createStackNavigator();
    const AdminNavigation = createStackNavigator();

    const GuestNavigationScreens = () => (
        <GuestNavigation.Navigator initialRouteName="Categories">
            <GuestNavigation.Screen name="Categories" component={Categories} options={{title: "SpeedShop"}} />
            <GuestNavigation.Screen name="Subcategories" component={Subcategories} options={{title: "Subcategories"}} />
            <GuestNavigation.Screen name="Products" component={Products} options={{title: "Products List"}} /> 
            <GuestNavigation.Screen name="Product" component={Product} options={{title: "Product"}} /> 
            <GuestNavigation.Screen name="Login" component={LoginPage} options={{title: "Please Login"}} />
            <GuestNavigation.Screen name="SelectedProducts" component={SelectedProducts} options={{title: "Calculate"}} />
        </GuestNavigation.Navigator>
    )

    // const SelectedProductsScreen = () => (
    //     <SelectedProducts.Navigator>
    //         <SelectedProducts.Screen name="SelectedProducts" component={SelectedProducts} options={{title: "Calculate"}} />
    //     </SelectedProducts.Navigator>
    // )
    
    const AdminNavigationScreens = () => (
        <AdminNavigation.Navigator >
            <AdminNavigation.Screen name="Dashboard" component={Categories_Auth} options={{ title: "Dashboard"}} />
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
                <Tabs.Navigator>
                    <Tabs.Screen name="Home" component={GuestNavigationScreens}
                    options = {{ 
                        tabBarLabel: () => (null),
                        tabBarIcon: () => (
                            <Icon name="home" size={40}  />
                        )}
                    } />
                    <Tabs.Screen name="Login" component={LoginPage} 
                    options = {{ 
                        tabBarLabel: () => (null),
                        tabBarIcon: () => (
                            <Icon name="sign-in" size={40}  />
                        )
                    }} />
                    <Tabs.Screen name="SelectedProducts" component={SelectedProducts} 
                    options = {{ 
                            tabBarLabel: () => (null),
                            tabBarIcon: () => (
                            // <Icon name="list-alt" size={40} />
                            <View>
                                <Icon name="list-alt" size={40} />
                                <View style={styles.counter}>
                                    <Text style={styles.counterNo} > {this.props.selectedProducts}</Text>
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
                                <Icon name="list-alt" size={40} />
                            )}
                    } />
                    <Tabs.Screen name="Logout" component={null} component={Categories}
                        options = {
                            { tabBarIcon: () => (
                                <Icon name="sign-out" size={40}  />
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
    selectedProducts: state.selectedProducts.comparisonArray
})

export default connect(mapStateToProps, { logOut })(Tabs)
